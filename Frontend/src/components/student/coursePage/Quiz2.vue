<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";
import Dialog from "primevue/dialog";
import ProgressBar from "primevue/progressbar";
import "primeicons/primeicons.css";

import { selectLang, translationModule } from "@/lib/Translate";

defineEmits(["next"]);

import Button from "primevue/button";
const route = useRoute();
const showCounterElseQuestions = ref(true);
const countDown = ref(0);
const studentTime = ref(0);
const currentQuention = ref<number>(0);
const score = ref(0);
const showAnswer = ref(false);
const stopTimer = ref(true);
const progress = ref(0);

const path = computed(() => {
  return route.params.materialId;
});
watch(path, () => {
  getQuiz();
});
const quiz = ref();
const getQuiz = () => {
  const quizRequester = new HttpRequester("get_quiz");
  quizRequester.callApi({ quiz_id: route.params.materialId }).then((res) => {
    if (res?.success) {
      quiz.value = res?.data?.quiz;
      if (quiz.value?.questions) {
        for (let q of quiz.value?.questions) {
          const showAnswer = ref(false);
          const selected = ref(-1);
          q.showAnswer = showAnswer;
          q.selected = selected;
        }
      }
    }
    progress.value = Math.floor(100 / quiz.value?.questions?.length);
    resetQuiz();
  });
};
getQuiz();

setInterval(() => {
  if (!stopTimer.value) studentTime.value = studentTime.value + 1;
}, 1000);

function startQuiz() {
  countDown.value = 3;
  const countDownFunc = setInterval(() => {
    if (countDown.value == 0) {
      clearInterval(countDownFunc);
      showCounterElseQuestions.value = false;
      startStudentTimer();
    }
    countDown.value = countDown.value - 1;
  }, 1000);
}

function startStudentTimer() {
  studentTime.value = 0;
  stopTimer.value = false;
}

const showResults = ref(false);
showAnswer.value = false;

function finishQuiz() {
  stopTimer.value = true;
  showResults.value = true;
  for (let question of quiz.value?.questions) {
    if (question?.correct_answer_id == question?.selected) {
      score.value++;
    }
  }
  const addAnswersRequester = new HttpRequester("add_progress");
  let answers = [];
  for (let q of quiz.value?.questions) {
    if (q?.selected != -1) {
      answers.push({ question_id: q?.id, choice_id: q?.selected });
    }
  }
  let progres = {
    quiz_progress: {
      quiz_id: route.params.materialId,
      time_taken: studentTime.value,
      created_at: new Date().toISOString(),
      answers: answers,
    },
    material_type: "Quiz",
  };

  addAnswersRequester.callApi({
    progres: progres,
    enrolment_id: route.params.enrollmentId,
  });
}

function resetQuiz() {
  showCounterElseQuestions.value = true;
  countDown.value = 3;
  currentQuention.value = 0;
  score.value = 0;
  showAnswer.value = false;
  stopTimer.value = true;
  showResults.value = false;
  progress.value = 0;
  progress.value = Math.floor(100 / quiz.value?.questions?.length);
  if (quiz.value?.questions) {
    for (let q of quiz.value?.questions) {
      q.selected = -1;
    }
  }

  startQuiz();
}

function updateProgress() {
  let duration = 10;
  let oldValue = progress.value;
  let newValue = Math.floor(
    ((currentQuention.value + 1) / quiz.value?.questions?.length) * 100
  );
  let numberOfSteps = 10;
  for (let i = 0; i <= numberOfSteps; i++) {
    setTimeout(() => {
      progress.value = Math.floor(
        oldValue + ((newValue - oldValue) / numberOfSteps) * i
      );
    }, duration * i);
  }
}
</script>

