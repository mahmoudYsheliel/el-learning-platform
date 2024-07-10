<script lang="ts" setup>
import { useMaterial, useToken } from "@/stores/token";
import { computed } from "vue";
import "primeicons/primeicons.css";
import Button from "primevue/button";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const token = useToken();

const material = useMaterial();

const materialBar = computed(() => {
  return material.getMaterial;
});
function icon(type: string) {
  if (type === "Lesson") {
    return "pi pi-book";
  }
  if (type === "Quiz") {
    return "pi pi-check-square";
  }
  if (type === "Assesment") {
    return "pi pi-file";
  }
}
function addMaterial() {
  axios
    .post(
      "http://127.0.0.1:8000/update_course",
      {
        course_id: route.params.courseId,
        new_course: { material: material.getMaterial },
      },
      {
        headers: {
          Authorization: `Bearer ${token.getToken}`,
        },
      }
    )
    .then((res) => {
      router.push("/instructorHome");
    });
}
</script>

<template>
  <main>
    <div class="container">
      <h3>Added Material</h3>
      <div class="wrapper">
        <div v-for="mat in materialBar" class="element">
          <i :class="icon(mat.type)" />
          {{ mat.title }}
        </div>
      </div>
      <Button @click="addMaterial()" label="Add Material To Course" />
    </div>
  </main>
</template>

<style scoped>
.container {
  background-color: var(--primary);
  height: 100%;
  overflow: hidden;
  box-shadow: 4px 8px 8px var(--primary);
  border-radius: 8px;
}
h3 {
  background-color: var(--secondary);
  color: var(--primary);
  line-height: 2rem;
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  height: 3rem;
}

.element {
  border-bottom: 2px solid;
  margin-bottom: 0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.selected {
  color: var(--secondary);
}
.wrapper {
  height: calc(100% - 12rem);
  overflow-y: scroll;
}
.wrapper::-webkit-scrollbar {
  display: none;
}
Button {
  padding-inline: 2rem;
  margin-left: 2rem;
}
</style>
