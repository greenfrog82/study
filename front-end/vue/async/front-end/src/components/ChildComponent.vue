<template>
  <div class="hello">
    <p>Reverse message : {{ _msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['msg'],
  computed: {
    _msg() {
      return '[TEST] ' + this.msg;
    }
  }
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
