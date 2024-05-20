<script lang="ts" setup>
import axios from "axios";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useToken } from "@/stores/token";
import "primeicons/primeicons.css";

import Button from "primevue/button";
const token = useToken();
const route = useRoute();

const seletedMat = computed(() => {
  return route.params.materialId;
});
const title = ref();
const description = ref();
const questions = ref();
const duration = ref();
const getCourse = async () => {
  axios
    .post(
      "http://127.0.0.1:8000/get_quiz",
      { quiz_id: seletedMat.value },
      {
        headers: {
          Authorization: `Bearer ${token.getToken}`,
        },
      }
    )
    .then((res) => {
      try {
        title.value = res.data.data.quiz["title"];
        description.value = res.data.data.quiz["description"];
        questions.value = res.data.data.quiz["questions"];
        for (let q of questions.value) {
          const showAnswer = ref(false);
          const selected = ref(null);
          q.showAnswer = showAnswer;
          q.selected = selected;
        }
      } catch (err) {}
    });
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
        {{ title }}
      </h2>
      <p>{{ description }}</p>
      <div class="wrapper">
        <div
          v-for="question in questions"
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
              :class="{showCorrect:question.choices.find((item:any) =>item.id === question.selected).isRight==true,
                showWrong:question.choices.find((item:any) =>item.id === question.selected).isRight==false}"
            >
              your answer is
              <span
                v-if="question.choices.find((item:any) =>item.id === question.selected).isRight==true"
                >correct</span
              ><span
                v-if="question.choices.find((item:any) =>item.id === question.selected).isRight==false"
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
  color: var(--primary);
  margin-top: 2rem;
  border-bottom: 4px solid var(--primary);
  width: fit-content;
  margin-bottom: 1rem;
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
