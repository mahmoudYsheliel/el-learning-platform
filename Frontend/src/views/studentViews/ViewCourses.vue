<script setup lang="ts">
import Navbar from "../../components/landingPage/Navbar.vue";
import Categories from "../../components/viewCourses/Categories.vue";
import Courses from "../../components/viewCourses/Courses.vue";
import axios from "axios";
import { ref, computed } from "vue";

const categories = ref([]);
const courses = ref([]);

const getCategories = async () => {
  axios.post("http://127.0.0.1:8000/get_categories", {}, {}).then((res) => {
    try {
      categories.value = res.data.data.categories;
    } catch (err) {}
  });
};
const getCourses = async () => {
  axios.post("http://127.0.0.1:8000/get_courses", {}, {}).then((res) => {
    try {
      courses.value = res.data.data.courses;
    } catch (err) {}
  });
};

getCategories();
getCourses();

const sortedCourses = computed(() => {
  let coursesSorted: any = [];

  categories.value.forEach((element: any) => {
    let obj = { id: element.id, cat: element.category, courses: [] };
    coursesSorted.push(obj);
  });

  courses.value.forEach((course: any) => {
    let courseCategories = course.categories;
    courseCategories.forEach((e: any) => {
      for (let i = 0; i < coursesSorted.length; i++) {
        if (coursesSorted[i].id === e.Id) {
          coursesSorted[i].courses.push(course);
        }
      }
    });
  });

  return coursesSorted;
});
</script>
<template>
  <main>
    <div class="container">
      <Navbar class="nav" :selected="1" />
      <Categories :categories="categories" />
      <div class="course-container">
        <Courses
          v-for="coursesGruoup in sortedCourses"
          :key="coursesGruoup.id"
          :courses="coursesGruoup"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  background-color: var(--secondary);
}
.nav {
  top: 0;
  position: sticky;
}
.course-container {
  margin-top: 5rem;
}
</style>
