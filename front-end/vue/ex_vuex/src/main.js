// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: null,
    password: null
  },
  getters: {
    combine(state) {
      return `${state.username}:${state.password}`;
    }
  },
  mutations: {
    username (state, value) {
      console.log('This is username mutation in store. value paramter is', value);
      state.username = value;
    },
    password (state, value) {
      console.log('This is password mutation in store. value paramter is', value);
      state.password = value;
    }
  },
  actions: {
    change({ commit }) {
      new Promise((resolve, reject) => {
        commit('username', 'greenfrog');
        commit('password', '123');
        resolve();
      }).then(() => {
        console.log('finish');
      });
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})
