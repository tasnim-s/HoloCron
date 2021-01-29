export const createPost = (post) => (
    $.ajax({
        method: 'POST',
        url: `/api/users/${post.creator_id}/posts`,
        data: { post }
    })
);

export const deletePost = (postId) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/posts/${postId}`
    })
);