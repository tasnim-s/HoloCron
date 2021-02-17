import { combineReducers } from "redux";
import sessionErrors from "./session_errors";
import userErrors from "./user_errors";
import postErrors from "./post_errors";
import commentErrors from "./comment_errors";

export default combineReducers({
    sessionErrors,
    userErrors,
    postErrors,
    commentErrors
});