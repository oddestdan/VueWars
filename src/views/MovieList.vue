<template>
  <div class="movie-list">
    <h1>Star Wars Filmography</h1>
    <MovieCard v-for="movie in movies" :movie="movie" :key="movie.episode_id" />
    <!-- <router-link :to="{ name: 'movie-show', params: { id: '2' } }" -->
    <!-- >Show Old Republic</router-link -->
    <!-- > -->
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import MovieService from '@/services/MovieService.js'

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
        this.movies = response.data.results
        console.log(this.movies)
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
