import * as React from 'react';
import {
    render as renderSchema
} from 'amis';
import { IMainStore } from '../store';
import { getEnv } from 'mobx-state-tree';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';
import * as qs from 'qs';
import { Action } from 'amis/lib/types';

interface RendererProps {
    schema?:any;
    [propName:string]:any;
};

@inject("store")
@withRouter
@observer
export default class AMisRenderer extends React.Component<RendererProps> {
    env:any = null;
    
    handleAction = (e:any, action:Action) => {
        this.env.alert(`没有识别的动作：${JSON.stringify(action)}`);
    }

    constructor(props:RendererProps) {
        super(props);
        const store = props.store as IMainStore;
        const fetcher = getEnv(store).fetcher;
        const notify = getEnv(store).notify;
        const alert = getEnv(store).alert;
        const confirm = getEnv(store).confirm;
        const copy = getEnv(store).copy;
        const apiHost = getEnv(store).apiHost;
        const getModalContainer = getEnv(store).getModalContainer;
        const history = props.history;
        
        const normalizeLink = (to:string) => {
            if (/^\/api\//.test(to)) {
                return to;
            }
            to = to || '';
            const location = history.location;
            if (to && to[0] === '#') {
                to = location.pathname + location.search + to;
            } else if (to && to[0] === '?') {
                to = location.pathname + to;
            }
            const idx = to.indexOf('?');
            const idx2 = to.indexOf('#');
            let pathname =  ~idx ? to.substring(0, idx) : ~idx2 ? to.substring(0, idx2) : to;
            let search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : '';
            let hash = ~idx2 ? to.substring(idx2) : '';
            if (!pathname) {
                pathname = location.pathname;
            }else if (pathname[0] != '/' && !/^https?\:\/\//.test(pathname)) {
                let relativeBase = location.pathname;
                const paths = relativeBase.split('/');
                paths.pop();
                let m;
                while ((m = /^\.\.?\//.exec(pathname))) {
                    if (m[0] === '../') {
                        paths.pop();
                    }
                    pathname = pathname.substring(m[0].length);
                }
                pathname = paths.concat(pathname).join('/');
            }
            return pathname + search + hash;
        }

        // todo，这个过程可以 cache
        this.env = {
            session: 'global',
            updateLocation: props.updateLocation || ((location:string, replace:boolean) => {
                if (location === 'goBack') {
                    return history.goBack();
                }
                history[replace ? 'replace' : 'push'](normalizeLink(location));
            }),
            isCurrentUrl: (to:string) => {
                const link = normalizeLink(to);
                const location = history.location;
                let pathname = link;
                let search = '';
                const idx = link.indexOf('?');
                if (~idx) {
                    pathname = link.substring(0, idx);
                    search = link.substring(idx);
                }
                if (search) {
                    if (pathname !== location.pathname || !location.search) {
                        return false;
                    }
                    const query = qs.parse(search.substring(1));
                    const currentQuery = qs.parse(location.search.substring(1));
                    return Object.keys(query).every(key => query[key] === currentQuery[key]);
                } else if (pathname === location.pathname) {
                    return true;
                }
                return false;
            },
            jumpTo: props.jumpTo || ((to:string, action?:any) => {
                if (to === 'goBack') {
                    return history.goBack();
                }
                to = normalizeLink(to);
                if (action && action.actionType === 'url') {
                    action.blank === false ? (window.location.href = to) : window.open(to);
                    return;
                }
                if (/^https?:\/\//.test(to)) {
                    window.location.replace(to);
                } else {
                    history.push(to);
                }
            }),
            fetcher,
            notify,
            alert,
            confirm,
            copy,
            apiHost,
            getModalContainer
        };
    }
    
    render() {
        const {
            schema,
            store,
            onAction,
            ...rest
        } = this.props;
        return renderSchema(schema, {
            onAction: onAction || this.handleAction,
            theme: store && store.theme,
            ...rest
        }, this.env);
    }
}