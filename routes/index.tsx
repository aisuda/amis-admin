import * as React from 'react';
import {
    ToastComponent,
    AlertComponent,
} from 'amis';
import { Route, Switch, Redirect, BrowserRouter as Router, HashRouter } from "react-router-dom";
import { observer } from 'mobx-react';
import { IMainStore } from '../stores';
import Login from './Login';
import Register from './Register';
import AdminRoute from './admin/index';
import NotFound from './404';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

let ContextPath = '';

// gh-pages 环境时
if (process.env.NODE_ENV === 'production') {
    ContextPath = '/amis-admin'
}

export default observer(function({store}:{
    store:IMainStore
}) {
    return (
        <Router>
            <div className="routes-wrapper">
                <ToastComponent key="toast" position={'top-right'} theme={store.theme} />
                <AlertComponent key="alert" theme={store.theme} />
                <Switch>
                    <Redirect to={`${ContextPath}/login`} from={`${ContextPath}/`} exact />
                    <Route path={`${ContextPath}/login`} exact component={Login} />
                    <Route path={`${ContextPath}/register`} exact component={Register} />
                    
                    {store.user.isAuthenticated ? (
                        <Route path={`${ContextPath}/admin`} component={AdminRoute} />
                    ) : (
                        <Route path="*" exact component={Login} />
                    )}

                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
});