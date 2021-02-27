import * as PostUtil from '../util/post_api_util';
import {receiveUser, receiveUserErrors} from './user_actions';

export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_POST_ERRORS = "RECEIVE_POST_ERRORS";

export const receiveAllPosts = posts => ({
    type: RECEIVE_ALL_POSTS,
    posts
});

export const receivePost = post => ({
    type: RECEIVE_POST,
    post
});

export const receivePostErrors = errors => ({
    type: RECEIVE_POST_ERRORS,
    errors
});

export const fetchAllPosts = () => dispatch => PostUtil.requestAllPosts().then(posts => dispatch(receiveAllPosts(posts)), err => dispatch(receivePostErrors(err.responseJSON)));

export const fetchPost = (postId) => dispatch => PostUtil.requestPost(postId).then(user => dispatch(receiveUser(user)), err => dispatch(receiveUserErrors(err.responseJSON)));

export const createPost = (post) => dispatch => PostUtil.createPost(post).then(user => dispatch(receiveUser(user)), err => dispatch(receiveUserErrors(err.responseJSON)));

export const updatePost = (post) => dispatch => PostUtil.updatePost(post).then(user => dispatch(receiveUser(user)), err => dispatch(receiveUserErrors(err.responseJSON)));

export const deletePost = (postId) => dispatch => PostUtil.deletePost(postId).then(user => dispatch(receiveUser(user)), err => dispatch(receiveUserErrors(err.responseJSON)));