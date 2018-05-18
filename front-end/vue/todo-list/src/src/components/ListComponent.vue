<template>
    <div>
        <div v-for="todo in getToDoList">
            <input v-model="todo.done" type="checkbox">{{ todo.content }}</input>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'List',
    computed: {
        ...mapGetters(['getToDoList'])
    },
}
</script>
<style>
</style>