<template>
  <div id="app">
    <main-comp></main-comp>
    <temp-component></temp-component>
  </div>
</template>

<script>
import mainComp from './components/mainComponent'
import tempComponent from './components/tempComponent'

export default {
  name: 'app',
  components: {
    mainComp,
		tempComponent
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
