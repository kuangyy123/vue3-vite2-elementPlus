<template>
    <div class="common-layout">
    <el-container>
      <el-aside width="auto">
       <Sidebar/>
      </el-aside>
      <el-container>
        <el-header>
           <Header ></Header>
            <Tags/>
        </el-header>
        <el-main>
           <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
                </keep-alive>
                <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
           </router-view>
           <!-- <router-view></router-view> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Sidebar from '@/components/idebar.vue'
import Header from '@/components/Header.vue'
import Tags from '@/components/Tags.vue'
import {computed} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {reactive,watch,toRefs} from 'vue'
export default {
    components:{
        Sidebar,Header,Tags
    },
    setup() {
        const store = useStore()
        const tags = computed(()=> store.state.tagsList)
       
       
         const state = reactive({
        includeList: []
      })
      const route = useRoute()
     
      function aaa(){
          tags.map(item=>{
              if(item.meta.keepAlive === true){
                  includeList.push(item.name)
              }
          })
      }
      // const router = useRouter()
    //   watch(() => route,(newVal,oldVal)=>{
    //     if(newVal.meta.keepAlive && state.includeList.indexOf(newVal.name) === -1){
    //       state.includeList.push(newVal.name);
    //       console.log(state.includeList);
    //     }
    //   },{deep:true}) // 开启深度监听
        return{
            tags,store,aaa, ...toRefs(state)
        }
    }
}
</script>
<style scoped>

.common-layout,.el-container{
width: 100%;
height: 100%;
}
.el-tag{
    margin: 0 5px;
}
.el-aside {
    --el-aside-width: 200px;
    overflow: auto;
    box-sizing: border-box;
    flex-shrink: 0;
    height: 100%;
    width: var(--el-aside-width);
}
.el-header{
    width: 100%;
    background: rgb(247, 244, 244);
}
.el-menu{
    height: 100%;
}
.el-header{
    height: 94px;
    padding: 0;
}
.el-main {
    --el-main-padding: 20px;
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    box-sizing: border-box;
    padding: var(--el-main-padding);
}
</style>
