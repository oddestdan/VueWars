<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'movie-list' }">List</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 5%;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  text-align: center;
}
p,
ul {
  padding-inline-start: 40px;
  padding-inline-end: 40px;
}
a {
  font-weight: bold;
  color: #2c3e50;
  &:active {
    color: #5adaa0;
  }
  &:hover {
    color: #42b983;
  }
}
</style>
