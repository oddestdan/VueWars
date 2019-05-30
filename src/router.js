import Vue from 'vue'
import Router from 'vue-router'
import MovieList from './views/MovieList.vue'
import MovieShow from './views/MovieShow.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'movie-list',
      component: MovieList
    },
    {
      path: '/movie/:moviename',
      name: 'movie-show',
      component: MovieShow,
      props: true // params are sent as props, instead of being sent in router-link
    }
  ]
})
