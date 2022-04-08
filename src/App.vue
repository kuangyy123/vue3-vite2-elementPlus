<template>
  <router-view></router-view>
</template>
<script >
import {onMounted} from 'vue'
import { useRouter,useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup(props) {
    const route = useRoute()
    const router = useRouter();
    const store = useStore();
    onMounted(()=>{
      console.log(window.location.hash)
      let path = window.location.hash+''
      console.log(path);
      let b= path.replace('#','')
      console.log(b);
      // router.path
      store.commit("getmenuActive",b);
      router.push("/dashboard")
    })
    window.addEventListener("beforeunload", () => {
       console.log( window.location.href,route.path);
      console.log(8888);
      // store.commit("getmenuActive", "/dashboard");
      // router.push("/dashboard")
    });

    return {
      router,
      store,
      route
    
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
</style>
