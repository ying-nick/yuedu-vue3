import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    details:[],
    //用户信息
    user:{
      nickname:'',
      avatar:''
    },
    //书架信息
    tableData: [
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹1",
        newpage: "一千一百章"
      }
    ]
      

  },
  mutations: {
    //获取用户信息
    adduserinfo(state,content){
          state.user=content
          console.log(state.user)
    },
    //从书架删除
    delete(state,content){
        // console.log(content)
        state.tableData.map((item,index)=>{
           if(item.name==content){
            state.tableData.splice(index,1)
           }
        })
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
