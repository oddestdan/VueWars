<template>
  <div>
    <h1>Movies Listing</h1>
    <router-link
      :to="{ name: 'movie-show', params: { moviename: 'Old Republic' } }"
      >Show Old Republic</router-link
    >
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
