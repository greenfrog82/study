<template>
  <div id="app">
    <!-- <qrcode :val="val" :size="size" :bg-color="bgColor" :fg-color="fgColor" level="L"></qrcode> -->
    <!-- <qrcode :val='val', :size='size'></qrcode> -->
    <qrcode-vue :value='value' :size='size' level='H'></qrcode-vue>
  </div>
</template>

<script>
// import Qrcode from 'vue-qrcode';
import QrcodeVue from 'qrcode.vue';
//
export default {
  components: {
    QrcodeVue
  },
  data() {
    return {
      value: 'otpauth://totp/aurora:1%40cdnetworks.com?secret=JBSWY3DPEHPK3PXP&issuer=aurora',
      size: 300
    }
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
