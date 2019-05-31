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
  getMovies() {
    return apiClient.get(`/films`)
  },
  getMovie(id) {
    return apiClient.get(`/films/${id}/`)
  }
}
