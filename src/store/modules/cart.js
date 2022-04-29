export default{
    namespaced: true,
    state:{
        num:1
    },
    mutations:{
        add(state){
            state.num++
        }
    }
}