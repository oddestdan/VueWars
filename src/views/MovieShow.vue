<template>
  <div>
    <h1>Episode #{{ movie.episode_id }} - {{ movie.title }}</h1>
    <div class="main-info">
      <h4>Director: {{ movie.director }}</h4>
      <h4>Produced by: {{ movie.producer }}</h4>
      <h4>Release date: {{ movie.release_date }}</h4>
    </div>
    <div class="description">
      <p>{{ movie.opening_crawl }}</p>
    </div>

    <h3>Characters</h3>
    <ul>
      <li v-for="(char, i) in movie.characters" :key="`char_${i}`">
        <a :href="`/characters/${i}`">
          Character {{ char.match(/\d/g).join('') }}
        </a>
      </li>
    </ul>

    <h3>Starships</h3>
    <ul>
      <li v-for="(ship, i) in movie.starships" :key="`ship_${i}`">
        <a :href="`/starships/${i}`">
          Starship {{ ship.match(/\d/g).join('') }}
        </a>
      </li>
    </ul>

    <h3>Vehicles</h3>
    <ul>
      <li v-for="(vehicle, i) in movie.vehicles" :key="`vehicle_${i}`">
        <a :href="`/vehicles/${i}`">
          Vehicles {{ vehicle.match(/\d/g).join('') }}
        </a>
      </li>
    </ul>

    <h3>Planets</h3>
    <ul>
      <li v-for="(planet, i) in movie.planets" :key="`planet_${i}`">
        <a :href="`/planets/${i}`">
          Planets {{ planet.match(/\d/g).join('') }}
        </a>
      </li>
    </ul>

    <h3>Species</h3>
    <ul>
      <li v-for="(specie, i) in movie.species" :key="`specie_${i}`">
        <a :href="`/species/${i}`">
          Species {{ specie.match(/\d/g).join('') }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import MovieService from '@/services/MovieService.js'

// function extractID(char) {
//   return char.match(/\d/g).join('')
// }

export default {
  props: ['id'],

  data() {
    return {
      movie: {}
    }
  },

  created() {
    MovieService.getMovie(this.id)
      .then(response => {
        this.movie = response.data
        console.log(this.movie)
      })
      .catch(error => {
        console.log(
          'There was an error in MovieShow API call: ',
          error.response
        )
      })
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
