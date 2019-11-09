import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // var gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 750)
    // var gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 750)
    //
    // gradient2.addColorStop(0, 'rgba(0, 231, 255, 1)')
    // gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0)');
    // gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');
    //
    // gradient.addColorStop(0, 'rgba(255, 0,0, 1)')
    // gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    // gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    // this.chartData.datasets[0].backgroundColor = gradient
    // console.log({chartData: this.chartData});

    // var datacollection = {
    //   labels: ['January', 'February', 'March', 'April'],
    //   datasets: [
    //     {
    //       label: 'Data One',
    //       backgroundColor: 'transparent',
    //       borderColor: 'rgba(255, 0, 0, 0.75)',
    //       borderWidth: 1,
    //       data: this.chartData
    //     }, {
    //       label: 'Data Two',
    //       backgroundColor: 'transparent',
    //       borderColor: 'rgba(0, 231, 255, 1)',
    //       borderWidth: 1,
    //       data: [15, 55, 32, 10]
    //     }
    //   ]
    // }

    this.renderChart(this.chartData, this.options)
  }
}
