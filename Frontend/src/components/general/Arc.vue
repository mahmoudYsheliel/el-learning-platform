<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";

const props = defineProps({
  width: {
    type: Number,
    default: 75,
  },
  height: {
    type: Number,
    default: 75,
  },
  totalTime: {
    type: Number,
    default: 300, // total time in seconds
  },
  remainingTime: {
    type: Number,
    default: 280, // remaining time in seconds
  },
  lineWidth: {
    type: Number,
    default: 5,
  },
  strokeStyle: {
    type: String,
    default: "#01abff",
  },
  backgroundColor: {
    type: String,
    default: "#fff",
  },
  textColor: {
    type: String,
    default: "#01abff",
  },
  fontSize: {
    type: Number,
    default: 20,
  },
});

const canvas = ref(null);

const drawArc = () => {
  const canvasEl = canvas.value;
  if (!canvasEl) return;

  const ctx = canvasEl.getContext("2d");
  const centerX = canvasEl.width / 2;
  const centerY = canvasEl.height / 2;
  const radius = Math.min(centerX, centerY) - props.lineWidth;

  const startAngle = -Math.PI / 2; // Starting at the top
  const endAngle =
    startAngle + 2 * Math.PI * (props.remainingTime / props.totalTime);

  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height); // Clear canvas
  ctx.fillStyle = props.backgroundColor;
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

  // Draw the arc
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
  ctx.lineWidth = props.lineWidth;
  ctx.strokeStyle = props.strokeStyle;
  ctx.stroke();

  // Draw the remaining time text
  ctx.fillStyle = props.textColor;
  ctx.font = `${props.fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let leftTime = Math.floor(props.remainingTime / 60).toString();
  leftTime += ":";
  if (props.remainingTime % 60 < 10) {
    leftTime += "0";
  }

  leftTime += (props.remainingTime % 60).toString();
  ctx.fillText(leftTime, centerX, centerY);
};

onMounted(drawArc);
watchEffect(drawArc);
</script>

<style scoped>
canvas {
  display: inline;
  margin: auto;
}
</style>
