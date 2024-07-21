<script lang="ts" setup>
import Button from "primevue/button";
import { ref } from "vue";

defineProps([
  "showPrevious",
  "showNext",
  "section",
  "answers",
  "selectedQuestionId",
]);
defineEmits(["previous", "next", "answer"]);

function scrollTop() {
  window.scrollTo(0, 0);
}
const lang = ref('en')


</script>

<template>
  <div class="container">
    <h1>{{ section?.title }}</h1>
    <div
      class="question-container"
      v-for="(question, i) in section?.questions"
      :key="question"
      
    >
      <div v-if="selectedQuestionId == question?.id" class="question">
        <div class="select-lang">
          <h3 class="question-order">Question {{ i + 1 }}</h3>
          <div class="langs">
            <p @click="lang='en'" :class="{selected:(lang=='en')}">English</p>
            <p @click="lang='ar'" :class="{selected:(lang=='ar')}">العربية</p>
          </div>
        </div>
        

        <h4 class="question-text"><span v-if="lang=='en'">{{ question?.question?.english }} </span> <span v-if="lang=='ar'">{{ question?.question?.arabic }} </span></h4>
        <div class="choices-wrapper">
          <p
            v-for="choice in question?.choices"
            class="choice-text"
            :class="{selectedChoice:(answers?.some((item:any)=>{return item?.section_id==section?.id && item?.question_id==question?.id && item?.choice_id==choice?.id}))}"
            :key="choice"
            @click="
              () => {
                $emit('answer', {
                  section_id: section?.id,
                  question_id: question?.id,
                  choice_id: choice?.id,
                });
              }
            "
          >
          <span v-if="lang=='en'">{{ choice.english }}</span>
          <span v-if="lang=='ar'">{{ choice.arabic }}</span>
            
          </p>
        </div>
      </div>
    </div>

    <div class="button-container">
      <Button
        label="Previous"
        @click="
          () => {
            scrollTop();
            $emit('previous');
          }
        "
        :disabled="!showPrevious"
      />
      <Button
        label="Next"
        @click="
          () => {
            scrollTop();
            $emit('next');
          }
        "
        :disabled="!showNext"
      />
    </div>
  </div>
</template>

<style scoped>
h1 {
  width: fit-content;
  line-height: 1.5rem;
  color: var(--accent1);
  border-bottom: solid 0.25rem var(--accent3);
  border-radius: 0.5rem;
  margin-bottom: 3rem;
}
.button-container {
  display: flex;
  justify-content: space-between;
}
button {
  width: 10rem;
}
.question-order {
  color: var(--accent2);
  width: 100%;
  line-height: 0;
  margin: 0;
  margin-top: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}
.interaction {
  width: 50%;
  border-radius: 50%;
}
.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 40vh;
}
.question-text {
  color: var(--primary);
  text-align: center;
  background-color: var(--accent1);
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 0;
  margin-top: 1rem;
  width: 80%;
  font-weight: 500;
}

.choices-wrapper {
  width: 50%;
}
.choice-text {
  background-color: var(--choiceBackgroundColor);
  border-radius: 1rem;
  text-align: center;
  width: 100%;
  cursor: pointer;
  font-weight: 400;
  padding: 0.25rem 0.5rem;
}
.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 40vh;
}
.selectedChoice {
  background-color: var(--accent1);
  color: var(--primary);
  transition-duration: 0.5s;
}
.langs{
  display: flex;
  gap: 1rem;
  color: var(--text);
}
.langs>.selected{
  color: var(--accent1);
}
.langs>p{
  cursor: pointer;
}
.select-lang{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
