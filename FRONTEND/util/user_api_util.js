export const requestAllUsers = () => (
    $.ajax({
        method: 'GET',
        url: `/api/users/`
    })
);

export const requestUser = userId => (
    $.ajax({
        method: 'GET',
        url: `/api/users/${userId}`
    })
);

export const updateUser = formData => (
    $.ajax({
        method: 'PATCH',
        url: `/api/users/${formData.get("user[id]")}`,
        data: formData,
        contentType: false,
        processData: false
    })
);

export const createFriendship = (friendship) => (
    $.ajax({
        method: 'POST',
        url: `/api/friendships`,
        data: {friendship}
    })
);

export const destroyFriendship = (friendship) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/friendships/1`,
        data: {friendship}
    })
);