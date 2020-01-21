import * as React from 'react';
import { Provider } from "mobx-react";
import {
    toast,
    alert,
    confirm
} from 'amis';
import axios from 'axios';
import { MainStore } from './stores/index';
import * as copy from 'copy-to-clipboard';
import RootRoute from './routes/index';
import './utils/polyfill';

// css
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'amis/lib/themes/default.css';
import './scss/style.scss'

export default function():JSX.Element {
    const store = (window as any).store = MainStore.create({}, {
        fetcher: ({
            url,
            method,
            data,
            config,
            headers
        }: any) => {
            config = config || {};
            config.headers = config.headers || {};
            config.withCredentials = true;

            if (config.cancelExecutor) {
                config.cancelToken = new axios.CancelToken(config.cancelExecutor);
            }

            config.headers = headers || {};
            config.method = method;

            if (method === 'get' && data) {
                config.params = data;
            } else if (data && data instanceof FormData) {
                // config.headers = config.headers || {};
                // config.headers['Content-Type'] = 'multipart/form-data';
            } else if (data
                && typeof data !== 'string'
                && !(data instanceof Blob)
                && !(data instanceof ArrayBuffer)
            ) {
                data = JSON.stringify(data);
                // config.headers = config.headers || {};
                config.headers['Content-Type'] = 'application/json';
            }

            data && (config.data = data);

            return axios(url, config);
        },
        isCancel: (e:any) => axios.isCancel(e),
        notify: (type: 'success' | 'error' | 'info', msg: string) => {
            toast[type] ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息') : console.warn('[Notify]', type, msg);
            console.log('[notify]', type, msg);
        },
        alert,
        confirm,
        copy: (contents: string, options: any = {}) => {
            const ret = copy(contents, options);
            ret && (!options || options.shutup !== true) && toast.info('内容已拷贝到剪切板');
            return ret;
        }
    });

    return (
        <Provider store={store}>
            <RootRoute store={store} />
        </Provider>
    );
}