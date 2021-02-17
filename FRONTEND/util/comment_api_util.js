export const requestAllComments = () => (
    $.ajax({
        method: 'GET',
        url: `/api/comments/`
    })
);

export const requestComment = commentId => (
    $.ajax({
        method: 'GET',
        url: `/api/comments/${commentId}`
    })
);

export const createComment = comment => (
    $.ajax({
        method: 'POST',
        url: `/api/users/${comment.commenterId}/comments`,
        data: { comment }
    })
);

export const updateComment = comment => (
    $.ajax({
        method: 'PATCH',
        url: `/api/comments/${comment.id}`,
        data: {comment}
    })
);

export const deleteComment = commentId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/comments/${commentId}`
    })
);