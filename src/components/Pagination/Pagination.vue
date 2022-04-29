<template>
  <!-- 封装分页 -->
  <div class="pag">
    <div class="demo-pagination-block">
      <el-pagination
        :currentPage="pager.currentPage4"
        :background="pager.background"
        :page-size="pager.pageSize4"
        :page-sizes="pager.pagesizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>

</template>
<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
    props:['pager'],
    components: {
    },
    setup(props,context) {
    const router = useRouter();
    const store = useStore();
    const handleSizeChange = (val) => {
      context.emit('changeSize')
    };
    const handleCurrentChange = (val) => {
      context.emit('changeCurrent')
    };
    return {
      router,
      store,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>
<style >
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.pag{
    /* width: 100%; */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    margin-bottom: 10px;
    margin-top: 15px;
    padding: 10px 20px!important;
}
</style>