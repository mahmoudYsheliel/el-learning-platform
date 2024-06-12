<script setup lang="ts">
import "primeicons/primeicons.css";

const prop = defineProps(["material"]);
for (let i = 0; i < prop.material?.length; i++) {
  if (prop.material[i].type === "Lesson") {
    prop.material[i].type = "pi pi-book";
  }
  if (prop.material[i].type === "Quiz") {
    prop.material[i].type = "pi pi-check-square

";
  }
  if (prop.material[i].type === "Assesment") {
    prop.material[i].type = "pi pi-file";
  }
}
</script>

<template>
  <main>
    <div class="wraper">
      <h1>Course Content</h1>
      <div class="container">
        <div v-for="mat in material" class="element">
          <i :class="mat.type"></i>
          <p>{{ mat.title }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.wraper {
  color: var(--text);
  margin-block: 4rem;
  padding-left: 5rem;
}
.container {
  margin-left: 2rem;
  padding-left: 0.5rem;
  border-left: 8px solid var(--primary);
  border-radius: 8px;
}
h1 {
  border-bottom: 4px var(--text) solid;
  width: fit-content;
  margin-bottom: 2rem;
}
i,
p {
  font-size: 1.25rem;
  padding-block: 1rem;
  margin: 0;
}
.element {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--primary);
  color: var(--text);
}
</style>
