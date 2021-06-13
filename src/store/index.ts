import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

type IStore = {
  state: {
    searchData: any;
    bookDetails: any;
  }
  mutations: {
    getSearchData(state: any, data: any),
    getBookDetails(state: any, data: any),
  },
  actions: {},
  modules: {},
  getters: {},
  plugins: any[]
}
const store: IStore ={
  state: {
    searchData: {},
    bookDetails:{}
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