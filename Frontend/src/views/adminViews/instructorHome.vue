<script lang="ts" setup>
import Navbar from "../../components/admin/instructorHome/Nanbar.vue";
import CourseCard from "../../components/notUsed/viewCourses/CourseCard.vue";
import axios from "axios";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import "primeicons/primeicons.css";
import { useToken } from "@/stores/token";
import { ref } from "vue";
const token = useToken();
const instructorCourses = ref();
const router = useRouter();
const getCourse = async () => {
  axios
    .post(
      "http://127.0.0.1:8000/get_instructor_courses",
      {},
      {
        headers: {
          Authorization: `Bearer ${token.getToken}`,
        },
      }
    )
    .then((res: any) => {
      instructorCourses.value = res.data.data.courses;
    });
};
getCourse();
</script>

<template>
  <main>
    <Navbar />
    <div class="containe">
      <h1>My Courses</h1>
      <div class="wrapper">
        <CourseCard
          @click="
            () => {
              router.push(`/editCourse/${course.id}`);
            }
          "
          v-for="course in instructorCourses"
          :course="course"
        />
      </div>
      <div class="Button-container">
        <Button
          @click="
            () => {
              router.push('/addCourse');
            }
          "
          label="Add Course"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.containe {
  width: 80%;
  margin-inline: auto;
  margin-block: 2rem;
}
.wrapper {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
button {
  font-size: 1.25rem;
  padding-inline: 2rem;
}

h1 {
  color: var(--text);
}
</style>
