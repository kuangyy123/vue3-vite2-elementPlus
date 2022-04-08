<template>
  <div class="inventoryRecord">
      {{state.name}}
      {{num}}
  </div>
 
</template>
 
<script>
// 引入验证码组件
import {reactive,onMounted,ref} from 'vue'
	export default {
		name: '',
		components: {
		},
		setup(){
            const num =ref('8')
			const state =reactive({
                name:"张三",
                age:14
            })
			onMounted(() => {
                state.name ='888'
                num.value = '你好'
            })

			return {
				state,num
			}
		}
	}


</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>