import Vue from 'vue'
import Vuex from 'vuex'
import { map } from 'p-iteration'

import MovieService from '@/services/MovieService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    planets: [],
    species: []
  },
  getters: {
    getMovieByID: state => id => state.movies.find(m => m.id === id),
    getPlanetByID: state => id => state.planets.find(p => p.id === id),
    getSpecieByID: state => id => state.species.find(s => s.id === id),

    getIDbyURL: state => url => url.match(/\d/g).join(''),

    getAllPlanetIDs: state =>
      state.planets.map(planet => Number(planet.url.match(/\d/g).join(''))),

    getAllSpecieIDs: state =>
      state.species.map(specie => Number(specie.url.match(/\d/g).join('')))

    // filmUrlToId: state => url => url.substring(27, url.length - 1),
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
      console.log('getting movies in actions...')
      // const { data: { results } } = await axios...
      const movies = await MovieService.getMovies().catch(error => {
        console.log('Error in getMovies API call: ', error)
      })
      for (let movie of movies.data.results)
        console.log(`id: ${movie.url.slice(-2)} - ${movie.title}`)

      commit('setMovies', movies.data.results)
    },

    async getPlanets({ commit }, planetIDs) {
      const planets = await map(planetIDs, async id => {
        // TODO: remake using MovieService
        const response = await fetch(`https://swapi.co/api/planets/${id}/`)
        return response.json()
      })
      commit('setPlanets', planets)
    },

    async getSpecies({ commit }, specieIDs) {
      const species = await map(specieIDs, async id => {
        // TODO: remake using MovieService
        const response = await fetch(`https://swapi.co/api/species/${id}/`)
        return response.json()
      })
      commit('setCharacters', species)
    }
  }
})
