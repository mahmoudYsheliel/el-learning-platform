<script lang="ts" setup>
import Button from "primevue/button";
import { HttpRequester } from "@/lib/APICaller";
import { ref, computed } from "vue";
import { selectLang, translationModule } from "@/lib/Translate";
import { useRouter, useRoute } from "vue-router";

import "primeicons/primeicons.css";

const prop = defineProps(["courseId"]);
const router = useRouter();
const route = useRoute();
const course = ref();
const courseRequester = new HttpRequester("get_course");
courseRequester
  .callApi({ course_id: prop.courseId })
  .then((res) => (course.value = res?.data?.course));

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

const showPrequisite = ref(false);
const showOpensCourse = ref(false);


const isLocked = ref(false);
const prequisiteId = ref("");
const prequisiteTitle = ref("");
const courseOpensId = ref("");
const courseOpensTitle = ref("");
const planRequester = new HttpRequester("get_course_plan");
planRequester.callApi({ course_id: prop.courseId }).then((res) => {
  let courses = res?.data?.plan?.courses;
  prequisiteId.value = courses?.find((course: any) => {
    return course?.Id == prop.courseId;
  })?.ristriction_on_course;
  courseOpensId.value = courses?.find((course: any) => {
    return course?.ristriction_on_course == prop.courseId;
  })?.Id;

  if (courseOpensId.value) {
    new HttpRequester("get_course")
      .callApi({ course_id: courseOpensId.value })
      .then((res) => {
        courseOpensTitle.value = selectLang(res?.data?.course?.title) || "";
      });
  }

  if (prequisiteId.value) {
    new HttpRequester("get_course")
      .callApi({ course_id: prequisiteId.value })
      .then((res) => {
        prequisiteTitle.value = selectLang(res?.data?.course?.title) || "";
      });

    new HttpRequester("get_enrollment")
      .callApi({ course_id: prequisiteId.value })
      .then((res) => {
        isLocked.value = !res?.data?.enrollment?.is_completed;
      });
  }
});
</script>

<template>
  <main>
    <div class="container" @click="
          () => {
            router.push(
              `/courseDetails/${prop.courseId}/${childId}/${isEnrolled}`
            );
          }
        ">
      <i
        v-if="prequisiteTitle"
        @mousemove="showPrequisite = true"
        @mouseleave="showPrequisite = false"
        class="pi pi-lock first"
      ></i>
      <transition name="fade" appear>
        <p v-if="prequisiteTitle && showPrequisite" class="first">
          {{ prequisiteTitle }}
        </p>
      </transition>

      <i
        v-if="courseOpensTitle"
        @mousemove="showOpensCourse = true"
        @mouseleave="showOpensCourse = false"
        class="pi pi-key last"
      ></i>
      <transition name="fade">
        <p v-if="courseOpensTitle && showOpensCourse" class="last">
          {{ courseOpensTitle }}
        </p>
      </transition>

      <img :src="course?.image" alt="" />
      <h2>{{ selectLang(course?.title) }}</h2>
      <Button
        
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
  position: relative;
  cursor: pointer;
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
i {
  position: absolute;
  right: 0;
  font-size: 1.5rem;
  color: var(--wrongAnswer);
  font-weight: bolder;
  background-color: var(--primary);
  padding: 0.25rem;
  border-radius: 100%;
  cursor: pointer;
}
p {
  position: absolute;
  color: var(--secondary);
  font-size: 1.25rem;
  font-weight: bold;
  right: -3rem;
  margin: 0;
  padding: 0;
  line-height: 1.5rem;
}
p::before {
  content: "";

  position: absolute;
  left: -0.5rem;
  border-top: 0.5rem solid transparent;
  border-bottom: 0.5rem solid transparent;

  border-left: 0.5rem solid var(--secondary);
}
.first {
  top: 0;
}
.last {
  bottom: 5.5rem;
}
i.last {
  color: var(--accent1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
