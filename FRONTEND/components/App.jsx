import React from 'react';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import Modal from './modal';
import NavBar from './nav/navbar';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './session_forms/login_form_container';
import ProfilePageContainer from './profilepage/profile_page_container';
import LoginFooter from './session_forms/login_footer';
import Newsfeed from './newsfeed/newsfeed';

export default () => (
    <div className="App">
        <Modal />
        <ProtectedRoute path="/" component={NavBar} />
        
        <Switch>
            <AuthRoute exact path="/" component={LoginFormContainer} />
            <ProtectedRoute path="/newsfeed" component={Newsfeed} />
            <ProtectedRoute exact path="/profile/:userId" component={ProfilePageContainer} />
        </Switch>
       
        <footer>
            <AuthRoute exact path="/" component={LoginFooter} />
        </footer>
    </div>
);