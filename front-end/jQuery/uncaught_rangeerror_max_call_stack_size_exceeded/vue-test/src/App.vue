<template>
  <div id="app">
    <button @click=clear>Clear</button>
    <select>
      <option v-for="item in items" :value="item">{{ item }}</option>
    </select>
    <!-- <select>
      <optison
    </select>     -->

    
    
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'app',
  data() {
    return {
      items: []      
    }
  },
  methods: {
    clear() {      
      console.log('Click clear button');
      this.items = []
    }
  },
  computed: {
    // generatedItems() {
      // console.log('generatedItem');
      // for(var i=0; i<10; i++) {
      //   this.idx = i
      //   this.items.push(i);
      // }
      // return this.items;
    // }
  },
  created: function() {
    console.log('created');
    for(var i=0; i<80000; i++) {      
      this.items.push(i);
    }
  },
  mounted: function() {
    console.log('mounted');
  }
}
</script>

<style>

</style>
