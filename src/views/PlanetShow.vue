<template>
  <div class="planet-show" v-if="!isLoading">
    <h1>Planet {{ planet.name }}</h1>
    <p>Population: {{ planet.population }}</p>
    <div class="main-info">
      <h4>
        Climate: <span>{{ planet.climate }}</span>
      </h4>
      <h4>
        Gravity: <span>{{ planet.gravity }}</span>
      </h4>
      <h4>
        Terrain: <span>{{ planet.terrain }}</span>
      </h4>
      <h4>
        Rotation period: <span>{{ planet.rotation_period }}</span>
      </h4>
      <h4>
        Orbital period: <span>{{ planet.orbital_period }}</span>
      </h4>
    </div>
    <!-- <h3>Residents</h3>
    <ul>
      <li v-for="(resident, i) in planet.residents" :key="`resident_${i}`">
        <a :href="`/residents/${i}`">
          Resident {{ resident.match(/\d/g).join('') }}
        </a>
      </li>
    </ul> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'planet-show',

  props: ['id'],

  data: () => ({
    isLoading: false
  }),

  computed: {
    ...mapState(['planets']),
    ...mapGetters(['getPlanetByID', 'getAllPlanetsByIDs']),
    planet() {
      return this.getPlanetByID(this.id)
    }
  },

  async created() {
    if (this.planet === undefined) {
      this.isLoading = !this.isLoading
      await this.$store.dispatch('getPlanets', [this.id])
      this.isLoading = !this.isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
.main-info {
  border-top: 1px solid #aaaaaa;
}
span {
  font-weight: 400;
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
