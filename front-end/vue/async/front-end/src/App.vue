<template>
  <div id="app">
    <p>Message : {{ message }}</p>
    <p>Reverse message : {{ reverseMessage }} </p>
    <!-- <child-component :msg="reverseMessage"></child-component> -->
    <monthly-income :label="reverseMessage"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import axios from 'axios'
import ChildComponent from './components/ChildComponent'
import MonthlyIncome from './components/MonthlyIncome'

export default { 
  name: 'app',
  components: {
    HelloWorld,
    ChildComponent,
    MonthlyIncome
  },
  data() {
    return {
      message: 'TEST'
      
      // reverseMessage: ''
    }
  },
  // watch: {
  //   // whenever question changes, this function will run
  //   message: function (newQuestion) {
      
  //     this.reverseMessage = this.message.split('').reverse().join('');      
  //     console.log('watch', this.reverseMessage);
  //   }
  // },
  computed: {
    // a computed getter
    reverseMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('');
    }
  },
  mounted() {
    setTimeout(() => {     
      this.message = 'Hello';
      console.log(this.message);
    }, 3000);
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
