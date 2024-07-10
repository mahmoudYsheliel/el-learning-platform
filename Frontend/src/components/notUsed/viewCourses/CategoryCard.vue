<script lang="ts" setup>
import { defineProps } from "vue";
defineProps(["cat"]);
</script>
<template>
  <main>
    <div class="container">
      <div class="wraper">
        <img :src="cat.image" alt="" />
      </div>
      <div class="wraper2">
        <h3>{{ cat.category }}</h3>
      </div>
      <div class="container2">
        <h3>{{ cat.category }}</h3>
        <p>{{ cat.description }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 12rem;
  height: 16rem;
  background-attachment: fixed;
  position: relative;
  background-color: var(--secondary);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.container2 {
  width: 100%;
  height: 100%;
  background-color: var(--secondary);
  border-radius: 8px;
  opacity: 0;
  transition-duration: 0.5s;
  position: absolute;
}
.container2:hover {
  opacity: 1;
}

.wraper {
  height: 40%;
  width: 50%;
  position: relative;
  border-radius: 8px;
  top: 20%;
  overflow: hidden;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
}

h3,
p {
  margin: 0;
  padding: 0;
  text-align: center;
  color: var(--text);
  padding-top: 1rem;
  color: var(--text);
  padding-inline: 0.5rem;
  text-align: center;
}
</style>
