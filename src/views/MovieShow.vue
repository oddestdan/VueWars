<template>
  <div class="movie-show">
    <h1>Episode #{{ movie.episode_id }} - {{ movie.title }}</h1>
    <div class="main-info">
      <h4>Director: {{ movie.director }}</h4>
      <h4>Produced by: {{ movie.producer }}</h4>
      <h4>Release date: {{ movie.release_date }}</h4>
    </div>
    <div class="description">
      <p>{{ movie.opening_crawl }}</p>
    </div>

    <h3>Planets</h3>
    <ul>
      <li>
        <PlanetCard
          v-for="(planet, i) in localPlanets"
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
          v-for="(specie, i) in localSpecies"
          :specie="specie"
          :id="getIDbyURL(specie.url)"
          :key="`specie_${i}`"
        />
      </li>
    </ul>

    <h3>Characters</h3>
    <ul>
      <li v-for="(char, i) in movie.characters" :key="`char_${i}`">
        <a :href="`/characters/${i}`"
          >Character {{ char.match(/\d/g).join('') }}</a
        >
      </li>
    </ul>

    <h3>Starships</h3>
    <ul>
      <li v-for="(ship, i) in movie.starships" :key="`ship_${i}`">
        <a :href="`/starships/${i}`"
          >Starship {{ ship.match(/\d/g).join('') }}</a
        >
      </li>
    </ul>

    <h3>Vehicles</h3>
    <ul>
      <li v-for="(vehicle, i) in movie.vehicles" :key="`vehicle_${i}`">
        <a :href="`/vehicles/${i}`"
          >Vehicle {{ vehicle.match(/\d/g).join('') }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import PlanetCard from '@/components/PlanetCard.vue'
import SpecieCard from '@/components/SpecieCard.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'movie-show',

  props: ['id'],

  components: {
    PlanetCard,
    SpecieCard
  },

  data() {
    return {
      movie: {},
      localPlanets: [],
      localSpecies: []
      // movie: this.movies.getMovieByID(this.movie.url)
    }
  },

  computed: {
    ...mapState(['movies', 'planets', 'species']),
    ...mapGetters([
      'getIDbyURL',
      'getMovieByID',
      'getAllPlanetIDs',
      'getAllSpecieIDs',
      'getPlanetsByIDs',
      'getSpeciesByIDs'
    ])
  },

  async created() {
    if (this.movies.length === 0) this.$store.dispatch('getMovies')

    this.movie = this.getMovieByID(this.id)
    console.log(this.movie)

    let planetsIDs = this.movie.planets.map(url => this.getIDbyURL(url))
    let speciesIDs = this.movie.species.map(url => this.getIDbyURL(url))

    console.log(planetsIDs)
    planetsIDs = planetsIDs.filter(
      id => !this.getAllPlanetIDs.includes(Number(id))
    )
    console.log(planetsIDs)

    console.log(speciesIDs)
    speciesIDs = speciesIDs.filter(
      id => !this.getAllSpecieIDs.includes(Number(id))
    )
    console.log(speciesIDs)

    if (planetsIDs.length !== 0) this.$store.dispatch('getPlanets', planetsIDs)
    if (speciesIDs.length !== 0) this.$store.dispatch('getSpecies', speciesIDs)

    // AT THIS POINT PLANETS/SPECIES IN STORE ARE NOT YET UPDATED

    planetsIDs = this.movie.planets.map(url => this.getIDbyURL(url))
    speciesIDs = this.movie.species.map(url => this.getIDbyURL(url))

    this.localPlanets =
      this.planets.length !== 0
        ? [...this.getPlanetsByIDs(planetsIDs)]
        : this.planets
    console.log(this.localPlanets)

    this.localSpecies =
      this.species.length !== 0
        ? [...this.getSpeciesByIDs(speciesIDs)]
        : this.species
    console.log(this.localSpecies)
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
