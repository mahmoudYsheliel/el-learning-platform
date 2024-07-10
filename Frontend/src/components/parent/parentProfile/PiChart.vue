<template>
  <div class="container" v-if="data">
    <canvas ref="donutChart" :width="width" :height="height"></canvas>
    <h3>
      <span>Completed</span>
      <span>{{ ratio }}%</span>
    </h3>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

interface PieSlice {
  value: number;
  color1: string;
  color2: string;
}

const props = defineProps<{
  data: PieSlice[];
  width: number;
  height: number;
  innerRadiusRatio: number; // Ratio of the inner radius to the outer radius (0 < ratio < 1)
}>();

const donutChart = ref<HTMLCanvasElement | null>(null);

const ratio = computed(() => {
  if (donutChart.value) {
    const ctx = donutChart.value.getContext("2d");
    if (ctx) {
      drawDonutChart(
        ctx,
        props.data,
        props.width,
        props.height,
        props.innerRadiusRatio
      );
    }
  }
  return Math.floor(
    (props.data[0]?.value / (props.data[0]?.value + props.data[1]?.value)) * 100
  );
});

function drawDonutChart(
  ctx: CanvasRenderingContext2D,
  data: PieSlice[],
  width: number,
  height: number,
  innerRadiusRatio: number
) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);
  let startAngle = 1.5 * Math.PI;
  const centerX = width / 2;
  const centerY = height / 2;
  const outerRadius = Math.min(width, height) / 2;
  const innerRadius = outerRadius * innerRadiusRatio;

  data.forEach((slice) => {
    const sliceAngle = (slice.value / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle);
    ctx.arc(
      centerX,
      centerY,
      innerRadius,
      startAngle + sliceAngle,
      startAngle,
      true
    );
    ctx.closePath();

    const grad = ctx.createLinearGradient(150, 0,0,150);
    grad.addColorStop(0, slice.color1);
    grad.addColorStop(1, slice.color2);

    // Fill rectangle with gradient
    ctx.fillStyle = grad;
    ctx.fill();

    startAngle += sliceAngle;
  });
}
</script>

<style scoped>
canvas {
  margin: 0;
  padding: 0;
}
.container {
  position: relative;
  width: fit-content;
  height: fit-content;
  margin: 0;
}
h3 {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  transform: translate(50%, 50%);
  top: 10%;
  right: 50%;
  color: black;
}
h3 > :first-of-type {
  margin: 0;
  padding: 0;
  line-height: 12px;
  font-size: 12px;
  color: var(--text);
}
h3 > :last-of-type {
  margin: 0;
  padding: 0;
  line-height: 25px;
  font-size: 25px;
  color: var(--accent1);
}
</style>
