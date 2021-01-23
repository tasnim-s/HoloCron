import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import Modal from './modal';
import LandingContainer from './landing/landing_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './session_form/login_form_container';
import ProfilePageContainer from './profilepage/profilepage_container';

export default () => (
    <div>
        <Modal />
        <nav>
            <LandingContainer />
        </nav>
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <ProtectedRoute exact path="/profile" component={ProfilePageContainer}/>
        </Switch>
    </div>
);