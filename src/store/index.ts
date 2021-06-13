import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    details:[],
    user:{
      nickname:'',
      avatar:''
    }
      

  },
  mutations: {
    //获取用户信息
    adduserinfo(state,content){
          state.user=content
          console.log(state.user)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
