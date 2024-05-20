<script lang="ts" setup>
import Navbar from "../../components/instructorHome/Nanbar.vue";

import AddLesson from "../../components/addCourseMaterial/AddLesson.vue";
import AdddQuiz from "../../components/addCourseMaterial/AddQuiz.vue";
import SelectMaterial from "../../components/addCourseMaterial/SelectMaterial.vue";
import SideBar from "../../components/addCourseMaterial/SideBar.vue";
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
