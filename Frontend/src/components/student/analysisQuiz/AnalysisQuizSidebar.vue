<script lang="ts" setup>
import { selectLang,translationModule } from '@/lib/Translate';
defineProps(["questions", "selectedQuestion", "answers"]);
defineEmits(["selectQuestion"]);

</script>

<template>
  <div class="container">
    <h2 >{{ selectLang(translationModule.question) }}</h2>

    <div class="sidebar" >
      <p
      v-for="(q, i) in questions"
      :class="{ selected: q?.order == selectedQuestion ,answered: answers?.some((ans:any)=> {return (ans?.question_id==q?.question?.id && ans?.section_name==q?.section_name && ans?.choice_id!=-1  )}) }"
      @click="$emit('selectQuestion', q?.order)"
    >
    {{ selectLang(translationModule.question) }} {{ i + 1 }}
    </p>
    </div>
    
  </div>
</template>

<style scoped>
.container {
  width: fit-content;
  height: 80vh;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  padding-inline: 0.5rem;
}
.container::-webkit-scrollbar {
  display: none;
}
.sidebar{
  overflow-y: scroll; 
  height: 70vh;
  scrollbar-width: 0;
}
.sidebar::-webkit-scrollbar{
  display: none;
}
h2 {
  background-color: var(--secondary);
  color: var(--primary);
  padding-inline: 0.5rem;
  border-radius: 0.25rem;
  font-size: 1.25rem;
}
p {
  cursor: pointer;
  color: var(--accent1);
  margin-block: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-left: 0.5rem;
  line-height: 1rem;
  width: fit-content;
}

.selected {
  background-color: var(--choiceBackgroundColor);
}
.answered{
  background-color: var(--correctAnswer);
}
</style>
