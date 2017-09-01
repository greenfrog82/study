<template>
  <div class="hello">
    <div>
      {{ name }}
      {{ getName }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'hello',
  computed: {
    ...mapState(['name']),
    ...mapGetters(['getName'])
  },
  created() {
    // this.name('iajdfkajdklfjakdjf');
  }
  // computed: {
  //   name() {
  //     console.log('this.$store.modules', this.$store.state.hello.name);
  //     return 'test'
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
