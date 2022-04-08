import {createStore} from 'vuex'
// import persistedState from 'vuex-persistedstate'
export default createStore({
    state: {
        tagsList: [
            {
                icon: "el-icon-lx-home",
                name:"dashboard",
                path:"/dashboard",
                title: "系统首页",
            }
        ],
        a:1,
        menuActive:"/dashboard",
        currentMenu:null,
        collapse: false
    },
    mutations: {
        a(state){
            state.a ++
        },
        //点击tags menu菜单高亮
        getmenuActive(state,val){
            state.menuActive = val
        },
        selectMenu(state,val){
            if(val.name != 'dashboard'){
                state.currentMenu = val
              const result =  state.tagsList.findIndex(item=>item.name === val.name)
              if(result == -1){
                  state.tagsList.push(val)
              }
            }else{
                state.currentMenu = null
            }
        },
        clearTags(state) {
            state.tagsList = []
            setTimeout(()=>{
                state.tagsList = [
                    {
                        icon: "el-icon-lx-home",
                        name:"dashboard",
                        path:"/dashboard",
                        title: "系统首页",
                    }
                ]
            },3000)
        },
        delTagsItem(state, data) {
            state.tagsList.splice(data.index, 1);
        },
        setTagsItem(state, data) {
            state.tagsList.push(data)
        },
        closeCurrentTag(state, data) {
            for (let i = 0, len = state.tagsList.length; i < len; i++) {
                const item = state.tagsList[i];
                if (item.path === data.$route.fullPath) {
                    if (i < len - 1) {
                        data
                            .$router
                            .push(state.tagsList[i + 1].path);
                    } else if (i > 0) {
                        data
                            .$router
                            .push(state.tagsList[i - 1].path);
                    } else {
                        data
                            .$router
                            .push("/");
                    }
                    state
                        .tagsList
                        .splice(i, 1);
                    break;
                }
            }
        },
        // 侧边栏折叠
        handleCollapse(state, data) {
            state.collapse = data;
        }
    },
    actions: {},
    modules: {},
    // plugins: [
    //     persistedState({ storage: window.sessionStorage })  //无痕浏览
    // ]
})