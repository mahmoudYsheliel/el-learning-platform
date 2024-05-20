<script setup lang="ts">
import SplitButton from "primevue/splitbutton";

import { ref } from "vue";

const menu = ref();
const items = ref([
  
      {
        label: "Discovery Zone",
      },
      {
        label: "Path Finder",
      },
      {
        label: "Master",
      },
]);

const toggle = (event: any) => {
  menu.value.toggle(event);
};
</script>

<template>
  <main>
    <div class="image">
      <img src="../../assets/logo.png" alt="" />
      <p>Entertain Your Education</p>
    </div>

    <div class="options">
        <span>Trace Plans</span>
      <div class="card flex justify-content-center">
        <SplitButton severity="help" class="programs" label="Programs"  :model="items" text />
      </div>
      <span>العربية</span>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  width: 90%;
  margin-inline: auto;
  justify-content: space-between;
  align-items: start;
  margin-top: 2rem;
}
.image{
    position: relative;
    top:  3rem;
}
.options {
  display: flex;
  gap: 1rem;
  color: var(--accent2);
  align-items: center;
  font-weight: bold;
}
img {
  height: 2rem;
  margin: 0;
}
p {
  margin: 0;
  color: var(--accent2);
  margin-left: 1rem;
}

</style>
