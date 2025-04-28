<script lang="ts" setup>
import "primeicons/primeicons.css";
import { selectLang, translationModule } from "@/lib/Translate";
import { achievments } from "@/lib/Modules";

import Carousel from "primevue/carousel";

import { ref } from "vue";
const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 1,
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
      <h1 style="color: var(--accent2)">
        {{ selectLang(translationModule.achievements) }}
      </h1>
      <!-- <h3 style="color: var(--text)">
        {{ selectLang(translationModule.achDescription) }}
      </h3> -->
      <div class="wrapper">
        <Carousel 
        style="direction: ltr;"
          :value="achievments"
          
          :responsiveOptions="responsiveOptions" circular 
    :autoplayInterval="3000"
        >
          <template #item="slotProps">
            <div class="achievment flipDirection" >
              <div class="left">
                <h3 style="color: var(--secondary)">
                  {{ selectLang(slotProps.data.header) }}
                </h3>
                <p style="padding-inline: 1rem">
                  {{ selectLang(slotProps.data.text) }}
                </p>
              </div>

              <img :src="slotProps.data.image" alt="" />
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding-block: 4rem ;
}
.container{
  width: 90%;
  margin-inline: auto;
}
h1 {
  width: fit-content;
  margin: 0;
  padding: 0;
}

p {
  color: var(--text);
}
.achievment {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8rem;
}
img {
  width: 100%;
  border-radius: 0.5rem;
}

@media screen and (max-width: 1300px) {
  .achievment {
  display: grid;
  grid-template-columns: 1fr;

}
}
</style>
