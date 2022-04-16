import axios from 'axios'

export function requestNeteaseMusicAPI(config) {
    const instance = axios.create({
        // 上线需要的api接口
        baseURL: 'https://canon.top/api',
        // 本地开发用的接口
        // baseURL: 'http://101.32.74.207:59124',
        withCredentials: true,
        timeout: 10000
    })
    return instance(config)
}