import Vue from 'vue'
import Vuex from 'vuex'
import { map } from 'p-iteration'

import MovieService from '@/services/MovieService.js'

Vue.use(Vuex)

// helper function that is used a lot throughout the app
let URLtoID = url => url.match(/\d/g).join('')

export default new Vuex.Store({
  state: {
    movies: [],
    planets: [],
    species: []
  },

  getters: {
    getIDbyURL: () => url => URLtoID(url),

    getMovieByID: state => id =>
      state.movies.find(movie => URLtoID(movie.url) === id),
    getPlanetByID: state => id =>
      state.planets.find(planet => URLtoID(planet.url) === id),
    getSpecieByID: state => id =>
      state.species.find(specie => URLtoID(specie.url) === id),

    getPlanetsByIDs: state => ids =>
      state.planets.filter(planet => ids.includes(URLtoID(planet.url))),
    getSpeciesByIDs: state => ids =>
      state.species.filter(specie => ids.includes(URLtoID(specie.url))),

    getAllPlanetsIDs: state =>
      state.planets.map(planet => Number(URLtoID(planet.url))),
    getAllSpeciesIDs: state =>
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
      console.log('~ dispatching getMovies...')
      // const { data: { results } } = await axios...
      const {
        data: { results }
      } = await MovieService.getMovies().catch(error => {
        console.error('Error in getMovies API call: ', error)
      })
      for (let movie of results)
        console.log(`movie id: ${movie.url.slice(-2)[0]} - ${movie.title}`)

      commit('setMovies', results)
    },

    async getPlanets({ commit }, planetsIDs) {
      console.log('~ dispatching getPlanets...')
      const planets = await map(planetsIDs, async id => {
        const { data } = await MovieService.getPlanet(id).catch(error => {
          console.error('Error in getPlanets API call: ', error)
        })
        console.log(` planet id: ${data.url.slice(-2)[0]} - ${data.name}`)
        return data
      })
      commit('setPlanets', planets)
    },

    async getSpecies({ commit }, speciesIDs) {
      console.log('~ dispatching getSpecies...')
      const species = await map(speciesIDs, async id => {
        const { data } = await MovieService.getSpecie(id).catch(error => {
          console.error('Error in getSpecies API call: ', error)
        })
        console.log(`  specie id: ${data.url.slice(-2)[0]} - ${data.name}`)
        return data
      })
      commit('setSpecies', species)
    }
  }
})
// const response = await fetch(`https://swapi.co/api/species/${id}/`)
// return response.json()
