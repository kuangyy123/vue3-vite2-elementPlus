<template>
    <div>
       <button @click="changepath">8888888</button>
        <i class="iconfont icon-renwen"></i>
       {{store.state.a}}
    </div>
</template>
<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
export default {
    setup(props) {
        const router = useRouter()
        const store = useStore()

        function changepath(){
            store.commit('a')
        }

        return{
            router,store,changepath
        }
    }
}
</script>
<style lang="scss">
    
</style>