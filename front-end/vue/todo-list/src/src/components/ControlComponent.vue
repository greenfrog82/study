<template>
    <div>
        {{ activatedList.length }} item left
        <button @click='active'>Active</button>
        <button @click='completed'>Completed</button>
        <button @click='all'>ALL</button>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'Control',
    computed: {
        ...mapGetters(['activatedList', 'completedList']),
    },
    methods: {
        ...mapMutations(['active', 'completed', 'all'])
    }
}
</script>
<style>
</style>