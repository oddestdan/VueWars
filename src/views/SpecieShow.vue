<template>
  <div class="specie-show" v-if="!isLoading">
    <h1>Specie {{ specie.name }}</h1>
    <p>Language: {{ specie.language }}</p>
    <div class="main-info">
      <h4>
        Classification: <span>{{ specie.classification }}</span>
      </h4>
      <h4>
        Designation: <span>{{ specie.designation }}</span>
      </h4>
      <h4>
        Average lifespan: <span>{{ specie.average_lifespan }}</span>
      </h4>
      <h4>
        Average height: <span>{{ specie.average_height }}</span>
      </h4>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'specie-show',

  props: ['id'],

  data: () => ({
    isLoading: false
  }),

  computed: {
    ...mapState(['species']),
    ...mapGetters(['getSpecieByID', 'getAllSpeciesByIDs']),
    specie() {
      return this.getSpecieByID(this.id)
    }
  },

  async created() {
    if (this.specie === undefined) {
      this.isLoading = !this.isLoading
      await this.$store.dispatch('getSpecies', [this.id])
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
