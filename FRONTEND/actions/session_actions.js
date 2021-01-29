import * as SessUtil from '../util/session_api_util';
import * as PostUtil from '../util/post_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_ERRORS= "CLEAR_ERRORS"

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});

export const signup = user => dispatch => SessUtil.signup(user).then(user => dispatch(receiveCurrentUser(user)), err => dispatch(receiveErrors(err.responseJSON)));

export const login = user => dispatch => SessUtil.login(user).then(user => dispatch(receiveCurrentUser(user)), err => dispatch(receiveErrors(err.responseJSON)));

export const logout = () => dispatch => SessUtil.logout().then(() => dispatch(logoutCurrentUser()), err => dispatch(receiveErrors(err.responseJSON)));

export const update = user => dispatch => SessUtil.update(user).then(user => dispatch(receiveCurrentUser(user)), err => dispatch(receiveErrors(err.responseJSON)));



export const createPost = post => dispatch => PostUtil.createPost(post).then(user => dispatch(receiveCurrentUser(user)), err => dispatch(receiveErrors(err.responseJSON)));