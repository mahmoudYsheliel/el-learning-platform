<script lang="ts" setup>
import ParentSidebar from "../../components/general/ParentSidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import ParentCourseCard from "@/components/general/ParentCourseCard.vue";
import { HttpRequester } from "@/lib/APICaller";
import { ref } from "vue";
const selectedChild = ref(-1);

const groupRequester = new HttpRequester("get_all_program");
const children = ref<any[]>([]);
groupRequester.callApi().then((res) => {
  const programs = res.data.program;
  const childrenRequester = new HttpRequester("personal_info");
  childrenRequester.callApi().then((res) => {
    if (res.data.info.children) {
      for (let child of res.data.info.children) {
        const childRequester = new HttpRequester("personal_another_user_info");
        childRequester.callApi({ another_userId: child }).then((res) => {
          if (res.data.info) {
            let childObj = res.data.info;
            childObj.id = child;
            childObj.image = programs.find(
              (r: any) => r.id == childObj.child_group
            )?.image;
            childObj.child_group = programs.find(
              (r: any) => r.id == childObj.child_group
            )?.title;

            const childEnrollmentsRequester = new HttpRequester(
              "get_child_enrollments"
            );
            childEnrollmentsRequester
              .callApi({ child_id: child })
              .then((res) => {
                if (res.data.enrollments) {
                  childObj.enrollments = res.data.enrollments;
                }
                children.value.push(childObj);
              });
          }
        });
      }
    }
  });
});

const coursesRequester = new HttpRequester("get_courses");
const courses = ref<any[]>([]);
coursesRequester.callApi().then((res) => {
  if (res.data.courses) {
    courses.value = res.data.courses;
  }
});
</script>

<template>
  <Navbar />
  <div class="container">
    <ParentSidebar selected="Children" />
    <div class="wrapper">
      <div class="select-child">
        <h1>Select Child</h1>
        <div class="children">
          <div
            class="child-card"
            v-for="(child, i) in children"
            @click="selectedChild = i"
          >
          
          <div class="child-info">
          <img :src="child.image" alt="" />
          <div class="info">
            <h3>{{ child?.first_name }} {{ child?.last_name }}</h3>
            <p style="color: var(--text);">{{ child.child_group }}</p>
          </div>
          </div>
        </div>
        </div>
      </div>
      <div class="courses" v-if="selectedChild >= 0">
        <div class="child-courses">
          <h1>Courses {{ children[selectedChild]?.first_name }} Enrolled</h1>
          <div class="enrolled-courses">
            <div
              class="course-container"
              v-for="enrollment in children[selectedChild]?.enrollments"
            >
              <ParentCourseCard
                class="card"
                :isEnrolled="1"
                :programId="enrollment.course_id"
                :childId="children[selectedChild]?.id"
              />
            </div>
          </div>
        </div>
        <div class="availavle-courses">
          <h1>Courses {{ children[selectedChild]?.first_name }} Can Enroll</h1>
          <div class="unenrolled-courses">
            <div class="course-container" v-for="course in courses">
              <ParentCourseCard
                class="card"
                :isEnrolled="0"
                :programId="course.id"
                :childId="children[selectedChild].id"
                v-if="!children[selectedChild]?.enrollments || !children[selectedChild]?.enrollments.some((obj:any)=>{return obj?.course_id==course?.id})"
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
h3{
  margin: 0;
  line-height: 1rem;
  color: var(--accent1);
}
img {
  height: 100%;
  border-radius: 8px;
}
</style>
