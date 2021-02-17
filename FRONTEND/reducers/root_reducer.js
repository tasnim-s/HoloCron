import { combineReducers } from "redux";
import entities from './entities/entities_reducer';
import ui from './ui/ui_reducer'
import session from './session/session_reducer';
import errors from './errors/errors_reducer';

export default combineReducers({
    entities,
    ui,
    errors,
    session
});