<script lang="ts" setup>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";




import { ref } from "vue";

defineProps(["sections",'selectedQuestion']);
defineEmits(["selectQuestion"]);
</script>

<template>
    <div class="container">
        <h2>Quiz Sections</h2>

        <Accordion :activeIndex="sections.findIndex((item:any)=>{return item?.questions?.some((q:any)=>{return q?.id==selectedQuestion})})">
    <AccordionTab v-for="tab in sections" >
      <template #header >
        <h3>{{ tab.title }}</h3>
      </template>
      <p :class="{selected:(q?.id==selectedQuestion)}"class="m-0" v-for="q,i in tab.questions" @click="$emit('selectQuestion',q?.id)">Question {{ i+1 }}</p>
    </AccordionTab>
  </Accordion>
    </div>
  
</template>

<style scoped>
.container{
    width: fit-content;
    height: 80vh;
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.container::-webkit-scrollbar {
  display: none;
}
h2{
    background-color: var(--secondary);
    color: var(--primary);
    padding-inline: 0.5rem;
    border-radius: 0.25rem;
}
h3{
    color: var(--secondary);
    margin: 0;
    line-height: 0rem;
    padding-right: 1rem;
}
p{
    cursor: pointer;
    color: var(--accent1);
    margin: 0.5rem;
}

.selected{
    background-color: var(--choiceBackgroundColor);
}
</style>
