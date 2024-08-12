<script lang="ts" setup>
import "primeicons/primeicons.css";
import { useRouter } from "vue-router";
import { usePersonalInfo } from "@/stores/token";
import { selectLang,translationModule } from "@/lib/Translate";
import {childSidebar} from '@/lib/Modules'
const personalInfo = usePersonalInfo()

const router =useRouter()
defineProps(["selected"]);

</script>

<template>
  <main>
    <div
      v-for="(page) in childSidebar"
      class="element "
      :class="{ selected: selected == page.name , selectedSidebarItem:selected == page.name}"
      @click="router.push(`/${page.to}`)"
    >
      <i :class="page.icon"></i>
      <span :class="{notification:(page.name=='notifications') && personalInfo.getInfo?.notifications?.some(n=>{return n.status=='waiting'})}"> {{selectLang(page.label) }}</span>
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
  padding-inline: 1rem;
}
span {
  line-height: 0rem;
  padding-top: 0.5rem;
  position: relative;
}
.selected {
  background-color: var(--primary);
  border-top-right-radius: 3rem;
  border-bottom-right-radius: 3rem;
  color: var(--accent1);
}
.notification::after{
  content: '';
  width: 1rem;
  height: 1rem;
  background-color: var(--wrongAnswer);
  border-radius: 100%;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(200%,-25%);

}
</style>
