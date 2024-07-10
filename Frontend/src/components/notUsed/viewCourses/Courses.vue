<script lang="ts" setup>
import { ref } from "vue";
import CourseCard from "./CourseCard.vue";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import "primeicons/primeicons.css";
import axios from "axios";
import { useToken } from "@/stores/token";

const token = useToken();
const slider = ref();
const router = useRouter();

function slideLeft() {
  if (slider.value) {
    slider.value.scrollLeft -= 150;
  }
}
function slideRight() {
  if (slider.value) {
    slider.value.scrollLeft += 150;
  }
}

function viewCourse(id: string) {
  axios
    .post(
      "http://127.0.0.1:8000/get_enrollment",
      { course_id: id },
      {
        headers: {
          Authorization: `Bearer ${token.getToken}`,
        },
      }
    )
    .then((res) => {
      if (res.data.success === false) {
        router.push(`/viewCourseDetails/${id}`);
      } else if (res.data.success === true) {
        let enrollment_id = res.data.data.id;
        axios
          .post(
            "http://127.0.0.1:8000/get_course",
            { course_id: id },
            {
              headers: {
                Authorization: `Bearer ${token.getToken}`,
              },
            }
          )
          .then((res) => {
            let first_material = res.data.data.course.material.sort(
              (a: any, b: any) => {
                return a.order - b.order;
              }
            );

            let first_material_id = first_material[0].Id;
            if (first_material_id) {
              router.push(
                `/viewCoursePage/${id}/${enrollment_id}/${first_material_id}`
              );
            }
          });
      }
    });
}

defineProps(["courses"]);
</script>
<template>
  <main>
    <div class="container">
      <div class="wraper">
        <h2>{{ courses?.cat }}</h2>
        <div
          style="
            display: flex;
            justify-content: end;
            gap: 2rem;
            width: 100%;
            margin-right: 10%;
          "
        >
          <i class="pi pi-arrow-circle-left" @click="slideLeft"></i>
          <i class="pi pi-arrow-circle-right" @click="slideRight"></i>
        </div>
        <div class="slider" id="slider" ref="slider">
          <CourseCard
            @click="
              () => {
                viewCourse(course.id);
              }
            "
            v-for="course in courses?.courses"
            :course="course"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
h2 {
  font-size: 1.75rem;
  color: var(--text);
  width: 90%;
}
.wraper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.slider {
  margin-top: 0.5rem;
  display: flex;
  max-width: 80%;
  align-items: end;
  gap: 40px;
  margin-inline: auto;
  overflow-x: scroll;
  scroll-behavior: smooth;
  padding-inline: 1rem;
  padding-bottom: 2rem;
}
i {
  font-size: 1.5rem;
  color: var(--accent2);
  cursor: pointer;
}
.slider::-webkit-scrollbar {
  display: none;
}
</style>
