<script setup lang="ts">
import { RouterView } from "vue-router";
import { useLang } from "./stores/token";
const lang = useLang()
</script>

<template>
  <div class="mainRouter" :class="{ rtl: lang.getLang == 'ar', ltr: lang.getLang == 'en' }">

    <RouterView />
  </div>
</template>

<style>
.rtl {
  direction: rtl;
}

.ltr {
  direction: ltr;
}

div[class*='rtl'] .imageflip {
  transform: scaleX(-1);
  right: 0;
}

div[class*='rtl'] .borderRigth {
  border: none;
  border-left: 0.25rem solid rgba(0, 0, 0, 0.2);
}

div[class*='rtl'] .flipDirection {
  direction: rtl;
}

div[class*='rtl'] .selectedSidebarItem {
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



::-webkit-scrollbar {
  width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #aaa;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #888;
}

body,
html {
  margin: 0;
  padding: 0;
}

body,
#app {
  font-family: 'Cairo'
}

:root {
  --primary: #ffffff;
  --secondary: #0089cc;
  --text: #848181;
  --descriptionText: #444;
  --header: #282938;
  --accent1: #01abff;
  --accent2: #7302ff;
  --accent3: #f4b904;
  --accent4: #FFC27A;
  --accent5: #D42488;
  --choiceBackgroundColor: #E8F7FF;
  --grayBackground: #F7F9FB;
  --wrongAnswer: #FF2D2D;
  --correctAnswer: #5CFA75;
  --accent1_100: #E8F7FF;
  --accent1_200: #D1F0FF;
  --accent1_300: #BAE8FF;

}

:root {
  font-size: 14px;
  /* Base for mobile */
}

@media (min-width: 600px) {
  :root {
    font-size: 18px;
  }
}

@media (min-width: 900px) {
  :root {
    font-size: 20px;
  }
}

@media (min-width: 1200px) {
  :root {
    font-size: 22px;
  }
}

@media (max-width:1250px) {
  div[class*='rtl'] .borderRigth {
    border: none;
  }
}

button {
  font-size: 0.75rem;
}
</style>
