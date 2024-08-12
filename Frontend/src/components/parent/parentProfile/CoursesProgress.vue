<script setup lang="ts">
import { HttpRequester } from "@/lib/APICaller";
import { ref, computed } from "vue";
import { selectLang,translationModule } from "@/lib/Translate";

import PiChart from "../parentProfile/PiChart.vue";

const prop = defineProps(["selectedChildId"]);

const enrollments = ref();
const date = ref<number[]>([]);
const object = computed(() => {
  let childObject = [];
  date.value=[]
  enrollments.value=null
  const childEnrollmentsRequester = new HttpRequester("get_child_enrollments");
  if (prop.selectedChildId) {
    childEnrollmentsRequester
      .callApi({ child_id: prop.selectedChildId })
      .then((res) => {
        if (res.data.enrollments) {
          childObject = res.data.enrollments;
          enrollments.value = childObject;
          let completed = enrollments.value?.filter((obj: any) => {
            return obj?.is_completed;
          }).length;
          date.value = [completed, enrollments.value?.length - completed];
          Data.value = [
            { value: date.value[0], color1: "#7302ff", color2: "#01abff" },
            { value: date.value[1], color1: "#aaa", color2: "#aaa" },
          ];
        }
      });
    return null;
  }
});

const Data = ref();
</script>

<template>
  {{ object }}
  <main>
    <div class="container" style="width: 75%; margin-inline: auto;">
      <div class="progress" v-if="selectedChildId">
        <div class="completed">
          <p>{{ enrollments?.length }}</p>
          <p>{{ selectLang(translationModule.coursesEnrolled) }}</p>
        </div>
        <div class="in-progress">
          <p>
            {{
              enrollments?.filter((obj: any) => {
                return obj?.is_completed;
              }).length
            }}
          </p>
          <p>{{ selectLang(translationModule.coursesCompleted) }}</p>
        </div>
      </div>
      <PiChart
      style="transform: translate(0,-1rem);"
        :data="Data"
        :width="150"
        :height="150"
        :innerRadiusRatio="0.8"
      />
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 2rem;
  gap: 3rem;
  flex-wrap: wrap;
}
.completed {
  background-color: var(--accent1);
}
.in-progress {
  background-color: var(--accent2);
  
  
}
.progress {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  height: fit-content;
  justify-content: center;
}
.progress > * {
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  height: fit-content;
}
.progress > * > * {
  padding: 0;
  margin: 0;
  font-weight: 500;
  line-height: 1.5rem;
}
</style>
