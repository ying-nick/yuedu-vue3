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
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹2",
        newpage: "一千一百章"
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹3",
        newpage: "一千一百章"
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹4",
        newpage: "一千一百章"
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹5",
        newpage: "一千一百章"
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹6",
        newpage: "一千一百章"
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹7",
        newpage: "一千一百章"
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹8",
        newpage: "一千一百章"
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹9",
        newpage: "一千一百章"
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹10",
        newpage: "一千一百章"
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹11",
        newpage: "一千一百章"
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹12",
        newpage: "一千一百章"
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹13",
        newpage: "一千一百章"
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹14",
        newpage: "一千一百章"
      },
      {
        type: "玄幻",
        picture: "",
        name: "斗破苍穹15",
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
