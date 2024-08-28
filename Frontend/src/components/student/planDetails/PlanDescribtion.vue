<script lang="ts" setup>
import { selectLang, translationModule } from "@/lib/Translate";
import Button from "primevue/button";

const props = defineProps(["plan", "isEnrolled", "notShowButton"]);
const emits = defineEmits(["enroll", "viewMaterial"]);
</script>

<template>
  <div class="course-description">
    <div class="head">
      <h1>{{ selectLang(plan?.title) }}</h1>
    </div>

    <img :src="plan?.image" alt="" />
    <div class="information">
      <h2>{{ selectLang(translationModule.planInfo) }}</h2>
      <div class="info-container">
        <div class="wrapper">
          <h4>
            {{ selectLang(translationModule.price) }}
          </h4>
          <p>{{ plan?.price }} L.E</p>
        </div>
        <div class="wrapper">
          <h4>
            {{ selectLang(translationModule.age) }}
          </h4>
          <p>
            {{ plan?.min_age }} - {{ plan?.max_age }}
            {{ selectLang(translationModule.years) }}
          </p>
        </div>
      </div>
    </div>
    <div class="description">
      <div class="header">
        <h2>{{ selectLang(translationModule.planDescription) }}</h2>
        <Button
          v-if="!isEnrolled && !notShowButton"
          :label="selectLang(translationModule.enrollNow)"
          @click="
            () => {
              $emit('enroll');
            }
          "
        />
        <Button
          v-if="isEnrolled && !notShowButton"
          :label="selectLang(translationModule.viewMat)"
          @click="
            () => {
              $emit('viewMaterial');
            }
          "
        />
      </div>
      <p>{{ selectLang(plan?.description) }}</p>
    </div>
    <div class="objectives">
      <h2>{{ selectLang(translationModule.planObjectives) }}</h2>
      <p v-for="objective in plan?.objectives">- {{ selectLang(objective) }}</p>
    </div>
  </div>
</template>

<style scoped>
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
p {
  margin-left: 1rem;
  line-height: 1.25rem;
  color: var(--text);
}
button {
  width: 30%;
}
img {
  width: 90%;
  border-radius: 8px;
}
h1 {
  color: var(--accent2);
  margin: 0;
  width: fit-content;
  border-bottom: 0.25rem solid var(--accent3);
  line-height: 2rem;
}
.wrapper {
  border-bottom: solid var(--primary) 1px;
  margin-bottom: 1rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
.wrapper > p {
  margin: 0;
  padding: 0;
  padding-inline: 1rem;
  color: var(--secondary);
  line-height: 0rem;
}
.wrapper > h4 {
  margin: 0;
  padding: 0;
  line-height: 1rem;
}
.info-container {
  display: flex;
  justify-content: space-around;
  margin: 1rem;
}
</style>
