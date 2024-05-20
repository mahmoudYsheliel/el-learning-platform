<script lang="ts" setup>
import Button from "primevue/button";
const emit = defineEmits(["selectedMode"]);
</script>

<template>
  <main>
    <div class="container">
      <Button
        @click="
          () => {
            $emit('selectedMode', 'addLesson');
          }
        "
        label="Add Lesson"
      />
      <Button
        @click="
          () => {
            $emit('selectedMode', 'addQuiz');
          }
        "
        label="Add Quiz"
      />
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding-top: 2rem;
}
button{
  width: 20rem;
  font-size: 1.5rem;
}
</style>
