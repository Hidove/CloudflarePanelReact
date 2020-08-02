import axios from 'axios'

import { createHashHistory } from 'history';

import { getToken, clearToken } from '@utils/auth'

import GLOBAL_CONFIG from '@/Config'

const history = createHashHistory()


const instance = axios.create({
    'baseURL': GLOBAL_CONFIG.BASE_URL
    // 'baseURL': 'http://120.78.8.80:8000/'
    // 'baseURL': 'http://127.0.0.1:8000/'
})
// 添加请求拦截器
instance.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    config.headers['Authorization'] = 'Bearer ' + getToken()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use((response) => {
    // 对响应数据做点什么
    console.log(response);
    if (response.data.code === 401) {
        clearToken();
        history.push('/login')
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

const requests = {
    get: (url, params) => {
        return instance.get(url, { 'params': params })
    },
    post: (url, data, params = {}) => {
        return instance.post(url, data, { 'params': params })
    },
    put: (url, data, params = {}) => {

        return instance.put(url, data, { 'params': params })
    },
    patch: (url, data, params = {}) => {

        return instance.patch(url, data, { 'params': params })
    },

    del: (url, params) => {

        return instance.delete(url, { 'params': params })
    }
}

export default requests;