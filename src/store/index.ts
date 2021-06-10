import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = {
  state: {
    bookId: '',
  },
  mutations: {
    
  },
  actions: {
  },
  modules: {
  },
  getters: {
  },
  plugins: [createPersistedState()]
}
export default createStore(store)
