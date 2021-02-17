import { RECEIVE_ALL_COMMENTS, RECEIVE_COMMENT, RECEIVE_COMMENT_ERRORS } from '../../actions/comment_actions';

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_COMMENT_ERRORS:
            return action.errors;
        case RECEIVE_ALL_COMMENTS:
            return [];
        case RECEIVE_COMMENT:
            return [];
        default:
            return state;
    }
};