import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, withRouter} from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact}) => (
    <Route path={path} exact={exact} render={(props) => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
            <Redirect to="/profile" />
        )
    )} />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        loggedIn ? (
            <Component {...props} />
        ) : (
                <Redirect to="/login" />
            )
    )} />
);

const mstp = ({session}) => ({
    loggedIn: Boolean(session.id)
});

export const AuthRoute = withRouter(connect(mstp)(Auth));

export const ProtectedRoute = withRouter(connect(mstp)(Protected));