<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
    <p style="text-align: center; color: var(--accent1); margin: 0;line-height: 0.5rem;font-size: 1rem;margin-bottom: 1rem;direction: ltr;">{{ Math.floor(remainTime/60) }} :  <span v-if="remainTime%60 <10">0</span>{{ remainTime%60 }}</p>
  </div>
</template>
<style scoped>
canvas {
  display: inline;
  margin: auto;
}
</style>


<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";

const props = defineProps({
  width: {
    type: Number,
    default: 60,
  },
  height: {
    type: Number,
    default: 60,
  },
  totalTime: {
    type: Number,
    default: 300, // total time in seconds
  },
  lineWidth: {
    type: Number,
    default: 7,
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
  source: {
    type: String,
    default: '/images/jerryFace.jpeg',
  },
});
const emits = defineEmits(['timeOver'])
const remainTime = ref(props.totalTime)
setInterval(()=>{remainTime.value-=1;if(remainTime.value==0){emits('timeOver')}},1000)

const canvas = ref();

const backgroundImage = new Image();
backgroundImage.src = props.source;

backgroundImage.onload = function () {
  drawArc(); // Call drawArc only after the image is loaded
};

const drawArc = () => {
  const canvasEl = canvas.value;
  if (!canvasEl) return;

  const ctx = canvasEl.getContext("2d");
  const centerX = canvasEl.width / 2;
  const centerY = canvasEl.height / 2;
  const radius = Math.min(centerX, centerY) - props.lineWidth;

  const startAngle = -Math.PI / 2; // Starting at the top
  const endAngle = startAngle + 2 * Math.PI * (remainTime.value / props.totalTime);

  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height); // Clear canvas

  // Draw background color
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

  // Draw the arc-shaped image
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
  ctx.lineTo(centerX, centerY);
  ctx.closePath();
  ctx.clip();

  // Draw the image within the clipped area
  ctx.drawImage(backgroundImage, centerX - radius, centerY - radius, radius * 2, radius * 2);

  ctx.restore();
};

onMounted(drawArc);
watchEffect(drawArc);
</script>
