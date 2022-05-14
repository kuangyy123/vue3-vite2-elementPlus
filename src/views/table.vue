<template>
  <div class="inventoryRecord">
	  <!-- <button @click="addfun">点击</button> -->
    <el-table :data="tableData" border center :header-cell-style="{'text-align':'center'}"  :cell-style="{'text-align':'center'}"
 height="600px"  row-key="bridgecode">
    <el-table-column prop="id" label="Date"  show-overflow-tooltip/>
    <el-table-column prop="name" label="Name"  show-overflow-tooltip/>
    <el-table-column prop="price" label="Address" show-overflow-tooltip/>
	  <el-table-column prop="count" label="Address" show-overflow-tooltip/>
  </el-table>
	<Pagination :pager="pager" @changeSize="handleSizeChange" @changeCurrent="handleCurrentChange"></Pagination>
  </div>
</template>
 
<script>
// 引入验证码组件
import axios from 'axios'
import Pagination from '../components/Pagination/Pagination.vue'
import {reactive,onMounted,ref, toRefs} from 'vue'
import {useStore} from 'vuex'
import usePaginationHooks from '../hooks/PaginationHooks/index'  //使用自定义hooks

	export default {
		name: '',
		components: {Pagination
		},
		setup(){
			const store = useStore()
    let {pager,handleSizeChange,handleCurrentChange} = usePaginationHooks()
  
			const table =reactive({
				tableData:[]
			}) 
            const num =ref('8')
		
			const addfun = ()=>{
					axios({
				url: '/api/addlist',
				method: "post",		 //类型
				data: {
					id: 552,
					name: '2575'
					
				}
		
			}).then(res=>{
				console.log(res);
			})

			}
			 onMounted(()=>{
            axios.get('/api/goodlist').then(res=>{
                console.log(res);
				if(res.data.code ==200){
					table.tableData = res.data.data
				}
            })
		
		
        })

			return {
				num,...toRefs(table),addfun, pager,store,
      handleSizeChange,
      handleCurrentChange
			}
		}
	}


</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .inventoryRecord{
	height: 100%;
} */
.el-table .cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    text-align: center;
    padding: 0 12px;
}
</style>