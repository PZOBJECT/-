import axios from 'axios';
import { Message } from 'element-ui';

axios.defaults.timeout = 30000;
axios.defaults.baseURL = '/api/core';

//http request 拦截器
axios.interceptors.request.use(
    config => {
        //config.data = JSON.stringify(config.data);
        config.headers = {
            /* 'Content-Type': 'application/x-www-form-urlencoded' */
            'Content-Type': 'application/json'
        }
        let token;
        if(config.url.indexOf("/back/") > -1){
            token = localStorage.getItem('$back-token');
        } else {
            token = localStorage.getItem('$token');
        }
        if(token){
            if(config.params){
                config.params.token = token;
            }else {
                config.params = {'token': token};
            }
        }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        //token失效的判断
        if (response.data.status === '2') {
            router.push({
                path: "back/login",
                querry: {
                    redirect: router.currentRoute.fullPath
                } //从哪个页面跳转
            })
        }
        //有token则更新token
        else if(response.data.token) {
            if(response.config.url.indexOf("/back/") > -1) {
                localStorage.setItem('$back-token', response.data.token);
            } else {
                localStorage.setItem('$token', response.data.token);
            }
        }
        console.log(response.data);
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}