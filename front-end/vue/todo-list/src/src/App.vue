<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <HelloWorld/> -->
    <div>
      <input type="text" v-model="todo" placeholder="What needs to be done?" @keyup.enter="_newTodo"/>
    </div>
    <div v-for="todo in _todoList">
        <input v-model="todo.done" type="checkbox"> {{ todo.content }}
    </div>
    <div>
      <!-- {{ activedList.length }} item left -->
      <button @click='active'>Active</button>
      <button @click='completed'>Completed</button>
      <button @click='all'>ALL</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

// import HelloWorld from './components/HelloWorld'

const ACTIVE = 0
const COMPLETED = 1
const ALL = 2

export default {
  name: 'App',
  data: function() {
    return {
      todo: null,
      show_option: ALL, 
      key: 2
    }
  },
  computed: {
    ...mapState(['todoList']),
    ...mapGetters(['activatedList', 'completedList']),
    _todoList() {
      switch(this.show_option) {
        case ACTIVE:
          return this.activatedList
        case COMPLETED:
          return this.completedList
        default:
          return this.todoList
      }
    }    
  },
  methods: {
    ...mapMutations(['newTodo']),
    _newTodo() {
      this.newTodo({key: this.key++, content: this.todo})
      this.todo = null
    },
    active() {
      this.show_option = ACTIVE
      console.log(this.show_option)
    },
    completed() {
      this.show_option = COMPLETED
      console.log(this.show_option)
    },
    all() {
      this.show_option = ALL
      console.log(this.show_option)

    }
  }
  // components: {
  //   HelloWorld
  // }
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
