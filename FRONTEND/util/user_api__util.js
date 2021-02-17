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