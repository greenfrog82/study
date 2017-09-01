import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import moduleHello from './modules/hello'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  name: 'gloabl'
};

export default new Vuex.Store({
  state,
  modules: {
    hello: moduleHello
  }
});

// export default new Vuex.Store({
//   actions,
//   getters,
//   modules: {
//     cart,
//     products
//   },
//   strict: debug,
//   plugins: debug ? [createLogger()] : []
// })
