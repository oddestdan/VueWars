<template>
  <div class="movie-list">
    <h1>Star Wars Filmography</h1>
    <MovieCard
      v-for="(movie, i) in movies"
      :movie="movie.data"
      :id="movie.id"
      :key="`movie_${i}`"
    />
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import MovieService from '@/services/MovieService.js'

// import store from '@/store.js'

export default {
  name: 'movie-list',

  components: {
    MovieCard
  },

  data() {
    return {
      movies: []
    }
  },

  created() {
    MovieService.getMovies()
      .then(response => {
        this.movies = response.data.results.map(movie => {
          return (movie = {
            id: movie.url.match(/\d/g).join(''),
            data: movie
          })
        })

        // this.movies.forEach(movie => {
        // if (movie.id !== )
        // store.commit('ADD_MOVIE', movie)
        // })

        console.log('outputting movies')
        console.log(this.movies)
        // console.log(store.state.movies)
      })
      .catch(error => {
        console.log(
          'There was an error in MovieList API call: ',
          error.response
        )
      })
  }
}
</script>

<style lang="scss" scoped></style>
