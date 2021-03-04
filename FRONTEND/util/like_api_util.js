export const like = (data) => (
    $.ajax({
        method: 'POST',
        url: `/api/likes`,
        data: {data}
    })
);

export const unLike = (data) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/likes/0`,
        data: {data}
    })
);