export const requestAllPosts = () => (
    $.ajax({
        method: 'GET',
        url: `/api/posts/`
    })
);

export const requestPost = postId => (
    $.ajax({
        method: 'GET',
        url: `/api/posts/${postId}`
    })
);

export const createPost = post => (
    $.ajax({
        method: 'POST',
        url: `/api/users/${post.creatorId}/posts`,
        data: { post }
    })
);

export const updatePost = post => (
    $.ajax({
        method: 'PATCH',
        url: `/api/posts/${post.id}`,
        data: {post}
    })
);

export const deletePost = postId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/posts/${postId}`
    })
);