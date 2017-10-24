<template>
  <div id="app">
    <childComponent></childComponent>
    <input type='button' value='Click' @click='click'/>
    <input type='button' value='Action' @click='change'  />
  </div>
</template>

<script>
import ChildComponent from './components/ChildComponent'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    childComponent: ChildComponent
  },
  //computed: {
    // The following codes are verbose and repetitive.
    // username() {
    //   console.log('This is computed username property in App component.');
    //   return this.$store.state.username;
    // },
    // password() {
    //   console.log('This is computed password property in App component.');
    //   return this.$store.state.password;
    // }

  //},
  // So, The following codes are used usually intead of the above codes.
  // Use Case 1.
  // computed: mapState({
  //   username: state => state.username,
  //   password: state => state.password
  // }),
  // Use Case 2.
  // computed: mapState(['username', 'password']),
  // Use Case 3.
  // computed: mapState({
  //   username: 'username',
  //   password: 'password',
  // }),
  // computed: mapState(['username', 'password'])
    // combine() {
    //   // return `${this.username}:${this.password}`;
    //   return 'test';
    // },
  // Use Case 3.
  computed: {
    ...mapGetters(['combine']),
    ...mapState(['username', 'password'])
  },
  methods: {
    click() {
      console.log(this.combine);
    },
    ...mapActions(['change'])
  },
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
