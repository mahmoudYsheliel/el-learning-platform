<script setup lang="ts">
import Chart from 'primevue/chart';
import { ref,onMounted } from "vue";

const  props = defineProps(['traitsDistribution','title'])

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
        labels: props.traitsDistribution?.titles,
        datasets: [
            {
                label: props.title,
                data: props.traitsDistribution?.scores,
                backgroundColor: [documentStyle.getPropertyValue('--accent1'),documentStyle.getPropertyValue('--accent2'),documentStyle.getPropertyValue('--accent3'),documentStyle.getPropertyValue('--accent4'),documentStyle.getPropertyValue('--secondary'),documentStyle.getPropertyValue('--accent1'),documentStyle.getPropertyValue('--accent2')],
               
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--header');
    const textColorSecondary = documentStyle.getPropertyValue('--header');
    const surfaceBorder = documentStyle.getPropertyValue('--choiceBackgroundColor');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

</script>

<template>
 <div class="card">
        <Chart type="bar" :data="chartData" :options="chartOptions" 
        style="width: 40rem;aspect-ratio: 1.5/1; margin-inline: auto;"
        class="chart"
        :pt="{
        canvas: {
          style:
            'width: 100%;',
        },
      }"/>
    </div>

</template>


<style scoped>
@media print{
    .chart{
        
        width: 50rem !important;
        aspect-ratio: 1.68/1; 
        margin-inline: auto;
    }
}
</style>
