<template>
  <div id="app">
    <InputComponent />
    <ListComponent />
    <ControlComponent />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import InputComponent from './components/InputComponent'
import ListComponent from './components/ListComponent'
import ControlComponent from './components/ControlComponent'

export default {
  name: 'App',
  components: {
    InputComponent,
    ListComponent,
    ControlComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
