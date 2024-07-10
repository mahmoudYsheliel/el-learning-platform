<script lang="ts" setup>
defineProps(["course"]);
</script>
<template>
  <main>
    <div class="container">
      <div class="wraper">
        <img :src="course.image" alt="" />
      </div>
      <div class="wraper2">
        <h4>{{ course.title }}</h4>
        <div class="age-container">
          Age:
          <span>{{ course.min_age }}</span>
          -
          <span>{{ course.max_age }}</span>
        </div>
        <p>Duration: {{ course.duration }} days</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 16rem;
  height: 16rem;
  background-attachment: fixed;
  position: relative;
  background-color: var(--primary);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.age-container,
p {
  margin-left: 2rem;
}
.wraper {
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.wraper2 {
  position: relative;
  width: 100%;
}

h4,
p {
  text-align: center;
  color: var(--text);
  margin-inline: 0.5rem;
  margin-block: 0;
  padding-block: 0;
}
</style>
