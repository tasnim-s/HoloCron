export const like = (data) => (
    $.ajax({
        method: 'POST',
        url: `/api/likes`,
        data: {like: data}
    })
);

export const unLike = (data) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/likes/0`,
        data: {like: data}
    })
);