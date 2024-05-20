<script lang="ts" setup>
import Navbar from "../../components/landingPage/Navbar.vue";
import SideBar from "../../components/coursePage/SideBar.vue";
import Lesson from "../../components/coursePage/Lesson.vue";
import Quiz from "../../components/coursePage/Quiz.vue";
import Assesment from "../../components/coursePage/Assesment.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Button from "primevue/button";

const material = ref();
const title = ref();
const route = useRoute();
const router = useRouter();
const getCourse = async () => {
  axios
    .post(
      "http://127.0.0.1:8000/get_course",
      { course_id: route.params.courseId },
      {}
    )
    .then((res) => {
      try {
        let c = res.data.data.course["material"];
        material.value = res.data.data.course["material"];
        title.value = res.data.data.course["title"];
        function compareOrder(a: any, b: any) {
          return a.order - b.order;
        }
        material.value.sort(compareOrder);
        for (let i = 0; i < material.value.length; i++) {
          if (material.value[i].type === "Lesson") {
            material.value[i].icon = "pi pi-book";
          }
          if (material.value[i].type === "Quiz") {
            material.value[i].icon = "pi pi-check-square";
          }
          if (material.value[i].type === "Assesment") {
            material.value[i].icon = "pi pi-file";
          }
        }
      } catch (err) {}
    });
};
getCourse();
function previous() {
  if (materialComponnent.value) {
    router.push(
      `/viewCoursePage/${route.params.courseId}/${route.params.enrollmentId}/${
        material.value[materialComponnent.value.order - 1].Id
      }`
    );
  }
}
function next() {
  if (materialComponnent.value) {
    router.push(
      `/viewCoursePage/${route.params.courseId}/${route.params.enrollmentId}/${
        material.value[materialComponnent.value.order + 1].Id
      }`
    );
  }
}
const seletedMat = computed(() => {
  const specificMaterial = material.value?.find(
    (item: any) => item?.Id === route.params.materialId
  );

  return specificMaterial;
});
const materialComponnent = computed(() => {
  let i = material.value?.indexOf(seletedMat.value);
  let end = false;
  if (i == material.value?.length - 1) {
    end = true;
  }
  if (seletedMat.value?.type == "Lesson") {
    return { type: Lesson, order: i, end: end };
  }
  if (seletedMat.value?.type == "Quiz") {
    return { type: Quiz, order: i, end: end };
  }
  if (seletedMat.value?.type == "Assesment") {
    return { type: Assesment, order: i, end: end };
  }

  return null;
});
</script>

<template>
  <main>
    <Navbar />
    <div class="container">
      <div class="sidebar">
        <SideBar :material="material" :course-title="title" />
      </div>
      <div class="wrapper">
        <component :is="materialComponnent?.type" />
        <div class="Button-Wrapper">
          <Button
            label="Previous"
            :class="{ hide: materialComponnent?.order == 0 }"
            @click="previous"
          />
          <Button
            label="Next"
            :class="{ hide: materialComponnent?.end }"
            @click="next"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: max-content 1fr;
}
.sidebar,
.wrapper {
  height: calc(100vh - 5rem);
}
.hide {
  visibility: hidden;
}
.wrapper {
  overflow-y: scroll;
}
.wrapper::-webkit-scrollbar {
  display: none;
}
Button {
  font-size: 1.5rem;
  width: 12rem;
}
.Button-Wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-top: 5rem;
  margin-inline: auto;
}
</style>
