<template>
  <router-link class="movie-link" :to="{ name: 'movie-show', params: { id } }">
    <div class="movie-card -shadow">
      <span class="movie-release-date">
        {{ movie.release_date.substring(0, movie.release_date.indexOf('-')) }}
      </span>
      <h2>{{ movie.title }}</h2>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'movie-card',

  props: {
    movie: Object,
    id: String
  }
}
</script>

<style lang="scss" scoped>
.movie-card {
  padding: 15px 30px;
  margin-top: 15px;
  transition: all 0.2s linear;
  cursor: pointer;
  &:hover {
    background-color: #af91742d;
    color: #42b983;
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.2);
  }
  &.title {
    margin: 0;
  }
}
.movie-link {
  color: #e2d1c0;
  text-decoration: none;
  font-weight: 100;
}
.movie-release-date {
  padding-inline-start: 15px;
}
h2 {
  margin-block-start: 5px;
  margin-block-end: 0px;
}
</style>
