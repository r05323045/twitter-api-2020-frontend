<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  name: 'App',
  created () {
    if (localStorage.getItem('store') ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', localStorage.setItem('state', JSON.stringify(this.$store.state)))
  }
}
</script>

<style lang="scss">
html, body {
  height: 100%;
  width: 100%;
}
#app {
  max-width: 1440px;
  max-height: 100vh;
  overflow-y: hidden;
  height: 100%;
  margin: auto;
  font-family: Noto Sans TC;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1C1C1C;
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
