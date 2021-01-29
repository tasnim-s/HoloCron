export const createPost = (post) => (
    $.ajax({
        method: 'POST',
        url: `/api/users/${post.creator_id}/posts`,
        data: { post }
    })
);