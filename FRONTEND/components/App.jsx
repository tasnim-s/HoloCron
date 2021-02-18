import React from 'react';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import Modal from './modal';
import NavBar from './nav/navbar';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './session_forms/login_form_container';
import ProfilePageContainer from './profilepage/profile_page_container';
import LoginFooter from './session_forms/login_footer';

export default () => (
    <div className="App">
        <Modal />
        <ProtectedRoute path="/" component={NavBar} />
        
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <ProtectedRoute exact path="/profile/:userId" component={ProfilePageContainer} />
        </Switch>
       
        <footer>
            <AuthRoute exact path="/login" component={LoginFooter} />
        </footer>
    </div>
);