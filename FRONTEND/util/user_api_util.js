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

export const sendRequest = (request) => (
    $.ajax({
        method: 'POST',
        url: `/api/requests`,
        data: {request}
    })
);

export const respondRequest = (request) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/requests/0`,
        data: {request}
    })
);

export const destroyFriendship = (friendship) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/friendships/0`,
        data: {friendship}
    })
);