<script lang="ts" setup>
import { ref, computed } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import ParentCourseCard from "@/components/parent/general/ParentCourseCard.vue";
import { selectLang, translationModule } from "@/lib/Translate";
const props = defineProps(["childId"]);

const courses = ref<any[]>([]);
const enrollments = ref();

const obj = computed(() => {
  enrollments.value = null;

  const coursesRequester = new HttpRequester("get_courses");

  coursesRequester.callApi().then((res) => {
    if (res?.data?.courses) {
      courses.value = res?.data?.courses;
    }
  });

  const childEnrollmentsRequester = new HttpRequester("get_child_enrollments");
  if (props.childId) {
    childEnrollmentsRequester
      .callApi({ child_id: props.childId })
      .then((res) => {
        if (res?.data?.enrollments) {
          enrollments.value = res?.data?.enrollments;
        }
      });
  }

  return null;
});

const plans = ref();
const plansRequester = new HttpRequester("get_all_plans");
plansRequester.callApi().then((res) => {
  if (res?.success) {
    plans.value = res?.data?.plans;
  }
});
</script>

<template>
  <div class="courses" v-if="childId">
    <div class="child-courses">
      <h1>{{ selectLang(translationModule.enrolledCourses) }}</h1>
      <div class="enrolled-courses">
        <div class="course-container" v-for="enrollment in enrollments">
          <ParentCourseCard
            class="card"
            :isEnrolled="1"
            :programId="enrollment.course_id"
            :childId="childId"
          />
        </div>
      </div>
    </div>
    <div class="availavle-courses">
      <h1>{{ selectLang(translationModule.canEnroll) }}</h1>
      <div class="unenrolled-courses">
        <div class="course-container" v-for="course in courses">
          <ParentCourseCard
            class="card"
            :isEnrolled="0"
            :programId="course.id"
            :childId="childId"
            v-if="!enrollments?.some((obj:any)=>{return obj?.course_id==course?.id})"
          />
        </div>
      </div>
    </div>
  </div>
  {{ obj }}
</template>

<style scoped>
.wrapper {
  padding: 2rem;
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
</style>
