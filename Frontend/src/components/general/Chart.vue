<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";

let max = 170;
let min = 30;
let xAxis = <any[]>[];
let yAxis = <any[]>[];
const chartData = ref();
const chartOptions = ref();
onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

for (let i = 0; i <= 50; i++) {
  let x = Math.round(min + ((max - min) / 50) * i);
  xAxis.push(x);
  let y = Math.pow(Math.E, -0.5 * (((x - 100) * (x - 100)) / 15 / 15));
  yAxis.push(y);

  xAxis.push(x);
  yAxis.push(y);
}

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: xAxis,
    datasets: [
      {
        label: "IQ",
        data: yAxis,
        fill: false,
        tension: 0.5,
        borderColor: documentStyle.getPropertyValue("--accent2"),
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text");
  const textColorSecondary = documentStyle.getPropertyValue("--text");
  const surfaceBorder = documentStyle.getPropertyValue("--text");

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
</script>

<template>
  <div class="card">
    <Chart
      type="line"
      :data="chartData"
      :options="chartOptions"
      style="width: 100%; aspect-ratio: 2/1; min-width: 30rem; min-height: 20rem;max-width: 40rem;margin-inline:auto ;"
    />
  </div>
</template>

<style scoped></style>
