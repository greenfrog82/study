<template>
  <div id='app'>
    <img src="./assets/logo.png">
    <span>{{ username }}</span>
    <Hello></Hello>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  props: ['username'],
  name: 'app',
  components: {
    Hello
  },
  // data() {
  //   return {
  //     message: 'test'
  //   }
  // }
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
