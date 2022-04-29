<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="oppo">
                 <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" ><el-icon><expand/></el-icon></i>
            <i v-else class="el-icon-s-unfold"><el-icon><fold/></el-icon></i>
        </div>
        <div class="logo">
              <BreadcrumdVue></BreadcrumdVue>
        </div>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="hover" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="user">个人中心</el-dropdown-item>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {	Edit,Expand,Fold	} from '@element-plus/icons-vue'
import BreadcrumdVue from "./Breadcrumd/Breadcrumd.vue";
export default {
    components:{
        Edit,Expand,Fold,BreadcrumdVue
    },
    // props:['msg','school'],
    // emits:['hello'],
    setup(props,context) {
        const username = localStorage.getItem("ms_username");

        const store = useStore();
        const collapse = computed(() => store.state.collapse);
        // 侧边栏折叠
        const collapseChage = () => {
            console.log(111);
            store.commit("handleCollapse", !collapse.value);
             console.log(collapse.value);
        };

        onMounted(() => {
            if (document.body.clientWidth < 1500) {
                console.log(document.body.clientWidth);
                collapseChage();
            }
        });
        
          // 关闭全部标签
        // const closeAll = () => {
        //     store.commit("clearTags");
        //     router.push("/");
        // };
        // 用户名下拉菜单选择事件
        const router = useRouter();
        const handleCommand = (command) => {
            if (command == "loginout") {
                localStorage.removeItem("ms_username");
                router.push("/login");
                // closeAll()
            } else if (command == "user") {
                router.push("/user");
            }
        };
        function test(){
            context.emit('hello','傻逼')
        }
        return {
            username,
            collapse,
            collapseChage,
            handleCommand,
            test
        };
    },
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 22px;
    color: #000;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.collapse-btn {
    padding-top: 8px;
    padding-right: 10px;
    cursor: pointer;
}
.oppo{
    margin-left: 20px;
    width: 300px;
    display: flex;
    align-items: center;
  
}
.header .logo {
    float: left;
    color: #000;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
  
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #000;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
.collapse-btn:hover {
    background: none;
}

</style>
