<template>
    <div>
        我是首页
    </div>
</template>
<script>

    import { inject, onMounted, toRefs } from 'vue';
// import {goodlists} from '../utils/api/goodlist'
import axios from 'axios'
export default {
    name: "donate",
    setup(){
        let person =inject('son')
        console.log(person);
        onMounted(()=>{
            // goodlists().then(res=>{
            //     console.log(res);
            // })
            axios.get('/api/goodlist').then(res=>{
                console.log(res);
            })
        })
        return{
            ...toRefs(person)
        }
    }
};

</script>