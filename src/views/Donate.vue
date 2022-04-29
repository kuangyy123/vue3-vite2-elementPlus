<template>
 
    <div>
      
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-redpacket_fill"></i> 支持作者
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">如果该框架对你有帮助，那就请作者喝杯饮料吧！加微信号kuangyi0923探讨问题。</div>
            <div>
                <img src="../assets/img/avtor.jpg" />
            </div>
        </div>
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

<style scoped>
img{
    width: 200px;
}
</style>