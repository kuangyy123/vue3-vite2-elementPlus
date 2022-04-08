<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content" status-icon="true">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username" >
                        <template #prepend>
                            <el-icon><avatar /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                           <el-icon><avatar /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                 <el-form-item prop="password" style="width:100%">
                     <div class="login">
                          <el-input  placeholder="请输入验证码" v-model="param.code" style="width:60%"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                           <el-icon><avatar /></el-icon>
                        </template>
                    </el-input>
                    <div class="inventoryRecord">
                           <image-code :change="data.change_img_code" @click="changeImageCode" @getCode="backImageCode"></image-code>
                    </div>
                     </div>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import imageCode from '../components/identify.vue';
import {	Avatar	} from '@element-plus/icons-vue'

export default {
    components: { imageCode,Avatar},
     
    setup() {
        const router = useRouter();
        const param = reactive({
            username: "",
            password: "",
            code:""
          
        });
           const data = reactive({
				change_img_code: false, // 刷新验证码
				img_code:'',// 加密后的验证码值
			})
                        
                        // 刷新验证码操作
			const changeImageCode = ()=> {
				data.change_img_code = !data.change_img_code
			}
			
                        // 接收组件返回加密后的验证码值
			const backImageCode = (code) =>{
				data.img_code = code
				console.log('data',data.img_code)
			}
			          
		
			
        const rules = {
            username: [
                {
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur",
                },
            ],
            password: [
                { required: true, message: "请输入密码", trigger: "blur" },
            ],
        };
        const login = ref(null);
        const submitForm = () => {
            login.value.validate((valid) => {
                if (valid) {
                    if(param.code != data.img_code){
                        ElMessage.error("请输入正确的验证码！");
                    }else if(param.code == ''){
                         ElMessage.error("请输入验证码！");
                    }else{
                          ElMessage.success("登录成功");
                    localStorage.setItem("ms_username", param.username);
                    router.push("/home");
                    }
                  
                } else {
                    ElMessage.error("登录失败");
                    return false;
                }
            });
        };

        const store = useStore();
        store.commit("clearTags");

        return {
            param,
            rules,
            login,
            submitForm,
           changeImageCode,
				backImageCode,
				data
        };
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.inventoryRecord{
    height: 32px;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.login{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>