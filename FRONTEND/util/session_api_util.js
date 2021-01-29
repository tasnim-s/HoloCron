export const login = user => (
    $.ajax({
        method: 'POST',
        url: `/api/session`,
        data: {user}
    })
);

export const signup = user => (
    $.ajax({
        method: 'POST',
        url: `/api/users`,
        data: { user }
    })
);

export const logout = () => (
    $.ajax({
        method: 'DELETE',
        url: `/api/session`
    })
);

export const update = formData => (
    $.ajax({
        method: 'PATCH',
        url: `/api/users/${formData.get("user[id]")}`,
        data: formData,
        contentType: false,
        processData: false
    })
)