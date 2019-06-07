<template>
  <router-link
    class="specie-link"
    :to="{ name: 'specie-show', params: { id } }"
  >
    <div class="specie-card">
      <a>
        {{ specie.name }} /
        <span>{{ specie.classification }}</span>
      </a>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'specie-card',

  props: {
    specie: Object,
    id: String
  }
}
</script>

<style lang="scss" scoped>
.specie-card {
  padding: 5px 0px;
  transition: all 0.2s linear;
  cursor: pointer;
}
a {
  width: 100%;
}
span {
  font-weight: 400;
}
</style>
