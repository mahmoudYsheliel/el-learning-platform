<script lang="ts" setup>
import ParentSidebar from "../../components/parent/general/ParentSidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import SelectChild from '@/components/parent/parentProfile/SelectChild.vue'
import ChildProgress from '@/components/parent/parentProfile/ChildProgress.vue'
import CoursesProgress from '@/components/parent/parentProfile/CoursesProgress.vue'
import { ref } from "vue";

const selectedChild = ref(null)
</script>

<template>
  <Navbar />
  <div class="container">
    <ParentSidebar class="sidebar" selected="childProgress" />
    <div class="wrapper">
      <SelectChild @selected-child="id=>selectedChild=id"/>
        <CoursesProgress :selectedChildId="selectedChild"/>
      <ChildProgress :selectedChildId="selectedChild"/>
     
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 12rem 1fr;
  min-height: 100vh;
  
}
.child-info {
  height: 4rem;
  display: flex;
  gap: 2rem;
}
.wrapper{
    margin-block: 4rem;
}
h3 {
  color: var(--accent1);
  line-height: 2rem;
  margin: 0;
}
p {
  margin: 0;
  line-height: 1rem;
}
.child-progress {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 5rem;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
img {
  height: 100%;
  border-radius: 8px;
}
.completed,.in-progress{
border-radius: 0.5rem;
padding: 1rem 3rem;
display: flex;
gap: 1rem;
flex-direction: column;
align-items: center;
color: white;
}
@media screen and (max-width: 1000px) {
  .container {
  grid-template-columns:  100vw;
  min-height: 100vh;
}
.sidebar{
  display: none;
}
}
</style>
