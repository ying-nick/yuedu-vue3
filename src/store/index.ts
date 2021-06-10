import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    details:[]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
