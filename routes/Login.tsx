import filter = require('lodash/filter');
import * as React from 'react';
import AMisRenderer from '../components/AMisRenderer';
import { inject, observer } from 'mobx-react';
import { IMainStore } from '../stores/index';
import { RouteComponentProps, withRouter } from 'react-router';

let ContextPath = '';

// gh-pages 环境时
if (process.env.NODE_ENV === 'production') {
    ContextPath = '/amis-admin'
}

interface LoginProps extends RouteComponentProps<any> {
    store: IMainStore;
};

const schema = {
    type: 'form',
    submitText: '登录',
    api: 'post:/api/login',
    wrapWithPanel: false,
    messages: {
        saveSuccess: '登录成功，欢迎光临！'
    },
    controls: [
        {
            children: (props:any) => (
                <div className="list-group list-group-sm">
                    {props.renderFormItems({
                        controls: [
                            {
                                name: 'username',
                                children: (props:any) => (
                                    <div className="list-group-item">
                                        <input 
                                            placeholder="用户名"
                                            type="text" 
                                            className="form-control no-shadow no-border" 
                                            value={props.value || ''} 
                                            onChange={(e) => props.onChange(e.currentTarget.value)} 
                                        />
                                    </div>
                                )
                            },
                            {
                                name: 'password',
                                children: (props:any) => (
                                    <div className="list-group-item">
                                        <input 
                                            placeholder="密码"    
                                            type="password" 
                                            className="form-control no-shadow no-border" 
                                            value={props.value || ''} 
                                            onChange={(e) => props.onChange(e.currentTarget.value)} 
                                        />
                                    </div>
                                )
                            }
                        ]
                    })}
                </div>
            )
        },
        {
            type: 'submit',
            label: '登录',
            size: 'lg',
            inputClassName: 'block w-full',
            level: 'primary'
        }
    ]
};

@inject("store")
// @ts-ignore
@withRouter
@observer
export default class LoginRoute extends React.Component<LoginProps> {
    handleFormSaved = (value:any) => {
        const store = this.props.store;
        const history = this.props.history;
        
        store.user.login(value.username);
        history.replace(`${ContextPath}/admin`)
    }
    
    render() {
        return (
            <div className="app app-header-fixed ">
                <div className="container w-xxl w-auto-xs">
                    <a className="block m-t-xxl m-b-xl text-center text-2x">XXX 系统登录</a>
                    <AMisRenderer
                        onFinished={this.handleFormSaved}
                        schema={schema}
                    />
                </div>
            </div>
        );
    }
}