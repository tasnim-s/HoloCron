import React from 'react';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import Modal from './modal';
import NavBarContainer from './landing/navbar_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './session_form/login_form_container';
import ProfilePageContainer from './profilepage/profile_page_container';
import LoginFooter from './login_footer/login_footer';

export default () => (
    <div className="App">
        <Modal />
        <ProtectedRoute path="/" component={NavBarContainer} />
        
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <ProtectedRoute exact path="/profile" component={ProfilePageContainer} />
            <Redirect to="/profile" />
        </Switch>
       
        <footer>
            <AuthRoute exact path="/login" component={LoginFooter} />
        </footer>
    </div>
);