import {createRouter, createWebHashHistory} from "vue-router";
import { ElMessage } from "element-plus";
import store from "../store";
import nprogress from 'nprogress'
const routes = [
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "dashboard" */ "../views/login.vue")
    },
    {
        path: '/:catchAll(.*)',
        name: '/404',
        meta: {
            title: '404页面',
            keepAlive: true, // 组件需要缓存
        },
        component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
      },
    {
        path: "/",
        name: "Home",
        component: () => import ( /* webpackChunkName: "dashboard" */ "../views/home.vue"),
        redirect: '/dashboard',
        meta: {
            title: '首页',
            keepAlive: true, // 组件需要缓存
        },
        children:[
            {
                path: "/dashboard",
                name: "Dashboard",
                meta: {
                    title: '系统数据',
                    keepAlive: true, // 组件需要缓存
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/dashboard.vue")
            },
            {
                path: "/table",
                name: "Table",
                meta: {
                    title: '表格',
                    keepAlive: true, // 组件需要缓存
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/table.vue")
            },
            {
                path: "/tabs",
                name: "Tabs",
                meta: {
                    title: '文件上传',
                    keepAlive: true, // 组件需要缓存
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tabs.vue")
            }, 
            {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者',
                    keepAlive: false
                },
                component: () => import ( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            },
             {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    keepAlive: true, // 组件需要缓存
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, 
            {
                icon: "icon-baobiao",
                name: "7",
                path: "/7",
                meta: {
                    title: '错误处理',
                    keepAlive: true, // 组件需要缓存
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue'),
                children:[
                    {
                        path: '/404',
                        name: '404',
                        meta: {
                            title: '404页面',
                            keepAlive: true, // 组件需要缓存
                        },
                        component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
                    },
                ]
            },
          
           
           
        ]
    },
   
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


router.beforeEach((to, from, next) => {
    //在路由跳转之前开启
  nprogress.start()
    let tagsList = store.state.tagsList
        document.title = `${to.meta.title}`;
    console.log(to.path,to.meta.title,to.name);
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        ElMessage.error('请先登录')
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        // if(to.path !== '/dashboard'){
        //     store.commit("setTagsItem", {
        //         name: to.name,
        //         title: to.meta.title,
        //         path: to.path,
        //     });
           
        // }
        next();
    }
});
//路由后置钩子
router.afterEach(()=>{
    //路由跳转结束之后 进度条结束
    nprogress.done()
  })
export default router;