import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

type IStore = {
  state: {

    searchData: any;
    bookDetails: any;
    readMost: any;
    details:any;
    user:any;
    tableData:any;
    chapterlist:any;
    comic:any;
  }
  mutations: {
    getSearchData(state: any, data: any),
    getBookDetails(state: any, data: any),
    getReadMost(state: any, data: any),
    adduserinfo(state:any,data:any),
    delete(state:any,data:any),
    addchapterlist(state:any,data:any),
    addcomic(state:any,data:any),
  },
  actions: {},
  modules: {},
  getters: {},
  plugins: any[]
}
const store: IStore ={
  state: {
    searchData: {},
    bookDetails: {},
    readMost:[], 
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
    ],
    //当前漫画
    chapterlist:[],
    comic:'',
    
  },
  mutations: {
    getSearchData(state, data) {
      // console.log(state.searchData)
      state.searchData = data
      // console.log(data)
      // console.log(state.searchData.count)
    },
    getBookDetails(state, data) {
      state.bookDetails = data
      // console.log(state.bookDetails)
    },
    getReadMost(state, data) {
      state.readMost = data
      // console.log(state.bookDetails)
    },
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
},

addchapterlist(state,data){
   state.chapterlist=data
},
addcomic(state,data){
  state.comic=data
  console.log(state.comic)
}
},

  actions: {
  },
  getters: {},
  modules: {
  },
  plugins: [createPersistedState()]
}
export default createStore(store)