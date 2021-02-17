import {RECEIVE_ALL_POSTS, RECEIVE_POST} from '../../actions/post_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_POSTS:
            return action.posts;
        case RECEIVE_POST:
            newState[action.post.id] = action.post;
            return newState;
        default:
            return state;
    }
};