<script setup lang="ts">
import { RouterView } from "vue-router";
import { useLang } from "./stores/token";
const lang = useLang()
</script>

<template>
  <div  class="mainRouter" :class="{rtl:lang.getLang=='ar',ltr:lang.getLang=='en'}">
    
  <RouterView/>
  </div>
</template>

<style>
.rtl{
  direction: rtl;
}
.ltr{
  direction: ltr;
}
div[class*='rtl'] .imageflip{
  transform: scaleX(-1);
  right:0;
}
div[class*='rtl'] .borderRigth{
  border: none;
  border-left: 0.25rem solid rgba(0, 0, 0, 0.2);
}
div[class*='rtl'] .flipDirection{
  direction: rtl;
}
div[class*='rtl'] .selectedSidebarItem{
  background-color: var(--primary);
  border-top-right-radius: 0rem;
  border-bottom-right-radius: 0rem;
  border-top-left-radius: 3rem;
  border-bottom-left-radius: 3rem;
  color: var(--accent1);
}

div[class*='rtl'] .circle {
  width: 2rem;
  height: 2rem;
  background-color: var(--primary);
  z-index: 2;
  display: block;
  position: absolute;
  top: 1rem;
  right: calc(100% - 0.5rem);
  border-radius: 100%;
  cursor: pointer;
  transform: scaleX(-1);
}

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

  font-size: calc(16px + 100vw * 0.002);
  font-size: calc(14px + 100vw * 0.005);
}
button{
  font-size: 0.8rem;
}
</style>
