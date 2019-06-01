<template>
  <div class="specie-show">
    <h1>Specie {{ specie.name }}</h1>
    <p>Language: {{ specie.language }}</p>
    <div class="main-info">
      <h4>Classification: {{ specie.classification }}</h4>
      <h4>Designation: {{ specie.designation }}</h4>
      <h4>Average lifespan: {{ specie.average_lifespan }}</h4>
      <h4>Average height: {{ specie.average_height }}</h4>
    </div>
  </div>
</template>

<script>
import MovieService from '@/services/MovieService.js'

export default {
  name: 'specie-show',

  props: ['id'],

  data() {
    return {
      specie: {}
    }
  },

  created() {
    MovieService.getSpecie(this.id)
      .then(response => {
        this.specie = response.data
        console.log(this.specie)
      })
      .catch(error => {
        console.log(
          'There was an error in SpecieShow API call: ',
          error.response
        )
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
