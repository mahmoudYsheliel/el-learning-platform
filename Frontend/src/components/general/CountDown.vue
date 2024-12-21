<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
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
    default: 125,
  },
  height: {
    type: Number,
    default: 125,
  },
  totalTime: {
    type: Number,
    default: 300, // total time in seconds
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
  source: {
    type: String,
    default: '/images/jerryFace.jpeg',
  },
});
const emits = defineEmits(['timeOver'])
const remainTime = ref(props.totalTime)
setInterval(()=>{remainTime.value-=1;if(remainTime.value==0){emits('timeOver')}},1000)

const canvas = ref();

const drawArc = () => {
  const canvasEl = canvas.value;
  if (!canvasEl) return;

  const ctx = canvasEl.getContext("2d");
  const centerX = canvasEl.width / 2;
  const centerY = canvasEl.height / 2;
  const radius = Math.min(centerX, centerY) - props.lineWidth;

  const startAngle = -Math.PI / 2; // Starting at the top
  const endAngle =
    startAngle + 2 * Math.PI * (remainTime.value / props.totalTime);

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


  const backgroundImage = new Image();

  backgroundImage.src = props.source;
  
  
  backgroundImage.onload = function () {
    const centerX = props.width / 2;
    const centerY = props.height / 2;
    const radius = Math.sqrt((props.width)*(props.height) *2  )/3; // Radius of the arc

    // Draw the arc-shaped image
    ctx.save(); // Save the current canvas state
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    ctx.lineTo(centerX, centerY); // Close the arc
    ctx.closePath();
    ctx.clip();

    // Draw the image within the clipped area
    ctx.drawImage(backgroundImage, centerX - radius, centerY - radius, radius * 2, radius * 2);

    ctx.restore(); // Restore the canvas state

};

};

onMounted(drawArc);
watchEffect(drawArc);
</script>
