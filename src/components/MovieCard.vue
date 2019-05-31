<template>
  <router-link
    class="movie-link"
    :to="{ name: 'movie-show', params: { id: movie.episode_id } }"
  >
    <div class="movie-card -shadow">
      <h2>This is {{ movie.title }}'s card</h2>
      <!-- <span class="eyebrow">@{{ movie.time }} on {{ movie.date }}</span> -->
      <!-- <h4 class="title">{{ movie.title }}</h4> -->
      <!-- <BaseIcon name="users">{{ movie.attendees.length }} attending</BaseIcon> -->
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    movie: Object
  }
}
</script>

<style scoped>
.movie-card {
  padding: 10px 30px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.movie-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.2);
}
.movie-card > .title {
  margin: 0;
}
.movie-link {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 100;
}
</style>
