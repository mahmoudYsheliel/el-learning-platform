<script lang="ts" setup>
import "primeicons/primeicons.css";
import { useRouter } from "vue-router";


const router =useRouter()
defineProps(["selected"]);
const sidebarPages = [
  {
    label: "Manage Requests",
    to: "manageRequests",
    icon: "pi pi-bell",
  },
  
];
</script>

<template>
  <main>
    <div
      v-for="(page) in sidebarPages"
      class="element"
      :class="{ selected: selected == page.label }"
      @click="router.push(`/${page.to}`)"
    >
      <i :class="page.icon"></i>
      <span> {{ page.label }}</span>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  background-color: var(--accent1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 2rem;
}
.element {
  display: flex;
  gap: 1rem;
  align-items: center;
  color: var(--primary);
  cursor: pointer;
  padding-block: 0.75rem;
  padding-left: 1rem;
}
span {
  line-height: 0rem;
  padding-top: 0.5rem;
}
.selected {
  background-color: var(--primary);
  border-top-right-radius: 3rem;
  border-bottom-right-radius: 3rem;
  color: var(--accent1);
}
</style>
