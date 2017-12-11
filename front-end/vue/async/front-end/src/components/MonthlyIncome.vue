// // MonthlyIncome.vue
// import { Line } from 'vue-chartjs'

// export default {
//   extends: Line,
//   props: ['data', 'options'],
//   mounted () {
//     this.renderChart(this.data, this.options)
//   }
// }

<script>
// CommitChart.js
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['label'],
  watch: {
      label: function(newLabel) {          
          console.log('watch : ', newLabel);
          this.label = newLabel;


          // Overwriting base render method with actual data.
            this.renderChart({
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                    //   label: 'GitHub Commits',
                    label: this.label,
                    backgroundColor: '#f87979',
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                    }
                ]
            })
      }
  },
  
}
</script>
