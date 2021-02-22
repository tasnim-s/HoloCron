import * as UserUtil from '../util/user_api_util';

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

export const receiveAllUsers = users => ({
    type: RECEIVE_ALL_USERS,
    users
});

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const receiveUserErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors
});

export const fetchAllUsers = () => dispatch => UserUtil.requestAllUsers().then(users => dispatch(receiveAllUsers(users)), err => dispatch(receiveUserErrors(err.responseJSON)));

export const fetchUser = (userId) => dispatch => UserUtil.requestUser(userId).then(user => dispatch(receiveUser(user)), err => dispatch(receiveUserErrors(err.responseJSON)));

export const updateUser = (formData) => dispatch => UserUtil.updateUser(formData).then(user => dispatch(receiveUser(user)), err => dispatch(receiveUserErrors(err.responseJSON)));