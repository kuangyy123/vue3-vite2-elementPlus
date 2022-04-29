<template>
   <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item,index) in breadList"
        :key="index"
      >{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
 
</template>
<script>
import { watch,onMounted,ref,reactive } from 'vue'
import { useRoute,useRouter } from "vue-router"
export default{
    setup(props,context){
        const route = useRoute()
        const router = useRouter()
        const breadList = ref([])
         const matched =ref(route.matched)
         console.log(matched);
      
        const getBreadcrumb=()=>{
            breadList.value= matched.value
            console.log(breadList.value);
        }
        onMounted(()=>{
            getBreadcrumb()
        })
        // 监听路由变化时触发
        watch( route,(newValue,oldValue) => {
            console.log(newValue,oldValue);
            breadList.value = newValue.matched;
            console.log(111);
        },{immediate: true },{deep:true})
  
        return{
            route,breadList,matched,router,getBreadcrumb
        }
    }
}
</script>