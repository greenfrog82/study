<template>
  <div id="app">
    <label for="locale">locale</label>
    <select v-model="locale">
      <option>en</option>
      <option>jp</option>
    </select>
    <p>message: {{ $t('message.hello') }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: 'en'
    }
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  },
  created() {
    // console.log(this.$i18n.locale);
    this.$i18n.locale = 'jp';
  }
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
