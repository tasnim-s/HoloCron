export const CLICK_POST = "CLICK_POST";
export const CLOSE_EDIT = "CLOSE_EDIT";
export const WHICH_WALL = "WHICH_WALL";
export const CLOSE_WALL = "CLOSE_WALL";


export const clickPost = post => ({
    type: CLICK_POST,
    post
});

export const closeEdit = () => ({
    type: CLOSE_EDIT,
});

export const whichWall = wallId => ({
    type: WHICH_WALL,
    wallId
})

export const closeWall = () => ({
    type: CLOSE_WALL,
});