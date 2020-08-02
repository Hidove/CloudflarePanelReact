

export const isLogined = () => {

    return getToken();
}
export const getToken = () => {
    return localStorage.getItem('access_token');
}

export const clearToken = () => {
    return localStorage.removeItem('access_token');
}

export const setToken = (access_token) => {
    localStorage.setItem('access_token', access_token);
}
export const getUsername = () => {
    return localStorage.getItem('username');
}

export const clearUsername = () => {
    return localStorage.removeItem('username');
}

export const setUsername = (username) => {
    localStorage.setItem('username', username);
}

export const clearAll = () => {
    return localStorage.clear()
}

export const setFormdata = (values) => {
    localStorage.setItem('formdata',JSON.stringify(values))
}

export const getFormdata = () => {
    return JSON.parse(localStorage.getItem('formdata'))
}

