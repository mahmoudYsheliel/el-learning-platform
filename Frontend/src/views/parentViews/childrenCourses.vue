<script lang="ts" setup>
import ParentSidebar from "../../components/parent/general/ParentSidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { ref } from "vue";
import SelectChild from "@/components/parent/parentProfile/SelectChild.vue";
import ChildCourses from "@/components/parent/childrenCourses/ChildCourses.vue";
const selectedChild = ref(null);


</script>

<template>
  <Navbar />
  <div class="container">
    <ParentSidebar class="sidebar" selected="childCourses" />
    <div class="wrapper">
      <div class="select-child">
        <SelectChild @selected-child="id=>selectedChild=id"/>
        <ChildCourses :childId="selectedChild" />
        
      </div>
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
.wrapper {
  margin-block: 4rem;
}
.children {
  padding: 2rem;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
.child-card {
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  border: 2px solid var(--accent3);
  padding: 0.5rem;
  cursor: pointer;
}
p {
  margin: 0;
}
h1 {
  line-height: 0;
  color: var(--accent2);
}
.availavle-courses,
.child-courses {
  margin-top: 8rem;
}
.unenrolled-courses,
.enrolled-courses {
  display: flex;
  flex-wrap: wrap;
  padding-left: 1rem;
}
.card {
  margin: 1rem;
}
.child-info {
  height: 4rem;
  display: flex;
  gap: 2rem;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
h3 {
  margin: 0;
  line-height: 1rem;
  color: var(--accent1);
}
img {
  height: 100%;
  border-radius: 8px;
}
@media screen and (max-width: 1000px) {
  .container {
    grid-template-columns: 90vw;
    min-height: 100vh;
  }
  .sidebar {
    display: none;
  }
}
</style>
