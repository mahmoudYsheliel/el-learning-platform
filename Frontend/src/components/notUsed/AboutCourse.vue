<script lang="ts" setup>
defineProps(["description", "objectives"]);
</script>

<template>
  <main>
    <div class="wraper">
      <h1>About Course</h1>
      <div class="container">
        <h2>Course Description</h2>
        <p>{{ description }}</p>
      </div>
      <div class="container">
        <h2>Course Objectives</h2>
        <ul v-for="objective in objectives">
          <li>{{ objective }}</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
.wraper {
  color: var(--text);
  margin-top: 5rem;
  padding-left: 5rem;
}
.container {
  margin-bottom: 1.5rem;
}
h1 {
  border-bottom: 4px var(--text) solid;
  width: fit-content;
  margin-bottom: 2rem;
}
h2 {
  margin-bottom: 0.5rem;
}
p {
  padding-left: 2rem;
  opacity: 0.6;
}

ul {
  padding-left: 4rem;
}
</style>
