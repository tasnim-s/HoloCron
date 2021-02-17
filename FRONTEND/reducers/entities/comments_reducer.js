import {RECEIVE_ALL_COMMENTS, RECEIVE_COMMENT} from '../../actions/comment_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_COMMENTS:
            return action.comments;
        case RECEIVE_COMMENT:
            newState[action.comment.id] = action.comment;
            return newState;
        default:
            return state;
    }
};