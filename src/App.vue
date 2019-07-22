<template>
  <div id="app">
<!--    <main-comp></main-comp>-->
    <box-component></box-component>
    <temp-component></temp-component>
  </div>
</template>

<script>
// import mainComp from './components/mainComponent'
import style from './styles/style.scss'
import tempComponent from './components/tempComponent'
import boxComponent from './components/boxComponent'

export default {
  name: 'app',
  components: {
		tempComponent,
		boxComponent
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
