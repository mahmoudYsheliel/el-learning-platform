<script setup lang="ts">
import { HttpRequester } from "@/lib/APICaller";
import Introduction from "@/components/student/analysisQuiz/Introduction.vue";
import Section from "@/components/student/analysisQuiz/Section.vue";
import Button from "primevue/button";
import { useRoute } from "vue-router";
import { ref } from "vue";
import router from "@/router";
import Arc from "@/components/general/Arc.vue";
import AnalysisQuizSidebar from "@/components/student/analysisQuiz/AnalysisQuizSidebar.vue";
import Dialog from "primevue/dialog";

const route = useRoute();

const analysisQuizRequester = new HttpRequester("get_analysis_quiz");
const analysisQuiz = ref();
const leftTime = ref(0);
const answerObj = ref<any[]>([]);
const selectedQuestionId = ref("");
const showDialog =ref(false)

analysisQuizRequester
  .callApi({ analysis_quiz_id: route.params.quizId })
  .then((res) => {
    if(res.msg=='Quiz Taken Before'){
      router.push('/childNotifications')
      return
    }
    analysisQuiz.value = res?.data?.analysis_quiz;
    leftTime.value = analysisQuiz.value?.duration;
    selectedQuestionId.value = analysisQuiz.value?.sections[0]?.id;
    for (let section of analysisQuiz.value?.sections) {
      for (let question of section.questions) {
        answerObj.value.push({
          section_id: section.id,
          question_id: question.id,
          choice_id: -1,
        });
      }
    }
  });
let countDown: any;
const startQuiz = ref(false);
const quizSectionSelected = ref(-1);
function startQuizFunction() {
  startQuiz.value = true;
  quizSectionSelected.value = 0;
  countDown = setInterval(() => {
    leftTime.value--;
    if (leftTime.value == 0) {
      finishQuiz();
    }
  }, 1000);
}

function pushAnswer(ans: any) {
  let selectedObj = answerObj.value.find((answer) => {
    return (
      answer?.question_id == ans.question_id &&
      answer?.section_id == ans.section_id
    );
  });
  selectedObj.choice_id = ans?.choice_id;
}
function finishQuiz() {
  clearInterval(countDown);
  const addAnswerRequester = new HttpRequester("add_analysis_quiz_answer");
  let data = {
    analysis_quiz_id: route.params.quizId,
    answers: answerObj.value,
  };
  addAnswerRequester.callApi(data).then((res) => {
    console.log(res);
    showDialog.value=true
  });
}

function isThereNextQuestion() {
  for (let i = 0; i < analysisQuiz?.value?.sections.length; i++) {
    const questions = analysisQuiz?.value?.sections[i].questions;
    for (let j = 0; j < questions.length; j++) {
      if (questions[j].id === selectedQuestionId.value) {
        if (j < questions.length - 1) {
          return true;
        } else if (i < analysisQuiz?.value?.sections.length - 1) {
          return true;
        } else {
          return false; // No next question
        }
      }
    }
  }
  return null; // Question not found
}

function nextQuestion() {
  for (let i = 0; i < analysisQuiz?.value?.sections.length; i++) {
    const questions = analysisQuiz?.value?.sections[i].questions;
    for (let j = 0; j < questions.length; j++) {
      if (questions[j].id === selectedQuestionId.value) {
        if (j < questions.length - 1) {
          return questions[j + 1].id;
        } else if (i < analysisQuiz?.value?.sections.length - 1) {
          quizSectionSelected.value++;
          console.log(
            quizSectionSelected.value,
            analysisQuiz?.value?.sections[i + 1].questions[0].id
          );
          return analysisQuiz?.value?.sections[i + 1].questions[0].id;
        } else {
          return null; // No next question
        }
      }
    }
  }
  return null; // Question not found
}
function IsTherePreviousQuestion() {
  for (let i = 0; i < analysisQuiz?.value?.sections?.length; i++) {
    const questions = analysisQuiz?.value?.sections[i].questions;
    for (let j = 0; j < questions.length; j++) {
      if (questions[j].id === selectedQuestionId.value) {
        if (j > 0) {
          return true;
        } else if (i > 0) {
          const prevSection = analysisQuiz?.value?.sections[i - 1].questions;

          return true;
        } else {
          return false; // No previous question
        }
      }
    }
  }
  return null; // Question not found
}
function previousQuestion() {
  for (let i = 0; i < analysisQuiz?.value?.sections?.length; i++) {
    const questions = analysisQuiz?.value?.sections[i].questions;
    for (let j = 0; j < questions.length; j++) {
      if (questions[j].id === selectedQuestionId.value) {
        if (j > 0) {
          return questions[j - 1].id;
        } else if (i > 0) {
          const prevSection = analysisQuiz?.value?.sections[i - 1].questions;
          quizSectionSelected.value--;
          return prevSection[prevSection.length - 1].id;
        } else {
          return null; // No previous question
        }
      }
    }
  }
  return null; // Question not found
}
</script>

