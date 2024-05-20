<script lang="ts" setup>
import { ref } from "vue";
import CategoryCard from "./CategoryCard.vue";
import { defineProps, defineEmits } from "vue";
import "primeicons/primeicons.css";

const slider = ref();

function slideLeft() {
  if (slider.value) {
    slider.value.scrollLeft -= 150;
  }
}
function slideRight() {
  if (slider.value) {
    slider.value.scrollLeft += 150;
  }
}

defineProps(["categories"]);
const emit = defineEmits(["id"]);
</script>
<template>
  <main>
    <div class="container">
      <h1>
        The future starts here. Invest in yourself with our engaging e-learning
        platform.
      </h1>

      <div class="wraper">
        <div
          style="
            display: flex;
            justify-content: end;
            gap: 2rem;
            margin-top: 2rem;
            width: 100%;
            margin-right: 10%;
          "
        >
          <i class="pi pi-arrow-circle-left" @click="slideLeft"></i>
          <i class="pi pi-arrow-circle-right" @click="slideRight"></i>
        </div>
        <div class="slider" id="slider" ref="slider">
          <CategoryCard
            @click="$emit('id', cat.id)"
            v-for="cat in categories"
            :cat="cat"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
h1 {
  padding-top: 2rem;
  margin-top: 0px;
  text-align: center;
  text-transform: capitalize;
  margin-inline: auto;
  padding: 1rem;
  color: var(--text);
}
.wraper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.slider {
  margin-top: 0.5rem;
  display: flex;
  max-width: 80%;
  align-items: end;
  gap: 40px;
  margin-inline: auto;
  overflow-x: scroll;
  scroll-behavior: smooth;
  padding-inline: 1rem;
  padding-bottom: 2rem;
}
i {
  font-size: 1.5rem;
  color: var(--accent2);
  cursor: pointer;
}
.slider::-webkit-scrollbar {
  display: none;
}
.container {
  background-color: var(--primary);
}
</style>
