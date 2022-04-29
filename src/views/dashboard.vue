<template>
  <div id="customerChart">
    <Pagination :pager="pager" @changeSize="handleSizeChange" @changeCurrent="handleCurrentChange"></Pagination>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination/Pagination.vue'
import usePaginationHooks from '../hooks/PaginationHooks/index'  //使用自定义hooks
import { useStore } from "vuex";
import { onMounted, reactive, toRefs } from 'vue';
import * as echarts from 'echarts'
export default {
    components:{
        Pagination
    },
  setup() {
    const store = useStore()
    let {pager,handleSizeChange,handleCurrentChange} = usePaginationHooks()
    let person=reactive({
      name:'zhangsan',
      age:10
    })
    onMounted(()=>{
      let myChart = echarts.init(document.getElementById("customerChart"));
        // 绘制图表
        myChart.setOption({
          title: { text: "总用户量" },
          tooltip: {},
          xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
          });
          window.onresize = function () {//自适应大小
            myChart.resize();
          };

    })
    return {
      store,
      pager,
      ...toRefs(person),
      handleSizeChange,
      handleCurrentChange
    };
  },
};
</script>
<style >
#customerChart{
 display: flex;
 align-items: center;
 justify-content: center;
  width: 100%;
  height: 500px;
  margin-top: 200px;
}
</style>