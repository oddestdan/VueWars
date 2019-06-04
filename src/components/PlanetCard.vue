<template>
  <router-link
    class="planet-link"
    :to="{ name: 'planet-show', params: { id } }"
  >
    <div class="planet-card">
      <a>{{ planet.name }}</a>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'planet-card',

  props: {
    planet: Object,
    id: String
  }
}
</script>

<style lang="scss" scoped>
.planet-card {
  padding: 5px 0px;
  transition: all 0.2s linear;
  cursor: pointer;
}
a {
  width: 100%;
}
</style>
