import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

type IStore = {
  state: {
    chapterId:any,
    chapter: any,
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
    setBook(state: any, data: any),
    pushList(state: any, data: any),
    pushChapterId(state:any,data:any)
  },
  actions: {},
  modules: {},
  getters: {},
  plugins: any[]
}
const store: IStore = {
  state: {
    chapterId:'',
    chapter: '',
    searchData: {},
    bookDetails: {},
    readMost: [],
    details: [],
    //用户信息
    user:{
      nickname:'',
      lgn: false,
      src: ''
      
    },
    //书架信息
    tableData: [
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
    adduserinfo(state, content) {
      state.user = content
      location.reload();
      // console.log(state.user)
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
},
//加入书架
    setBook(state, data) {
     let idx=state.tableData.findIndex((item) => {
        return item.bookId==data.bookId
     })
      if (idx == -1) {
        state.tableData.push(data)
        // console.log(state.tableData)
      } else {
        throw new Error('书籍已存在')
      }
     
    },
    pushList(state, data) {
      state.chapter = [...data]
    },
    pushChapterId(state, data) {
      state.chapterId = data
    }
},

  actions: {
    asysetbook(ctx,data) {
      ctx.commit('setBook',data)
    }
  },
  getters: {},
  modules: {
  },
  plugins: [createPersistedState()]
}
export default createStore(store)