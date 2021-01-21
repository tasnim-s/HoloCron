import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import Modal from './modal';
import Landing from './landing_form';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './session_form/login_form_container';

export default () => (
    <div>
        <Modal />
        <h1>Holocron™</h1>
        {/* <Landing /> */}
        <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <ProtectedRoute exact path="/" />
        </Switch>
        
    </div>
);