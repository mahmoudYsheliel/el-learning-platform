<script lang="ts" setup>
import ChildSidebar from "../../components/general/ChildSidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import ChildCourseCard from "@/components/general/ChildCourseCard.vue";
import { HttpRequester } from "@/lib/APICaller";
import { selectLang,translationModule } from "@/lib/Translate";
import { ref } from "vue";

const enrollmentsRequester = new HttpRequester("get_enrollments");
const enrollments = ref();
enrollmentsRequester.callApi().then((res) => {
  if (res?.data?.enrollments) {
    enrollments.value = res?.data?.enrollments;
  }
});
const coursesRequester = new HttpRequester("get_courses");
const courses = ref<any[]>([]);
coursesRequester.callApi().then((res) => {
  if (res?.data?.courses) {
    courses.value = res?.data?.courses;
  }
});
</script>

<template>
  <Navbar />
  <div class="container">
    <ChildSidebar class="sidebar" selected="home" />
    <div class="wrapper">
      
      <div class="courses">
        <div class="child-courses">
          <h1>{{ selectLang(translationModule.enrolledCourses) }}</h1>
          <div class="enrolled-courses">
            <div
              class="course-container"
              v-for="enrollment in enrollments"
            >
              <ChildCourseCard
                class="card"
                :courseId="enrollment.course_id"
              />
            </div>
          </div>
        </div>
        <div class="availavle-courses">
          <h1>{{ selectLang(translationModule.canEnroll) }}</h1>
          <div class="unenrolled-courses">
            <div class="course-container" v-for="course in courses">
              <ChildCourseCard
                class="card"
                :courseId="course.id"
                v-if="!enrollments || !enrollments.some((obj:any)=>{return obj?.course_id==course?.id})"
              />
            </div>
          </div>
        </div>
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
  padding: 2rem;
}
.children {
  padding: 2rem;
  display: flex;
  gap: 2rem;
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
  grid-template-columns:  90vw;
  min-height: 100vh;
}
.sidebar{
  display: none;
}
}
</style>
