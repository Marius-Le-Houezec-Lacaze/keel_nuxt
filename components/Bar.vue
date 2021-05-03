<template>
  <div>
    <bar-chart
      class="w-28 h-full"
      :data="barChartData"
      :options="barChartOptions"
      :height="200"
    />
  </div>
</template>

<script>
export default {
  props: ["set", "title"],
  data() {
    return {
      barChartData: {
        datasets: [
          {
            label: "Prix total",
            data: this.set[0],
            backgroundColor: "#2563eb"
          },
          {
            label: "Revenu total",
            data: this.set[1],
            backgroundColor: "#34d399"
          }
        ]
      },
      barChartOptions: {
        title: {
          display: true,
          text: this.title,
          color: "red"
        },
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "#17BF62"
        },
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: { display: false, beginAtZero: true },
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    };
  }
};
</script>
