import Vue from 'vue'
import Vuex from 'vuex'
import { map } from 'p-iteration'

import MovieService from '@/services/MovieService.js'

Vue.use(Vuex)

// function URLtoID(url) {
// return url.match(/\d/g).join('')
// }
let URLtoID = url => url.match(/\d/g).join('')

export default new Vuex.Store({
  state: {
    movies: [],
    planets: [],
    species: []
  },
  getters: {
    getMovieByID: state => id =>
      state.movies.find(movie => URLtoID(movie.url) === id),
    getPlanetByID: state => id =>
      state.planets.find(planet => URLtoID(planet.url) === id),
    getSpecieByID: state => id =>
      state.species.find(specie => URLtoID(specie.url) === id),

    getPlanetsByIDs: state => ids =>
      // state.planets.filter(planet => ids.includes(URLtoID(planet.url))),
      state.planets.filter(planet => {
        console.log(`  planet --- ${planet.name}`)
        for (let id of ids) {
          console.log(`    id --- ${id}`)
          if (URLtoID(planet.url) === id) return true
        }
        return false
      }),
    getSpeciesByIDs: state => ids =>
      state.species.filter(specie => ids.includes(URLtoID(specie.url))),

    getIDbyURL: () => url => URLtoID(url),

    getAllPlanetIDs: state =>
      state.planets.map(planet => Number(URLtoID(planet.url))),

    getAllSpecieIDs: state =>
      state.species.map(specie => Number(URLtoID(specie.url)))
  },
  mutations: {
    setMovies: (state, payload) => (state.movies = payload),
    setPlanets: (state, payload) =>
      (state.planets = [...state.planets, ...payload]),
    setSpecies: (state, payload) =>
      (state.species = [...state.species, ...payload])
  },
  actions: {
    async getMovies({ commit }) {
      console.log('dispatching getMovies...')
      // const { data: { results } } = await axios...
      const movies = await MovieService.getMovies().catch(error => {
        console.log('Error in getMovies API call: ', error)
      })
      for (let movie of movies.data.results)
        console.log(`id: ${movie.url.slice(-2)[0]} - ${movie.title}`)

      commit('setMovies', movies.data.results)
    },

    async getPlanets({ commit }, planetsIDs) {
      console.log('dispatching getPlanets...')
      const planets = await map(planetsIDs, async id => {
        // TODO: remake using MovieService
        const response = await fetch(`https://swapi.co/api/planets/${id}/`)
        return response.json()
      })
      commit('setPlanets', planets)
    },

    async getSpecies({ commit }, speciesIDs) {
      console.log('dispatching getSpecies...')
      const species = await map(speciesIDs, async id => {
        // TODO: remake using MovieService
        const response = await fetch(`https://swapi.co/api/species/${id}/`)
        return response.json()
      })
      commit('setSpecies', species)
    }
  }
})
