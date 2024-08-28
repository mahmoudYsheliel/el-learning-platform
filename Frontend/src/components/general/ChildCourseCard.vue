<script lang="ts" setup>
import Button from "primevue/button";
import { HttpRequester } from "@/lib/APICaller";
import { ref, computed } from "vue";
import { selectLang, translationModule } from "@/lib/Translate";

import { useRouter, useRoute } from "vue-router";
const prop = defineProps(["courseId"]);
const router = useRouter();
const route = useRoute();
const course = ref();
const courseRequester = new HttpRequester("get_course");
courseRequester
  .callApi({ course_id: prop.courseId })
  .then((res) => (course.value = res.data.course));

const isEnrolled = computed(() => {
  if (route.params?.isEnrolled) {
    return route.params?.isEnrolled;
  }
  return 0;
});
const childId = computed(() => {
  if (route.params?.childId) {
    return route.params?.childId;
  }
  return 0;
});
</script>

<template>
  <main>
    <div class="container">
      <img :src="course?.image" alt="" />
      <h2>{{ selectLang(course?.title) }}</h2>
      <Button
        @click="
          () => {
            router.push(`/courseDetails/${prop.courseId}/${childId}/${isEnrolled}`);
          }
        "
        :label="selectLang(translationModule.learnMore)"
      />
    </div>
  </main>
</template>

<style scoped>
.container {
  width: fit-content;
  display: flex;
  flex-direction: column;
}
h2 {
  color: var(--header);
  margin: 0;
  padding-left: 1rem;
}
button {
  align-self: end;
}
img {
  width: 24rem;
  aspect-ratio: 1.6/1;
  border-radius: 8px;
}
</style>
