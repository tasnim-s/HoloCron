export const CLICK_POST = "CLICK_POST";
export const CLOSE_EDIT = "CLOSE_EDIT";

export const clickPost = postId => ({
    type: CLICK_POST,
    postId
});

export const closeEdit = () => ({
    type: CLOSE_EDIT,
});