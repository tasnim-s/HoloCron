export const CLICK_POST = "CLICK_POST";
export const CLOSE_EDIT = "CLOSE_EDIT";

export const clickPost = post => ({
    type: CLICK_POST,
    post
});

export const closeEdit = () => ({
    type: CLOSE_EDIT,
});