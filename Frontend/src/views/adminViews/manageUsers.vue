<script setup lang="ts">
import AdminSidebar from "@/components/admin/general/AdminSidebar.vue";
import Nanbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { ref } from "vue";
import Button from "primevue/button";
import ParentChild from "@/components/admin/manageUsers/ParentChild.vue";
import ChildCourse from "@/components/admin/manageUsers/ChildCourse.vue";

const selectedViewType = ref("parentChild"); // or childCourse
</script>

<template>
  <Nanbar />
  <div class="container">
    <AdminSidebar class="sidebar" selected="Manage Users" />
    <div class="wrapper">
      <div class="options-container">
        <p
          @click="selectedViewType = 'parentChild'"
          :class="{ selected: selectedViewType == 'parentChild' }"
        >
          Parent Child
        </p>
        <p
          @click="selectedViewType = 'childCourse'"
          :class="{ selected: selectedViewType == 'childCourse' }"
        >
          Child Course
        </p>
      </div>
      <div class="content">
        <ParentChild v-if="selectedViewType == 'parentChild'" />
        <ChildCourse v-if="selectedViewType == 'childCourse'" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 12rem calc(100% - 12rem);
  min-height: 100vh;
}
.wrapper {
  padding: 2rem;
}
.options-container {
  display: flex;
  justify-content: space-around;
}
.options-container > * {
  color: var(--accent2);
  border-radius: 0.5rem;
  border: 2px solid;
  padding: 0.25rem 1.5rem;
  cursor: pointer;
}
.selected {
  color: white;
  background-color: var(--accent2);
  transition-duration: 0.5s;
}
@media screen and (max-width: 1000px) {
  .container {
    grid-template-columns: 100vw;
    min-height: 100vh;
  }
  .sidebar {
    display: none;
  }
}
</style>
