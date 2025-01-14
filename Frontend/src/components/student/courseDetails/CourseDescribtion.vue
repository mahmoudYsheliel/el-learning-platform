<script lang="ts" setup>
import { selectLang, translationModule } from "@/lib/Translate";
import Button from "primevue/button";
import 'primeicons/primeicons.css'

const props = defineProps(["course", "isEnrolled", "notShowButton"]);
const emits = defineEmits(["enroll", "viewMaterial"]);
</script>

<template>
  <div class="course-description">
    <div class="head">
      <h1>{{ selectLang(course?.title) }}</h1>
    </div>
    
    <img :src="course?.image" alt="" :class="{locked:course?.is_locked}"/>
    <div class="description">
      <div class="header">
        <h2>{{ selectLang(translationModule.courseDescription) }}</h2>
        <Button  v-if="!isEnrolled && !notShowButton && !course?.is_locked" :label="selectLang(translationModule.enrollNow)" @click="() => {
            $emit('enroll');
          }
          " />
        <Button v-if="isEnrolled && !notShowButton && !course?.is_locked" :label="selectLang(translationModule.viewMat)" @click="() => {
            $emit('viewMaterial');
          }
          " />
          <p v-if="course?.is_locked" style="color: #f33;"> {{ selectLang(translationModule.locked) }}</p>
      </div>
      <p>{{ selectLang(course?.description) }}</p>
    </div>
    <div class="objectives">
      <h2>{{ selectLang(translationModule.courseObjectives) }}</h2>
      <ul>
        <li v-for="objective in course?.objectives">

          {{ selectLang(objective) }}

        </li>
      </ul>

    </div>
  </div>
</template>

<style scoped>
.locked{
  opacity: 0.5;
  
}
.head {
  display: flex;
  margin-top: 5rem;
  flex-direction: column;
  align-items: start;
}

.course-description {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

h2 {
  color: var(--accent1);
  margin: 0;
  padding: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li,p {
  margin-left: 1rem;
  color: var(--descriptionText);
}

button {
  width: 30%;
}

img {
  width: 100%;
  border-radius: 8px;
}

h1 {
  color: var(--accent2);
  margin: 0;
  width: fit-content;

  line-height: 2rem;
}
</style>
