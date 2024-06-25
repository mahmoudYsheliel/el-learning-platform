<script lang="ts" setup>
import { computed, ref,watch } from "vue";
import { useRoute } from "vue-router";
import { HttpRequester } from "../../lib/APICaller";
import "primeicons/primeicons.css";

import Button from "primevue/button";
const route = useRoute();

const path=computed(()=>{return route.params.materialId})
watch(path,()=>{getCourse()})
const quiz = ref()
const getCourse = () => {
  const quizRequester = new HttpRequester('get_quiz')
  quizRequester.callApi({quiz_id:route.params.materialId}).then(res=>{if(res.success){
    quiz.value= res.data.quiz
    for (let q of quiz.value.questions) {
          const showAnswer = ref(false);
          const selected = ref(null);
          q.showAnswer = showAnswer;
          q.selected = selected;
        }
  }})

};
getCourse();

function viewAnswer(q: any) {
  q.showAnswer = true;
}
</script>

<template>
  <main>
    <div class="container">
      <h2>
        {{ quiz?.title }}
      </h2>
      <p>{{ quiz?.description }}</p>
      <div class="wrapper">
        <div
          v-for="question in quiz?.questions"
          class="question-container"
          :key="question.id"
        >
          <div v-if="!question.multicorrect" class="one-correct">
            <h3>{{ question.question }}</h3>
            <div
              class="choice-container"
              v-for="choice in question.choices"
              :key="question.question + choice.id"
            >
              <input
                type="radio"
                :id="choice.choice + choice.id"
                :name="question.id"
                :value="choice.id"
                v-model="question.selected"
              />
              <label :for="choice.choice + choice.id"
                >{{ choice.choice }}
              </label>
            </div>
            <Button
              label="Submit"
              @click="
                () => {
                  viewAnswer(question);
                }
              "
              style="scale: 0.625"
            />
            <div
              class="answer"
              v-if="question.showAnswer"
              :class="{showCorrect:question.correct_answer_id==question.selected,
                showWrong:question.correct_answer_id!=question.selected}"
            >
              your answer is
              <span
                v-if="question.correct_answer_id==question.selected"
                >correct</span
              ><span
                v-if="question.correct_answer_id!=question.selected"
                >wrong</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 80%;
  margin-inline: auto;
}
h2 {
  color: var(--accent1);
  margin: 0;
  line-height: 1rem;
  margin-top: 2rem;
  border-bottom: 4px solid var(--accent3);
  width: fit-content;
}
.wrapper {
  margin-top: 2rem;
  width: 100%;
}
.question-container {
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid var(--primary);
  color: var(--text);
  margin-bottom: 1rem;
}
Button {
  font-size: 1.25rem;
}
label {
  padding-left: 0.5rem;
}
.choice-container {
  padding-left: 1rem;
}
.showCorrect {
  color: green;
}
.showWrong {
  color: red;
}
.answer {
  text-transform: capitalize;
  margin-left: 2rem;
}
</style>
