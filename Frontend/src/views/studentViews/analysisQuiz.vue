<script setup lang="ts">
import { HttpRequester } from "@/lib/APICaller";
import Introduction from "@/components/student/analysisQuiz/Introduction.vue";
import Section from "@/components/student/analysisQuiz/Section.vue";
import Button from "primevue/button";
import { useRoute } from "vue-router";
import { ref } from "vue";
import router from "@/router";

import { selectLang,translationModule } from "@/lib/Translate";
import AnalysisQuizSidebar from "@/components/student/analysisQuiz/AnalysisQuizSidebar.vue";
import Dialog from "primevue/dialog";

const route = useRoute();

const analysisQuizRequester = new HttpRequester("get_analysis_quiz");
const analysisQuiz = ref({title:null,description:null,duration:null,questions:<any[]>[]});
const quiz =ref()
const leftTime = ref(0);
const answerObj = ref<any[]>([]);
const selectedQuestionOrder = ref(0);
const showDialog =ref(false)
let countDown: any;
const startQuiz = ref(false);

analysisQuizRequester
  .callApi({ analysis_quiz_id: route.params.quizId })
  .then((res) => {
    if(res.msg=='Quiz Taken Before'){
      router.push('/childNotifications')
      return
    }
    
    quiz.value = res?.data?.analysis_quiz;
    leftTime.value = quiz.value?.duration;
    analysisQuiz.value.description=quiz.value?.description
    analysisQuiz.value.title=quiz.value?.title
    analysisQuiz.value.duration=quiz.value?.duration
    for (let section of quiz.value?.iq?.iq_sections) {
      for (let question of section.questions) {
        analysisQuiz.value.questions.push({question:question,section_name:section?.name,order:analysisQuiz.value.questions.length,audio_link:section?.audio_link})
        answerObj.value.push({
          section_name: section?.name,
          question_id: question?.id,
          choice_id: -1,
        });
      }
    }
    for (let section of quiz.value?.enneagram?.personalities) {
      for (let question of section.questions) {
        analysisQuiz.value.questions.push({question:question,section_name:section?.name,order:analysisQuiz.value.questions.length,audio_link:section?.audio_link})
        answerObj.value.push({
          section_name: section.name,
          question_id: question.id,
          choice_id: -1,
        });
      }
    }
    for (let section of quiz.value?.learning_styles?.learning_style_features) {
      for (let question of section.questions) {
        analysisQuiz.value.questions.push({question:question,section_name:section?.name,order:analysisQuiz.value.questions.length,audio_link:section?.audio_link})
        answerObj.value.push({
          section_name: section.name,
          question_id: question.id,
          choice_id: -1,
        });
      }
    }
    for (let section of quiz.value?.big5traits?.traits) {
      for (let question of section.questions) {
        analysisQuiz.value.questions.push({question:question,section_name:section?.name,order:analysisQuiz.value.questions.length,audio_link:section?.audio_link})
        answerObj.value.push({
          section_name: section.name,
          question_id: question.id,
          choice_id: -1,
        });
      }
    }
  });

function startQuizFunction() {
  startQuiz.value = true;
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
      answer?.section_name == ans.section_name
    );
  });
  selectedObj.choice_id = ans?.choice_id;
}

function finishQuiz() {
  clearInterval(countDown);
  const addAnswerRequester = new HttpRequester("add_analysis_quiz_answer");
  let data = {
    answers:{
      quiz_id: route.params.quizId,
    answers: answerObj.value,
    }
    
  };
  console.log(data)
  addAnswerRequester.callApi(data).then((res) => {
    console.log(res?.data)
    if(res?.success){
      showDialog.value=true
    }
  });
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
        <h3>{{ selectLang(translationModule.wellDone) }}</h3>
        <h3>{{ selectLang(translationModule.logWithParent) }}</h3>

        
        <Button :label=selectLang(translationModule.returnHome) @click=" router.push('/childNotifications')"/>
      </div>
    </Dialog>
    <Introduction
      v-if="!startQuiz"
      :title="analysisQuiz?.title"
      :description="analysisQuiz?.description"
      :duration="analysisQuiz?.duration"
      @start-quiz="startQuizFunction"
    />
    <div class="section-wrapper" v-if="startQuiz">
      <AnalysisQuizSidebar
      :answers="answerObj"
        :questions="analysisQuiz.questions"
        :selected-question="selectedQuestionOrder"
        @select-question="(order)=> {selectedQuestionOrder=order}"
      />
      <div class="section">
          
        <Section
          :show-next="analysisQuiz.questions.length != selectedQuestionOrder+1"
          :show-previous="selectedQuestionOrder!=0"
          :question="analysisQuiz.questions[selectedQuestionOrder]?.question"
          :sectionName="analysisQuiz.questions[selectedQuestionOrder]?.section_name"
          :selectedQuestionOrder="selectedQuestionOrder"
          :answers="answerObj"
          :audio_link="analysisQuiz.questions[selectedQuestionOrder]?.audio_link"
          :leftTime=leftTime
          :duration=analysisQuiz.duration
          @next="
                selectedQuestionOrder++ 
              
          "
          @previous="selectedQuestionOrder--
          "
          @answer="
            (ans) => {
              pushAnswer(ans);
            }
          "
        />
        <div class="button-container">
          <Button @click="finishQuiz" :label=selectLang(translationModule.finishQuiz) />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
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
