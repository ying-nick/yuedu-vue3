import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    searchList:[]
  },
  mutations: {
    
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
