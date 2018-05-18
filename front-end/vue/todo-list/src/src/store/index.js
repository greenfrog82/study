import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function specificStateList(list, state) {
    let ret = []
    list.forEach(element => {
        if(state == element.done) {
            ret.push(element)
        }
    })

    console.log(ret)
    return ret
}

const ACTIVE = 0
const COMPLETED = 1
const ALL = 2

export default new Vuex.Store({
    state: {
        todoList: [
            {
                key: 1,
                done: false,
                content: 'Go'
            },
            {
                key: 2,
                done: false,
                content: 'Vue'
            }
        ],
        showOption: ALL
    },
    getters: {
        activatedList(state) {
            return specificStateList(state.todoList, false)
        },
        completedList(state) {
            return specificStateList(state.todoList, true)
        },
        getToDoList(state, getters) {
            switch(state.showOption) {
                case ACTIVE:
                    return getters.activatedList
                case COMPLETED:
                    return getters.completedList
                default:
                    return state.todoList
            }
        }
    },
    mutations: {
        newTodo(state, { key, content } ) {
            console.log(`${key} : ${content}`)
            state.todoList.push({
                key: key,
                done: false,
                content: content
            });
        },
        active(state) {
            state.showOption = ACTIVE
        },
        completed(state) {
            state.showOption = COMPLETED
        },
        all(state) {
            state.showOption = ALL
        }
    }
});