<template>
  <div class="wrapper">
    <Dialog
    style="max-width: 80%;"
      v-model:visible="showDialog"
      modal
      :pt="{
        mask: {
          style: 'backdrop-filter: blur(2px)',
        },
        header: {
          style: 'display:none',
        },
        content: {
          style:
            'margin-block:auto; display: flex; flex-direction: column; align-items: center; justify-content: center;',
        },
      }"
    >
      <div style=" display: flex;flex-direction: column; align-items: center; gap: 2rem; padding-inline: 5rem;padding-top: 2rem;">
        <h3>Well Done</h3>
        <h3>Log in With Your Parent Account For Analysis Details</h3>

        
        <Button label="Return Home" @click=" router.push('/childNotifications')"/>
      </div>
    </Dialog>
    <Introduction
      v-if="!startQuiz"
      :title="analysisQuiz?.title"
      :description="analysisQuiz?.description"
      :duaration="analysisQuiz?.duration"
      :sections-titles="analysisQuiz?.sections?.map((a:any)=>{return a?.title})"
      @start-quiz="startQuizFunction"
    />
    <div class="section-wrapper" v-if="startQuiz">
      <AnalysisQuizSidebar
        :sections="analysisQuiz?.sections"
        :selected-question="selectedQuestionId"
        @select-question="(id)=> {selectedQuestionId=id;quizSectionSelected=analysisQuiz?.sections.findIndex((item:any)=>{return item?.questions?.some((q:any)=>{return q?.id==id})})}"
      />
      <div class="section">
        <h4 class="time-left" style="text-align: end">
          <Arc
            style="position: fixed; right: 2rem; top: 2rem"
            :remainingTime="leftTime"
            :totalTime="analysisQuiz.value?.duration"
          />
        </h4>
        <Section
          :selected-question-id="selectedQuestionId"
          :show-next="isThereNextQuestion()"
          :show-previous="IsTherePreviousQuestion()"
          :section="analysisQuiz?.sections[quizSectionSelected]"
          :answers="answerObj"
          @next="
            () => {
              let n = nextQuestion();
              if (n) {
                selectedQuestionId = n;
              }
            }
          "
          @previous="
            () => {
              let p = previousQuestion();
              if (p) {
                selectedQuestionId = p;
              }
            }
          "
          @answer="
            (ans) => {
              pushAnswer(ans);
            }
          "
        />
        <div class="button-container">
          <Button @click="finishQuiz" label="Finish Quiz" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding-top: 4rem;
  margin-inline: auto;
  height: 70vh;
}
h4 {
  color: var(--text);
}
strong {
  color: var(--accent1);
}
.section-wrapper{
  display: grid;
  grid-template-columns: 15rem 1fr;
  margin-bottom: 5rem;
}
.section {
  width: 90%;
  margin-inline:auto ;
 
}
button {
  margin-top: 2rem;
  padding-inline: 3rem;
}
.button-container {
  display: flex;
  justify-content: center;
}
h3{
  color: var(--accent1);
  margin: 0;
  text-align: center;
}
</style>
