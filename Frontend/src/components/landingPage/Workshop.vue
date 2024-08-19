<script lang="ts" setup>
import Button from "primevue/button";
import { selectLang, translationModule } from "@/lib/Translate";
import { workshopsImages } from "@/lib/Modules";


import { ref } from "vue";


const showParagraph = ref(false)
function showWorkshop(){
  showParagraph.value=true
  setTimeout(()=>{showParagraph.value=false},5000)
}
</script>

<template>
  <main>
    <div class="container">
      <h1>{{ selectLang(translationModule.workshops) }}</h1>
      <h1>{{ selectLang(translationModule.companyName) }}</h1>
      <p>
        {{ selectLang(translationModule.workshopDescription) }}
      </p>
    </div>
    <div class="image-container">
      <div
        class="card"
        v-for="(element, i) in workshopsImages"
        :class="{ intermediate: i == 1 || i==4 }"
      >
        <h4>{{ selectLang(element.text) }}</h4>
        <img :src="element.image" alt="" />
      </div>
    </div>
    <div style="height: 2rem;">

      <p style="color: var(--wrongAnswer);" class="noWorkshops" v-if="showParagraph">{{ selectLang(translationModule.noWorkshop) }} </p>
    </div>
    <Button :label="selectLang(translationModule.bookWorkshop)" @click="showWorkshop"/>
  </main>
</template>

<style scoped>
main {
  padding: 5rem 10rem;
}
h1 {
  margin: 0;
  line-height: 3rem;
}
h1:first-of-type {
  color: var(--accent1);
}
h1:last-of-type {
  color: var(--accent2);
}
p {
  color: var(--text);
}
button {
  padding: 1rem 3rem;
}
image {
  height: fit-content;
}
.image-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
  padding-top: 1rem;
  margin-block: 2rem;
}
img {
  width: 100%;
  aspect-ratio: 2/1;
  border-radius: 1rem;
}
.card {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 3px 3px 5px 5px hsl(0deg 0% 0% / 0.46);
  min-width: 16rem;
}
.intermediate {
  transform: translate(0, -2rem);
  box-shadow: 5px 5px 10px 10px hsl(0deg 0% 0% / 0.35);
}
h4 {
  color: var(--accent3);
  text-align: center;
}
.card:hover {
  transition-duration: 0.25s;
  scale: 1.05;
  cursor: pointer;
}
.noWorkshops{
  animation-name: example;
  animation-duration: 2s;
}
@keyframes example {
  from {transform: translate(0,2rem) }
  to {transform: translate(0,0);}
}
@media screen and (max-width: 1400px) {
  main {
    padding-inline: 3rem;
  }
}
@media screen and (max-width: 800px) {
  .image-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 2rem;
    margin-block: 3rem;
  }
  .intermediate {
    transform: translate(0, -0);
    box-shadow: 3px 3px 5px 5px hsl(0deg 0% 0% / 0.35);
  }
}
</style>
