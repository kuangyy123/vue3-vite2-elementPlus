import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/home.vue";
import { ElMessage } from "element-plus";
import store from "../store";
const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '系统首页'
        },
        component: () => import ( /* webpackChunkName: "dashboard" */ "../views/login.vue")
    },
    {
        path: "/home",
        name: "Home",
        redirect:"/dashboard",
        component: Home,
        children:[
            {
                path: "/dashboard",
                name: "Dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/dashboard.vue")
            },
            {
                path: "/table",
                name: "Table",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/table.vue")
            },
            {
                path: "/tabs",
                name: "Tabs",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者'
                },
                component: () => import ( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }
           
        ]
    },
   
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


router.beforeEach((to, from, next) => {
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
export default router;