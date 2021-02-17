import { RECEIVE_ALL_USERS, RECEIVE_USER, RECEIVE_USER_ERRORS } from '../../actions/user_actions';

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USER_ERRORS:
            return action.errors;
        case RECEIVE_ALL_USERS:
            return [];
        case RECEIVE_USER:
            return [];
        default:
            return state;
    }
};