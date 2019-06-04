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
          v-for="(planet, i) in planets"
          :planet="planet.data"
          :id="planet.id"
          :key="`planet_${i}`"
        />
      </li>
    </ul>

    <!-- TODO: fix species index sent for api call -->
    <h3>Species</h3>
    <ul>
      <li>
        <SpecieCard
          v-for="(specie, i) in species"
          :specie="specie.data"
          :id="specie.id"
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
import MovieService from '@/services/MovieService.js'

// function pushFromAxios(arr, resp) {
//   arr.push({ id: resp.data.url.match(/\d/g).join(''), data: resp.data })
// }

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
      planets: [],
      species: []
    }
  },

  created() {
    MovieService.getMovie(this.id)
      .then(response => {
        this.movie = response.data
        // console.log('>Getting a movie id #' + response.data.episode_id)
        console.log(`>Getting #${this.movie.episode_id}: ${this.movie.title}`)
        console.log(this.movie)

        // arrange a planets call after movie call
        this.movie.planets.forEach(planet => {
          MovieService.getPlain(planet)
            .then(response => {
              let id = response.data.url.match(/\d/g).join('')
              this.planets.push({
                id: id,
                data: response.data
              })
            })
            // .then(pushFromAxios(this.planets, response))
            .catch(error => {
              console.log(
                'There was an error in MovieShow Planet API call: ',
                error
              )
            })
        })

        // arrange a species call after movie call
        this.movie.species.forEach(specie => {
          MovieService.getPlain(specie)
            .then(response => {
              let id = response.data.url.match(/\d/g).join('')
              this.species.push({
                id: id,
                data: response.data
              })
            })
            .catch(error => {
              console.log(
                'There was an error in MovieShow Species API call: ',
                error
              )
            })
        })
      })
      .catch(error => {
        console.log('There was an error in MovieShow Movie API call: ', error)
      })
  },

  methods: {
    getPlanetsFromThis() {
      this.movie.planets.forEach(planetURL => {
        MovieService.getPlainPlanet(planetURL)
          .then(response => {
            this.planets.push(response.data)
            console.log('  Pushing planet...')
            console.log(response.data)
          })
          .catch(error => {
            console.log(
              'There was an error in gettingPlainPlanets: ',
              error.response
            )
          })
      })
    }
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
