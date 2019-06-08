<template>
  <div id="app" :style="{ backgroundImage: `url('${background}')` }">
    <div id="nav">
      <div class="router-link-wrapper">
        <router-link :to="{ name: 'movie-list' }">Movie List</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import background from '@/assets/background2.png'
export default {
  data: () => ({
    background
  })
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 5% 40px 5%;
  color: #e2d1c0; /* 2c3e50 */
  background-image: url(./assets/background2.png);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}
#nav {
  padding: 30px;
  justify-content: center;
  display: flex;
}
.bg-image {
  position: absolute;
  height: 100%;
  width: 100%;
}
.router-link-wrapper {
  padding: 0 10px;
  transition: all 0.3s linear;
  border-bottom: 2px solid transparent;
  a {
    font-size: 18px;
    color: #f7eee5;
    transition: all 0.2s linear;
    text-decoration: none;
  }
  &:hover {
    a {
      color: #6ecfa4;
    }
    border-bottom: 2px solid #6ecfa4;
  }
}
p,
ul {
  padding-inline-start: 40px;
  padding-inline-end: 40px;
}
a {
  font-weight: bold;
  color: #e2d1c0;
  transition: all 0.1s linear;
  &:active {
    color: #5adaa0;
  }
  &:hover {
    color: #42b983;
  }
}
</style>
