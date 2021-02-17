import * as CommentUtil from '../util/comment_api_util';

export const RECEIVE_ALL_COMMENTS = "RECEIVE_ALL_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const RECEIVE_COMMENT_ERRORS = "RECEIVE_COMMENT_ERRORS";

export const receiveAllComments = comments => ({
    type: RECEIVE_ALL_COMMENTS,
    comments
});

export const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

export const receiveCommentErrors = errors => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
});

export const fetchAllComments = () => dispatch => CommentUtil.requestAllComments().then(comments => dispatch(receiveAllComments(comments)), err => dispatch(receivePostErrors(err.responseJSON)));

export const fetchComment = (commentId) => dispatch => CommentUtil.requestComment(commentId).then(comment => dispatch(receiveComment(comment)), err => dispatch(receiveCommentErrors(err.responseJSON)));

export const createComment = (comment) => dispatch => CommentUtil.createComment(comment).then(comment => dispatch(receiveComment(comment)), err => dispatch(receiveCommentErrors(err.responseJSON)));

export const updateComment = (comment) => dispatch => CommentUtil.updateComment(comment).then(comment => dispatch(receiveComment(comment)), err => dispatch(receiveCommentErrors(err.responseJSON)));

export const deleteComment = (commentId) => dispatch => CommentUtil.deleteComment(commentId).then((comments) => dispatch(receiveAllComments(comments)), err => dispatch(receiveCommentErrors(err.responseJSON)));