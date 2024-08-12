<script lang="ts" setup>
import "primeicons/primeicons.css";
import { useRouter } from "vue-router";

import {parentSidebarPages} from '@/lib/Modules'
const router =useRouter()
defineProps(["selected"]);

</script>

<template>
  <main>
    <div
      v-for="(page) in parentSidebarPages"
      class="element"
      :class="{ selected: selected == page.name, selectedSidebarItem:selected==page.name}"
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
  gap: 0.5rem;
  padding-top: 2rem;
}
.element {
  display: flex;
  gap: 1rem;
  align-items: center;
  color: var(--primary);
  cursor: pointer;
  padding-block: 0.75rem;
  padding-inline: 1rem;
}
span {
  line-height: 0rem;
  padding-top: 0.5rem;
  font-size: 0.8rem;
}
.selected {
  background-color: var(--primary);
  border-top-right-radius: 3rem;
  border-bottom-right-radius: 3rem;
  color: var(--accent1);
}

</style>
