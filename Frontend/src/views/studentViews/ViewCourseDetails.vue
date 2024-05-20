<script lang="ts" setup>
import Navbar from "../../components/landingPage/Navbar.vue";
import HeroSection from "../../components/ViewCourseDetails/HeroSection.vue";
import AboutCourse from "../../components/ViewCourseDetails/AboutCourse.vue";
import Material from "../../components/ViewCourseDetails/Material.vue";
import Information from "../../components/ViewCourseDetails/Information.vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { ref } from "vue";

const route = useRoute();
const course = ref();
const getCourse = async () => {
  axios
    .post(
      "http://127.0.0.1:8000/get_course",
      { course_id: route.params.id },
      {}
    )
    .then((res) => {
      try {
        course.value = res.data.data.course;
        function compare(a:any,b:any){
          return a?.order - b?.order
        }
        course.value?.material?.sort(compare)
      } catch (err) {
      }
    });
};
getCourse();
</script>

<template>
  <Navbar />

  <HeroSection   :price="course?.price":image="course?.image" :title="course?.title" :firstLesson="course?.material[0]?.Id"/>
  <div class="big-container">
    <div class="left-container">
      <AboutCourse
        :description="course?.description"
        :objectives="course?.objectives"
      />
      <Material :material="course?.material" />
    </div>
    <div class="information">
      <Information
        :title="course?.title"
        :duration="course?.duration"
        :price="course?.price"
        :min_age="course?.min_age"
        :max_age="course?.max_age"
        :categories="course?.categories"
      />
    </div>
  </div>
</template>

<style scoped>
.big-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
.information {
  display: flex;
  justify-content: center;
}
.left-container{
  padding-right: 1rem;
}
@media screen and (max-width: 800px) {
  .big-container {
    display: flex;
    flex-direction: column-reverse;
} 
}
</style>
