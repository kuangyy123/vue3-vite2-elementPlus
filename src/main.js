import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/icons/iconfont/iconfont.css'  //引入iconfont样式
import ElementPlus from 'element-plus' //引入ElementPlus组件
import 'element-plus/dist/index.css'  //引入element-plus样式
import 'nprogress/nprogress.css'    //引入进度条样式
import './mock/index'  //引入mock

const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
// app.config.globalProperties.$ElMessage = ElMessage;
