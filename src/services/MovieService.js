import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://swapi.co/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getPlain(url) {
    return apiClient.get(url)
  },
  getMovies() {
    return apiClient.get(`/films`)
  },
  getPlanets() {
    return apiClient.get(`/planets`)
  },
  getSpecies() {
    return apiClient.get(`/species`)
  },
  getMovie(id) {
    return apiClient.get(`/films/${id}/`)
  },
  getPlanet(id) {
    return apiClient.get(`/planets/${id}/`)
  },
  getSpecie(id) {
    return apiClient.get(`/species/${id}/`)
  }
}
