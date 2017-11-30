// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'

Vue.config.productionTip = false;
Vue.use(VueI18n);

// Ready translated locale messages
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  jp: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})


// Create a Vue instanc with `i18n` option
// new Vue({ i18n }).$mount('#app');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  i18n
});
