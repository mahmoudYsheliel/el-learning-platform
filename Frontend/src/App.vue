<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
body::-webkit-scrollbar {
  display: none;
}
body {
  -ms-overflow-style: none;
}
body {
  -ms-overflow-style: none;
}

body,
html {
  margin: 0;
  padding: 0;
}
body,
#app {
  width: 100vw;
  height: 100vh;
  font-family:'Baloo Tammudu 2'
}
:root {
  --primary: #ffffff;
  --secondary: #0089cc;
  --text: #848181;
  --header: #282828;
  --accent1: #01abff;
  --accent2: #7302ff;
  --accent3: #f4b904;
  --accent4:#FFC27A;
  --choiceBackgroundColor:#E8F7FF;
  --wrongAnswer:#FF2D2D;
  --correctAnswer:#5CFA75;

  font-size: calc(11px + 100vw * 0.0035);
}

</style>
