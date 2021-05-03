import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ["chartData"],
  props: ["margin"],
  data() {
    return {
      options: {
        title: {
          display: true,
          text: this.margin,
          position: 'bottom',
       },
        legend: {
          display: false
        },
        responsive: true
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};