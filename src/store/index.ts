import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

type IStore = {
  state: {
    searchData: any;
  }
  mutations: {
    getSearchData(state: any, data: any),
   
  },
  actions: {},
  modules: {},
  getters: {},
  plugins: any[]
}
const store: IStore ={
  state: {
    searchData:{}
  },
  mutations: {
    getSearchData(state, data) {
      // console.log(state.searchData)
      state.searchData = data
      // console.log(data)
      // console.log(state.searchData.count)
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