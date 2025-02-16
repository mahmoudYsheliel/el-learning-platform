<script setup lang="ts">
import { HttpRequester } from "@/lib/APICaller";
import Introduction from "@/components/student/analysisQuiz/Introduction.vue";
import Section from "@/components/student/analysisQuiz/Section.vue";
import Button from "primevue/button";
import { useRoute } from "vue-router";
import { ref } from "vue";
import router from "@/router";
import { useLang } from "@/stores/token";
import { selectLang, translationModule } from "@/lib/Translate";
import Dialog from "primevue/dialog";

const route = useRoute();

const analysisQuizRequester = new HttpRequester("get_analysis_quiz");
const analysisQuiz = ref({
  title: null,
  description: null,
  duration: null,
  questions: <any[]>[],
});
const quiz = ref();
const answerObj = ref<any[]>([]);
const selectedQuestionOrder = ref(0);
const showDialog = ref(false);
const startQuiz = ref(false);

analysisQuizRequester
  .callApi({ analysis_quiz_id: route.params.quizId })
  .then((res) => {
    if (res.msg == "Quiz Taken Before") {
      router.push("/childNotifications");
      return;
    }

    quiz.value = res?.data?.analysis_quiz;
    analysisQuiz.value.description = quiz.value?.description;
    analysisQuiz.value.title = quiz.value?.title;
    analysisQuiz.value.duration = quiz.value?.duration;
    for (let i = 0; i < quiz.value?.sections?.length; i++) {
      let section = quiz.value?.sections[i];
      for (let j = 0; j < section?.sub_sections?.length; j++) {
        let subSection = section?.sub_sections[j];
        for (let k = 0; k < subSection?.questions?.length; k++) {
          let question = subSection.questions[k];
          analysisQuiz.value.questions.push({
            question: question,
            section_name: subSection?.info_name,
            order: analysisQuiz.value.questions.length,
            audio_link: question?.audio_link,
          });
          answerObj.value.push({
            sub_section_name: subSection?.info_name,
            question_id: question?.id,
            choice_id: -1,
          });
        }
      }
    }
  });

function startQuizFunction() {
  startQuiz.value = true;
}

function pushAnswer(ans: any) {

  let selectedObj = answerObj.value.find((answer) => {
    return (
      answer?.question_id == ans.question_id &&
      answer?.sub_section_name == ans.section_name
    );
  });
  selectedObj.choice_id = ans?.choice_id;
}

function finishQuiz() {
  const addAnswerRequester = new HttpRequester("add_analysis_quiz_answer");
  let data = {
    answers: {
      quiz_id: route.params.quizId,
      answers: answerObj.value,
    },
  };
  addAnswerRequester.callApi(data).then((res) => {
    if (res?.success) {
      showDialog.value = true;
    }
  });
}


const lang = useLang()
function setLang(selectedLang: string | undefined) {
  if (selectedLang == "English") {
    lang.setLang("en");
  }
  if (selectedLang == "العربية") {
    lang.setLang("ar");
  }
}



</script>

<template>
  <div class="wrapper">
    <Dialog style="max-width: 80%" v-model:visible="showDialog" modal :pt="{
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
    }">
      <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding-inline: 5rem;
          padding-top: 2rem;
        ">
        <h3 style="font-size: 2.2rem;">{{ selectLang(translationModule.wellDone) }}</h3>
        <h3>{{ selectLang(translationModule.logWithParent) }}</h3>

        <Button :label="selectLang(translationModule.results)" @click="router.push('/viewChildAnalysis')" />
      </div>
    </Dialog>

   
    <Introduction v-if="!startQuiz" :title="analysisQuiz?.title" :description="analysisQuiz?.description" :duration="analysisQuiz?.duration" @start-quiz="startQuizFunction" />
    <div class="section-wrapper" v-if="startQuiz">

      <div class="section">
        <Section :question-type="analysisQuiz.questions[selectedQuestionOrder]?.section_name" :show-next="analysisQuiz.questions.length != selectedQuestionOrder + 1
          " :show-previous="selectedQuestionOrder != 0" :question="analysisQuiz.questions[selectedQuestionOrder]?.question" :sectionName="analysisQuiz.questions[selectedQuestionOrder]?.section_name
            " :selectedQuestionOrder="selectedQuestionOrder" :answers="answerObj" :audio_link="analysisQuiz.questions[selectedQuestionOrder]?.audio_link
              " :duration="analysisQuiz.duration" @next="selectedQuestionOrder++" @previous="selectedQuestionOrder--" @answer="
              (ans) => {
                pushAnswer(ans);
              }
            " @time-over="finishQuiz" @finish="finishQuiz" />


      </div>
    </div>
    <Button class="lang_button" @click="() => {
      setLang(selectLang(translationModule.language));
    }
    " icon="pi pi-language" />
  </div>
</template>

<style scoped>
.lang_button {
  cursor: pointer;
  color: var(--primary);
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 2.5rem;
  aspect-ratio: 1/1;
  border-radius: 100%;
  padding: 0;
}

.wrapper {
  margin-inline: auto;
  min-height: 100vh;
}

h4 {
  color: var(--text);
}

strong {
  color: var(--accent1);
}

.section-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 5rem;
}

.section {
  width: 100%;
  margin-inline: auto;
}

button {
  margin-top: 2rem;
  padding-inline: 3rem;
}

.button-container {
  display: flex;
  justify-content: center;
}

h3 {
  color: var(--accent1);
  margin: 0;
  text-align: center;
}
</style>
