import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export class Todo {
    constructor(content) {
        this.state = true; // boolean, in case of ture, This todo is active. Or not this todo is completed.
        this.content = content
    }
}

export default new Vuex.Store({
    state: {
        todo: null,
        todoList: []
    },
});



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
    username(state, value) {
        console.log('This is username mutation in store. value paramter is', value);
        state.username = value;
    },
    password(state, value) {
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