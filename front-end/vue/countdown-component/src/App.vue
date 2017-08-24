<template>
  <div id="app">
    {{countdown}}
  </div>
</template>

<script>
import moment from 'moment';
// import countdown from 'countdown';
// import momentCountdown from 'moment-countdown';

export default {
  name: 'app',
  components: {

  },
  data() {
    return {
      // countdown: mement("3000").countdown().toString()
      countdown: null
    }
  },
  created() {
    // const _countdown = moment("3000").countdown().toString();
    // console.log(_countdown);

    console.log(moment.duration(300000));
    console.log(moment.duration('23:59:59'));

    let duration = moment.duration(300000);
    console.log(duration.get('minutes'));
    console.log(`${duration.get('minutes')}:${duration.get('seconds')}`);

    this.countdown = `${duration.get('minutes')}:${duration.get('seconds')}`;

    let timeout = 300000;
    setInterval(() => {
      timeout -= 1000;
      duration = moment.duration(timeout);
      this.countdown = `${duration.get('minutes')}:${duration.get('seconds')}`;
    }, 1000);
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
