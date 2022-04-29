<template>
 <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<script >
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { useRouter,useRoute } from "vue-router";
import { useStore } from "vuex";
// import {ref} from 'vue'
export default {
   components: {
    ElConfigProvider
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter();
    const store = useStore();
      // 监听页面的变化、改变menu菜单的折叠
     (function () {
      var set = function () {
        var clientWidth = document.documentElement.clientWidth || window.innerWidth;
        console.log(clientWidth);
        if(clientWidth<1000){
          store.commit('handleCollapse',true)
        }else{
          store.commit('handleCollapse',false)
        }
      }
      set();
      window.addEventListener('resize', set);
    }());
   let locale = zhCn
  
   


    return {
      router,
      store,
      route,
      locale
    
    };
  },
};
</script>
<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
#app {
  width: 100%;
  height: 100%;
}
body,html{
   user-select:none
}
</style>
