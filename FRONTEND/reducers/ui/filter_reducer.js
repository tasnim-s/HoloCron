import {CLICK_POST, CLOSE_EDIT, WHICH_WALL, CLOSE_WALL} from '../../actions/filter_actions';

const defaultState = {
    post: null,
    wallId: null
};

export default (state = defaultState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case CLICK_POST:
            return Object.assign({}, state, {post: action.post});
        case CLOSE_EDIT:
            return Object.assign({},state, {post : null});
        case WHICH_WALL:
            return Object.assign({}, state, {wallId: action.wallId});
        case CLOSE_WALL:
            return Object.assign({},state, {wallId : null});
        default:
            return state;
    }
};