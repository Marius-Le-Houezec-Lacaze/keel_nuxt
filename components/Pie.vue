<template>
  <ChartDoughnutBase class="w-48" :chart-data="chartData" 
    />
</template>

<script>
export default {

  data() {
    return {
      chartData: null,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: ["Marge net", "Prix net"],
        options: [
          {
            legend: {
              display: false,
            },
          },
        ],

        datasets: [
          {
            data: this.data,
            backgroundColor: ["#FF6384", "#36A2EB"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      };
    },
  },
};
</script>

