<template>
  <div class="movie-show">
    <div class="movie-wrapper" v-if="!isLoading">
      <h1>Episode #{{ movie.episode_id }} - {{ movie.title }}</h1>
      <div class="main-info">
        <h4>Director: {{ movie.director }}</h4>
        <h4>Produced by: {{ movie.producer }}</h4>
        <h4>Release date: {{ movie.release_date }}</h4>
      </div>
      <div class="description">
        <p>{{ movie.opening_crawl }}</p>
      </div>
    </div>

    <div class="planets-species-wrapper" v-if="!isLoading">
      <h3>Planets</h3>
      <ul>
        <li>
          <PlanetCard
            v-for="(planet, i) in currentMoviePlanets"
            :planet="planet"
            :id="getIDbyURL(planet.url)"
            :key="`planet_${i}`"
          />
        </li>
      </ul>

      <h3>Species</h3>
      <ul>
        <li>
          <SpecieCard
            v-for="(specie, i) in currentMovieSpecies"
            :specie="specie"
            :id="getIDbyURL(specie.url)"
            :key="`specie_${i}`"
          />
        </li>
      </ul>
    </div>

    <!-- <h3>Characters</h3>
    <ul>
      <li v-for="(char, i) in movie.characters" :key="`char_${i}`">
        <a :href="`/characters/${i}`"
          >Character {{ char.match(/\d/g).join('') }}</a
        >
      </li>
    </ul> -->
  </div>
</template>

<script>
import PlanetCard from '@/components/PlanetCard.vue'
import SpecieCard from '@/components/SpecieCard.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'movie-show',

  props: ['id'],

  data: () => ({
    isLoading: false
  }),

  components: {
    PlanetCard,
    SpecieCard
  },

  computed: {
    ...mapState(['movies', 'planets', 'species']),
    ...mapGetters([
      'getIDbyURL',
      'getMovieByID',
      'getAllPlanetsIDs',
      'getAllSpeciesIDs',
      'getPlanetsByIDs',
      'getSpeciesByIDs'
    ]),
    movie() {
      return this.getMovieByID(this.id)
    },

    currentMoviePlanets() {
      return this.planets.filter(planet =>
        // this.movie.planets
        // .map(url => this.getIDbyURL(url))
        // .includes(this.getIDbyURL(planet.url))
        this.movie.planets.includes(planet.url)
      )
    },
    currentMovieSpecies() {
      return this.species.filter(specie =>
        this.movie.species.includes(specie.url)
      )
    },

    currentMoviePlanetsIDs() {
      return this.movie.planets.map(url => Number(this.getIDbyURL(url)))
    },
    currentMovieSpeciesIDs() {
      return this.movie.species.map(url => Number(this.getIDbyURL(url)))
    },

    unpresentPlanetsIDs() {
      return this.currentMoviePlanetsIDs.filter(
        id => !this.getAllPlanetsIDs.includes(id)
      )
    },
    unpresentSpeciesIDs() {
      return this.currentMovieSpeciesIDs.filter(
        id => !this.getAllSpeciesIDs.includes(id)
      )
    }
  },

  async created() {
    if (this.movies.length === 0) {
      this.isLoading = !this.isLoading
      await this.$store.dispatch('getMovies')
      this.isLoading = !this.isLoading
    }
    // await ...
    this.$store.dispatch('getPlanets', this.unpresentPlanetsIDs)
    this.$store.dispatch('getSpecies', this.unpresentSpeciesIDs)
  }
}
</script>

<style lang="scss" scoped>
.description {
  border-top: 1px solid #aaaaaa;
}
h3 {
  border-top: 1px solid #aaaaaa;
  padding-top: 10px;
}
ul {
  margin: 0;
  // padding: 0;
  list-style: none;
}
ul > li {
  padding: 5px 0;
}
</style>
