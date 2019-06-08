<template>
  <div class="movie-list">
    <h1>Star Wars Filmography</h1>
    <MovieCard
      v-for="(movie, i) in movies"
      :movie="movie"
      :id="getIDbyURL(movie.url)"
      :key="`movie_${i}`"
    />
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'movie-list',

  components: {
    MovieCard
  },

  computed: {
    ...mapState(['movies']),
    ...mapGetters(['getIDbyURL'])
  },

  async created() {
    if (this.movies.length === 0) this.$store.dispatch('getMovies')
  }
}
</script>
