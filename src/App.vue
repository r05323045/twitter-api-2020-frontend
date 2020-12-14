<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  name: 'App'
}
</script>

<style lang="scss">
html, body {
  height: 100%;
  width: 100%;
}
#app {
  max-width: 1440px;
  height: 100%;
  margin: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
