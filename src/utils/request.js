import axios from 'axios'
import router from '@/router/index'
import { ElMessage } from 'element-plus'
// import router from '../router'
// import {Message} from 'element-ui'

const service = axios.create({
    // baseURL:"https://api.test.lingsulife.com",
    baseURL:'http://localhost:3000',
    timeout:10000
})

// 请求拦截
service.interceptors.request.use(
    config=>{
        //设置请求头
         // 是否需要设置 token
         console.log(config);
        if (config.url.includes('/my')) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config
    },
    error=>{
        ElMessage.error(error.message)
    }
)

service.interceptors.response.use(
    config=>{
        console.log(config);
        if(config.data.code === 401){
            localStorage.removeItem('token')
            router.push('/about')
            location.reload()
        }else if(config.data.code !== 200){
            ElMessage.error(config.data.msg)
            router.push('/donate')
        }
        return config.data
    },
    error=>{
        ElMessage.error(error.message)
        return Promise.reject(error.message)
    }
)
export default service