<template>
  <main>
    <div class="container">
      <h2>{{ selectLang(quiz?.title) }}</h2>
      <p>{{ selectLang(quiz?.description) }}</p>

      <div class="wrapper">
        <div v-if="showCounterElseQuestions">
          <h1 style="text-align: center; color: var(--accent1)">
            {{ selectLang(translationModule.quizWillStart) }}
          </h1>
          <h1 class="count-down">{{ countDown }}</h1>
        </div>
        <div v-else class="question-wrapper">
          <div class="quiz-duration">
            <span style="width: fit-content"
              >{{ selectLang(translationModule.yourTime) }}
              <strong style="direction: ltr">
                {{ Math.floor(studentTime / 60) }}:
                <strong v-if="studentTime % 60 < 10">0</strong
                >{{ studentTime % 60 }}</strong
              >
            </span>
          </div>
          <div v-for="(question, i) in quiz?.questions" :key="question">
            <div v-if="i == currentQuention" class="question">
              <ProgressBar
                style="width: 75%; margin-bottom: 1rem"
                :value="progress"
              ></ProgressBar>

              <h3 class="question-order">
                {{ selectLang(translationModule.question) }} {{ i + 1 }}
              </h3>

              <h4 class="question-text">
                {{ selectLang(question?.question) }}
              </h4>
              <div class="choices-wrapper">
                <p
                  v-for="choice in question?.choices"
                  class="choice-text"
                  :key="choice"
                  @click="
                    () => {
                      quiz.questions[i].selected = choice.id;
                    }
                  "
                  :class="{
                    selectedChoice: quiz.questions[i].selected == choice.id,
                  }"
                >
                  {{ selectLang(choice.choice) }}
                </p>
              </div>
            </div>
          </div>
          <div class="controls">
            <Button
              :label="selectLang(translationModule.prevQuestion)"
              :disabled="currentQuention == 0"
              @click="
                () => {
                  currentQuention--;
                  updateProgress();
                }
              "
            />
            <Button
              :label="selectLang(translationModule.finishQuiz)"
              @click="finishQuiz"
            />
            <Button
              :label="selectLang(translationModule.nextQuestion)"
              :disabled="currentQuention + 1 == quiz?.questions?.length"
              @click="
                () => {
                  currentQuention++;
                  updateProgress();
                }
              "
            />
          </div>
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="showResults"
      modal
      class="dialog"
      style="max-width: 75%"
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(2px)',
        },
      }"
    >
      <template #container="{ closeCallback }">
        <div
          class="dialog-wrapper"
          style="display: flex; align-items: center; flex-direction: column"
        >
          <div v-if="!showAnswer" class="score">
            <p>{{ selectLang(translationModule.yourScore) }}</p>
            <p>{{ Math.floor((score / quiz?.questions?.length) * 100) }}%</p>

            <img
              class="interaction"
              v-if="score / quiz?.questions?.length > 0.9"
              src="https://i.pinimg.com/originals/56/da/ac/56daac56f90ba6cf039125586181f6ea.gif"
              alt=""
            />
            <img
              class="interaction"
              v-if="score / quiz?.questions?.length < 0.5"
              src="https://img.freepik.com/free-vector/hand-drawn-facepalm-illustration_23-2150212662.jpg?t=st=1720110311~exp=1720113911~hmac=f9f12f7c863341a0acb15d0ec44f785e42038ebf827f157f7863f0ea96805826&w=826"
              alt=""
            />
          </div>
          <div v-else class="answers">
            <div v-for="(question, i) in quiz?.questions" :key="question">
              <div class="question" style="min-height: 2rem">
                <h4 class="question-order">
                  {{ selectLang(translationModule.question) }} {{ i + 1 }}
                </h4>
                <h4 class="question-text">
                  {{ selectLang(question?.question) }}
                </h4>
                <div class="choices-wrapper">
                  <p
                    v-for="choice in question?.choices"
                    class="choice-text"
                    :key="choice"
                    style="cursor: auto"
                    :class="{
                      correct: choice.id == quiz.questions[i].correct_answer_id,
                      selectedChoice: quiz.questions[i].selected == choice.id,

                      wrong:
                        quiz.questions[i].selected !=
                          quiz.questions[i].correct_answer_id &&
                        quiz.questions[i].selected == choice.id,
                    }"
                  >
                    {{ selectLang(choice.choice) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="quiz-duration">
            <span
              >{{ selectLang(translationModule.yourTime) }}
              <strong>
                {{ Math.floor(studentTime / 60) }}:
                <strong v-if="studentTime % 60 < 10">0</strong
                >{{ studentTime % 60 }}</strong
              >
            </span>
          </div>

          <div class="controls">
            <Button
              :label="selectLang(translationModule.showAnswer)"
              @click="showAnswer = true"
            />
            <Button
              :label="selectLang(translationModule.tryAgain)"
              @click="resetQuiz"
            />
            <Button
              :label="selectLang(translationModule.nextLesson)"
              @click="$emit('next', true)"
            />
          </div>
        </div>
      </template>
    </Dialog>
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
.quiz-duration {
  display: flex;
  justify-content: space-between;
}
.quiz-duration > span {
  color: var(--accent1);
}
.quiz-duration > span > strong {
  color: var(--accent2);
  display: inline-block;
  width: 5rem;
}
.count-down {
  text-align: center;
  font-size: 10rem;
  margin: 0;
  color: var(--accent1);
  line-height: 15rem;
}
.wrapper {
  width: 100%;
  min-height: 50vh;
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
.controls {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  padding-inline: 2rem;
  gap: 2rem;
}
Button {
  font-size: 0.75rem;
}

.dialog-wrapper {
  overflow-y: scroll;
  padding: 2rem;
}
.score > * {
  margin: 0;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--primary);
}
.score > :last-child {
  font-size: 4rem;
}

.score {
  background-color: var(--accent3);
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 100%;
  width: 25rem;
  margin-bottom: 1rem;
}
.selectedChoice {
  background-color: var(--accent1);
  color: var(--primary);
  transition-duration: 0.5s;
}
.correct {
  background-color: var(--accent4);
  color: var(--primary);
}
.wrong {
  background-color: var(--wrongAnswer);
}
</style>
