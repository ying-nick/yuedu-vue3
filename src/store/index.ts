import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    details:[],
    user:{
      user:''
    }
      

  },
  mutations: {
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
