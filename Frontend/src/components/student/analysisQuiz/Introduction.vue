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
    <p v-html="selectLang(description)" />

    <div class="button-container">
        <Button
        style="direction: ltr;"
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
p{
  font-weight: 200;
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
