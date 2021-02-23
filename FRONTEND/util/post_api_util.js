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
        url: `/api/users/${post.get("post[creatorId]")}/posts`,
        data: post,
        contentType: false,
        processData: false
    })
);

export const updatePost = post => (
    $.ajax({
        method: 'PATCH',
        url: `/api/posts/${post.get("post[id]")}`,
        data: post,
        contentType: false,
        processData: false
    })
);

export const deletePost = postId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/posts/${postId}`
    })
);