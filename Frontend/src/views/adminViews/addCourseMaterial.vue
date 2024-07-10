<script lang="ts" setup>
import Navbar from "../../components/admin/instructorHome/Nanbar.vue";

import AddLesson from "../../components/admin/addCourseMaterial/AddLesson.vue";
import AdddQuiz from "../../components/admin/addCourseMaterial/AddQuiz.vue";
import SelectMaterial from "../../components/admin/addCourseMaterial/SelectMaterial.vue";
import SideBar from "../../components/admin/addCourseMaterial/SideBar.vue";
import { ref } from "vue";

//modes selectMaterial  addLesson adddQuiz
const mode = ref("selectMaterial");
</script>

<template>
  <main>
    <Navbar />
    <div class="container">
      <SideBar />
      <div class="wrapper">
        <SelectMaterial
          v-if="mode === 'selectMaterial'"
          @selected-mode="(e:any)=>{mode=e }"
        />
        <AddLesson
          v-if="mode === 'addLesson'"
          @selected-mode="(e:any)=>{mode=e }"
        />
        <AdddQuiz
          v-if="mode === 'addQuiz'"
          @selected-mode="(e:any)=>{mode=e }"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  min-height: 100vh;
}
</style>
