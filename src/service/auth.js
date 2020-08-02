
import requests from '@utils/requests'

export const loginApi = (user) => {
    let formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    return requests.post('/login', formData)
}