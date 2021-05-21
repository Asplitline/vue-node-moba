import axios from 'axios'
import Vue from 'vue'
import Router from './router'
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = 'Bearer ' + (localStorage.getItem('token') || '')
    }
    return config
}, err => {
    return Promise.reject(error);
})
http.interceptors.response.use(res => {
    return res
}, err => {
    const { data, status } = err.response
    Vue.prototype.$message.error(data.message)
    if (status === 401) {
        Router.push('/login')
    }
    return Promise.reject(err)
})

export default http