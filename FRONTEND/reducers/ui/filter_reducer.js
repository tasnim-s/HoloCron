import {CLICK_POST, CLOSE_EDIT} from '../../actions/filter_actions';

const defaultState = {
    post: null
};

export default (state = defaultState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case CLICK_POST:
            return Object.assign({}, state, {post: action.post});
        case CLOSE_EDIT:
            return Object.assign({},state, {post : null});
        default:
            return state;
    }
};