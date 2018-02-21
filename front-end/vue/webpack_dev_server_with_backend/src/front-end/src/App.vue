<template>
  <div id="app">
    <div>
      GET / : {{ name }} <button @click='getHome'>GET /</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      name: 'greenfrog'
    }
  },
  methods: {
    getHome: function() {
      // axios.get('/api/version')
      axios.get('/api/hello')
      .then(res => {
        console.log('---------- response');
        console.log(res.status);
        console.log(res.data);

        this.name = res.data

      }).catch(ex => {
        console.log('------- catch');
        console.error(ex.toString());
      });
    }
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
