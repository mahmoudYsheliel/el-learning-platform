<script lang="ts" setup>
import Button from "primevue/button";
defineProps(["title", "description", "duaration", "sectionsTitles"]);
defineEmits(["startQuiz"]);
</script>

<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <h3>{{ description }}</h3>
    <div class="sections">
      <h3>
        This quiz contains {{ sectionsTitles?.length }} sections as follow:
        <strong v-for="sectionTitle in sectionsTitles">{{
          sectionTitle
        }}</strong>
      </h3>
    </div>
    <h3>
      the duration of the quiz is:
      <strong>
        {{ Math.floor(duaration / 60) }}:<strong v-if="duaration % 60 < 10"
          >0</strong
        >{{ duaration % 60 }} minutes</strong
      >
    </h3>
    <div class="button-container">
        <Button
      label="Start Quiz"
      @click="
        () => {
          $emit('startQuiz');
        }
      "
    />
    </div>
   
  </div>
</template>

<style scoped>
.container {
  width: 80%;
  margin-inline: auto;
  
}

h1 {
  width: fit-content;
  line-height: 1.5rem;
  color: var(--accent1);
  border-bottom: solid 0.25rem var(--accent3);
  border-radius: 0.5rem;
}
h3 {
  color: var(--text);
  margin-left: 2rem;
  line-height: 2rem;
  margin-top: 2rem;
}
h3 > strong {
  margin-inline: 0.5rem;
  color: var(--secondary);
}
button{
    padding-inline: 3rem;
}
.button-container{
    display: flex;
    justify-content: center;
}
</style>
