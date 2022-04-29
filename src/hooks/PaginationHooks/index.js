
import { reactive} from "vue";
export default  function(){

    let pager = reactive({
      currentPage4:4,
      pageSize4:2,
      pagesizes:[2,4,8,10],
      total:6,
      background:true
    });
   
    const handleSizeChange = (val) => {
      pager.pageSize4 = val;
    };
    const handleCurrentChange = (val) => {
      pager.currentPage4 = val;
    };
    return {
      pager,
      handleSizeChange,
      handleCurrentChange
     
    };
}
