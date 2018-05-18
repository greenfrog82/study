<template>
    <div>
      <input type="text" v-model="todo" placeholder="What needs to be done?" @keyup.enter="_newTodo"/>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Input',
  data: function() {
     return {
        todo: null,
        key: 2,
     } 
  },
  methods: {
    ...mapMutations(['newTodo']),
    _newTodo() {
      this.newTodo({key: this.key++, content: this.todo})
      this.todo = null
    },
  }
}
</script>
<style>
</style>