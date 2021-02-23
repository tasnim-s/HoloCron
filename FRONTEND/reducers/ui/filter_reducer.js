import {CLICK_POST, CLOSE_EDIT} from '../../actions/filter_actions';

const defaultState = {
    postId: null
};

export default (state = defaultState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case CLICK_POST:
            return Object.assign({}, state, {postId: action.postId});
        case CLOSE_EDIT:
            return Object.assign({},state, {postId : null});
        default:
            return state;
    }
};