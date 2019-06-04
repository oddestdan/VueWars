import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: new Set()
  },
  getters: {},
  mutations: {
    ADD_MOVIE(store, movie) {
      store.movies.add(movie)
    }
  },
  actions: {}
})
