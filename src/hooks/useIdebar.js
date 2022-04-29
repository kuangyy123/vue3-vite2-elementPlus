import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default function () {
    const items = [
        {
            icon: "el-icon-lx-home",
            name: 'dashboard',
            path: "/dashboard",
            title: "系统首页",
        },
        {
            icon: "el-icon-lx-cascades",
            name: 'table',
            path: "/table",
            title: "基础表格",
        },
        {
            icon: "el-icon-lx-copy",
            name: 'tabs',
            path: "/tabs",
            title: "tab选项卡",
        },

        {
            icon: "el-icon-lx-warn",
            name: '7',
            path: "/7",
            title: "错误处理",
            subs: [
                {
                    name: '404',
                    path: "/404",
                    title: "404页面",
                },
            ],
        },
        {
            icon: "el-icon-lx-redpacket_fill",
            name: 'donate',
            path: "/donate",
            title: "支持作者",
        },
    ];

    const router = useRouter();
    const store = useStore()


    function clickMenu(item) {
        console.log(item);
        router.push(item.path)
        store.commit('selectMenu', item)
        store.commit('getmenuActive', item.path)

    }

    return items



}