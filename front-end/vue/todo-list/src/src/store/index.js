import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// export class Todo {
//     constructor(key, content) {
//         this.key = key
//         this.done = false         
//         this.content = content
//     }
// }

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
        ]
    },
    getters: {
        activatedList(state) {
            return specificStateList(state.todoList, false)
        },
        completedList(state) {
            return specificStateList(state.todoList, true)
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
    }
});