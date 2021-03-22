import { RECEIVE_ALL_USERS, RECEIVE_USER, RECEIVE_CONNECTED_USERS} from '../../actions/user_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_USERS:
            return action.users;
        case RECEIVE_CONNECTED_USERS:
            return Object.assign(newState, action.users)
        case RECEIVE_USER:
            newState[action.user.id] = action.user;
            return newState;
        default:
            return state;
    }
};