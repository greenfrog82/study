<template>
  <div id="app">
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <!-- use the modal component, pass in the prop -->
    <!-- <modal v-if="showModal" @close="showModal = false"> -->
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <!-- <h3 slot="header">custom header</h3> -->
    <!-- </modal> -->
    <modal-template v-if="showModal" @close='showModal=false'>
      <h3 slot="header">custom header</h3>
    </modal-template>
  </div>
</template>

<script>
import ModalTemplate from './components/Modal.vue'

export default {
  components: {
    modalTemplate: ModalTemplate
  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>


<style>

</style>
