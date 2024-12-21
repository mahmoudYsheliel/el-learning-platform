<script lang="ts" setup>
import Button from "primevue/button";
import { selectLang,translationModule } from "@/lib/Translate";
defineProps(["title", "description", "duration", "sectionsTitles"]);
defineEmits(["startQuiz"]);
import Options from "@/components/general/Options.vue";
</script>

<template>
  <div class="container">
    <Options/>
    <h1>{{ selectLang(title) }}</h1>
    <h3>{{ selectLang(description) }}</h3>
    <h3>
      {{ selectLang(translationModule.durationOfTest) }}

      <strong>
        {{ Math.floor(duration / 60) }}:<strong v-if="duration % 60 < 10"
          >0</strong
        >{{ duration % 60 }} {{ selectLang(translationModule.minutes) }}</strong
      >
    </h3>
    <div class="button-container">
        <Button
      :label=selectLang(translationModule.startAnalysisQuiz)
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
  margin-bottom: 5rem
  
}

h1 {
  width: fit-content;
  color: var(--accent1);
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
