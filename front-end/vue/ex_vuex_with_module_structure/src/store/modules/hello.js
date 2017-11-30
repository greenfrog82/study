const state = {
  name: '[module] hello'
};

const mutations = {
  name(state, name) {
    state.name = name;
  }
}

const getters = {
  getName(state, getters, rootState) {
    console.log('[moudle] hello.state', state);
    console.log('[module] hellow.getters', getters);
    console.log('[moudle] rootState', rootState);
  }
}

export default {
  state,
  getters,
  mutations
}
