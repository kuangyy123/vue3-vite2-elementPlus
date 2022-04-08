<template>
    <div class="common-layout">
    <el-container>
      <el-aside width="auto">
       <Sidebar/>
      </el-aside>
      <el-container>
        <el-header>
            <Header/>
            <Tags/>
              
        </el-header>
        <el-main>
           <!-- <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tags">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
           </router-view> -->
           <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Sidebar from '../components/idebar.vue'
import Header from '../components/Header.vue'
import Tags from '../components/Tags.vue'
import {computed} from 'vue'
import {useStore} from 'vuex'
export default {
    components:{
        Sidebar,Header,Tags
    },
    setup() {
        const store = useStore()
        const tags = computed(()=> store.state.tagsList)
        return{
            tags,store
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
.el-aside{
  
    height: 100%;
}
.el-header{
    width: 100%;
    background: #555;
}
.el-menu{
    height: 100%;
}
.el-header{
    height: 94px;
    padding: 0;
}

</style>
