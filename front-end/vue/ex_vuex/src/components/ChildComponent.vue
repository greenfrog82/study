<template>
  <div class="hello">
    <div>
      <label for='username'>username</label>
      <input id='username' type='text' v-model='username' />
    </div>
    <div>
      <label for='password'>password</label>
      <input id='password' type='text' v-model='password' />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  computed: {
    username: {
      get() {
        return this.$store.state.username;
      },
      set(value) {
          // this.$store.commit('username', value);
          this.m_username(value);
      }
    },
    password: {
      get() {
        return this.$store.state.password;
      },
      set(value) {
        // this.$store.commit('password', value);
        this.m_password(value);
      }
    }
  },
  // methods: {
  //   ...mapMutations({
  //     m_username: 'username', // map `this.increment()` to `this.$store.commit('increment')`
  //
  //     // `mapMutations` also supports payloads:
  //     m_password: 'password' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
  //   })
  // }
  methods: mapMutations({
    m_username: 'username',
    m_password: 'password'
  })
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
