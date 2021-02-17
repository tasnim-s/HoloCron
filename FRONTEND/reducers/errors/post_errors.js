import { RECEIVE_ALL_POSTS, RECEIVE_POST, RECEIVE_POST_ERRORS } from '../../actions/post_actions';

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_POST_ERRORS:
            return action.errors;
        case RECEIVE_ALL_POSTS:
            return [];
        case RECEIVE_POST:
            return [];
        default:
            return state;
    }
};