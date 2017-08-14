// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


new Vue({
  el: '#app',
  template: '<App />',
  components: { App }
})

// new Vue({
//   el: '#app',
//   template: '#greeter',
//   props: ['greenfrog']
// });

// Defining templates in a component

// Vue.component('greeter', {
//     template: '<div> Hello, {{ name }}!</div>',
//     props: ['name'],
// });

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: "<greeter name='greenfrog'/>"
//   // components: { App }
// })
