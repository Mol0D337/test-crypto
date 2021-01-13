import { mixins } from 'vue-chartjs'
import VueChartJs from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: VueChartJs.Line,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
  }
}
