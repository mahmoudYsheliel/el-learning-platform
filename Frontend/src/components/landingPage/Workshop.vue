<script lang="ts" setup>
import Button from "primevue/button";
import { selectLang, translationModule } from "@/lib/Translate";
import { workshopsImages } from "@/lib/Modules";

import Carousel from "primevue/carousel";
import { ref } from "vue";

const showParagraph = ref(false);
function showWorkshop() {
  showParagraph.value = true;
  setTimeout(() => {
    showParagraph.value = false;
  }, 5000);
}
const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
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
    <Carousel
  
      style="direction: ltr"
      :value="workshopsImages"
      :numVisible="3"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      circular 
    :autoplayInterval="3000"
    >
      <template #item="slotProps">
        <div class="card">
          <h4>{{ selectLang(slotProps?.data?.text) }}</h4>
          <img :src="slotProps?.data?.image" alt="" />
        </div>
      </template>
    </Carousel>
   
    <Button
      :label="selectLang(translationModule.bookWorkshop)"
      @click="showWorkshop"
    />
    <div>
      <p
        style="color: var(--wrongAnswer)"
        class="noWorkshops"
        v-if="showParagraph"
      >
        {{ selectLang(translationModule.noWorkshop) }}
      </p>
    </div>
  </main>
</template>

<style scoped>
main {
  margin-block: 4rem;
  width: 90%;
  margin-inline: auto;
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
img {
  width: 90%;
  margin-inline: auto;
  aspect-ratio: 1.6/1;
  border-radius: 0.5rem;
  object-fit:cover;
}
.card {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 1rem;

  width: 90%;
  margin: 1rem;
  height: 90%;
}
.intermediate {
  transform: translate(0, -2rem);
  box-shadow: 5px 5px 10px 10px hsl(0deg 0% 0% / 0.35);
}
h4 {
  color: var(--secondary);
  text-align: center;
}
.card:hover {
  transition-duration: 0.25s;
  scale: 1.05;
  cursor: pointer;
}
.noWorkshops {
  animation-name: example;
  animation-duration: 2s;
}
@keyframes example {
  from {
    transform: translate(0, 2rem);
  }
  to {
    transform: translate(0, 0);
  }
}


</style>
