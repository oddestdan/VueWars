<template>
  <div class="planet-show">
    <h1>Planet {{ planet.name }}</h1>
    <p>Population: {{ planet.population }}</p>
    <div class="main-info">
      <h4>Climate: {{ planet.climate }}</h4>
      <h4>Gravity: {{ planet.gravity }}</h4>
      <h4>Terrain: {{ planet.terrain }}</h4>
      <h4>Rotation period: {{ planet.rotation_period }}</h4>
      <h4>Orbital period: {{ planet.orbital_period }}</h4>
    </div>

    <h3>Residents</h3>
    <ul>
      <li v-for="(resident, i) in planet.residents" :key="`resident_${i}`">
        <a :href="`/residents/${i}`">
          Resident {{ resident.match(/\d/g).join('') }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import MovieService from '@/services/MovieService.js'

export default {
  name: 'planet-show',

  props: ['id'],

  data() {
    return {
      planet: {}
    }
  },

  created() {
    MovieService.getPlanet(this.id)
      .then(response => {
        this.planet = response.data
      })
      .catch(error => {
        console.log('There was an error in PlanetShow API call: ', error)
      })
  }
}
</script>

<style lang="scss" scoped>
.main-info {
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
