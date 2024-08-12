<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
const props = defineProps(["traitsDistribution", "title"]);
onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: props.traitsDistribution?.titles,
    datasets: [
      {
        data: props.traitsDistribution?.scores,
        backgroundColor: [
          documentStyle.getPropertyValue("--accent1"),
          documentStyle.getPropertyValue("--accent2"),
          documentStyle.getPropertyValue("--accent3"),
        ],
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text");

  return {
    plugins: {
      legend: {
        labels: {
          cutout: "10%",
          color: textColor,
        },
      },
    },
  };
};
</script>

<template>
  <div class="card flex justify-content-center">
    <Chart
      type="doughnut"
      :data="chartData"
      :options="chartOptions"
      class="chart"
      :pt="{
        canvas: {
          style:
            'width: 100%;',
        },
      }"
    />
  </div>
</template>

<style scoped>
.chart {
  width: 100%;
}
</style>
