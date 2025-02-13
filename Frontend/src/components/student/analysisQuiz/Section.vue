<script lang="ts" setup>
import Button from "primevue/button";
import { selectLang, translationModule } from "@/lib/Translate";
import 'primeicons/primeicons.css'
import CountDown from "@/components/general/CountDown.vue";
import { ref, computed, watch } from "vue";
import { useLang } from "@/stores/token";

const lang = useLang()
const props = defineProps([
  "showNext",
  "question",
  "answers",
  "selectedQuestionOrder",
  "sectionName",
  "audio_link",
  "duration",
  "questionType"
]);

defineEmits(["next", "answer", 'timeOver', 'finish']);
const questionOrder = computed(() => { return props.selectedQuestionOrder })

const images = ref()
setTimeout(() => { images.value = props.question?.image?.split(',') }, 1)
watch(questionOrder, (oldQ, new_q) => {

  images.value = []
  setTimeout(() => { images.value = props.question?.image?.split(',') }, 1)
  stage.value = 'show image'
  if (props.questionType != 'Symbol Search')
    return
  setTimeout(() => {
    stage.value = "show options";
  }, 3000);

})


function scrollTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}




const questions = computed(() => { return parseStringWithInversion(selectLang(props.question?.question)) })

function parseStringWithInversion(input: string | undefined) {
  if (input) {

    return input.split("_____");
  }
  return "invalid";
}

const stage = ref("show image"); // or show options


</script>

<template>
  <div class="container">
    <div style="display: flex; justify-content: space-between">
      <h3>
        {{ selectedQuestionOrder + 1 }} / {{ answers?.length }}
      </h3>
      <CountDown @timeOver="() => { $emit('timeOver'); }" :totalTime="duration" />

    </div>

    <div class="question-container">
      <div class="question">
        <div class="question-text" v-if="questionType != 'Symbol Search'">
          <h1>{{ selectLang(question?.question) }}</h1>
          <audio :src="audio_link" autoplay>
            <source :src="audio_link">
          </audio>


          <div class="image_container">
            <img :class="{ image2: (images?.length > 1) }" v-for="image in images" :src="image" alt="" v-if="question?.image != undefined" />
          </div>
        </div>

        <div class="question-text" v-if="questionType == 'Symbol Search'">
          <h1 v-if="stage == 'show image'">{{ questions[0] }}</h1>
          <h1 v-if="stage == 'show options'">{{ questions[1] }}</h1>

          <div class="image_container" v-if="stage == 'show image'">
            <span style="width: 32%;" v-for="(image, i) in images">
              <img class="image2" style="width: 100%;" :src="image" alt="" v-if="i < 2" />
            </span>
          </div>
          <div class="image_container" v-if="stage == 'show options'">
            <span v-for="(image, i) in images" style="width: 32%;">
              <img style="width: 100%;" class="image2" :src="image" alt="" v-if="i > 1" />
            </span>
          </div>
        </div>


        <div class="choices-wrapper" v-if="!(stage == 'show image' && questionType == 'Symbol Search')">
          <p v-for="choice in question?.choices" class="choice-text" :class="{ selectedChoice: (answers?.some((item: any) => { return item?.sub_section_name == sectionName && item?.question_id == question?.id && item?.choice_id == choice?.id })) }" :key="choice" @click="() => {
            $emit('answer', {
              section_name: sectionName,
              question_id: question?.id,
              choice_id: choice?.id,
            });
          }
            ">
            <span>{{ selectLang(choice?.choice) }}</span>
            <img v-if="choice?.image" :src="choice?.image" class="image_choice" alt="" />
          </p>
        </div>
      </div>
    </div>

    <div class="button-container">
      <Button :label="selectLang(translationModule.next)" v-if="!(questionType == 'Symbol Search' && stage == 'show image') && lang.getLang == 'en'" @click="() => {

        scrollTop();

        if (!showNext) { $emit('finish') } else { $emit('next'); }
      }
        " icon="pi pi-arrow-right" iconPos="right" />
      <Button :label="selectLang(translationModule.next)" v-if="!(questionType == 'Symbol Search' && stage == 'show image') && lang.getLang == 'ar'" @click="() => {

        scrollTop();

        if (!showNext) { $emit('finish') } else { $emit('next'); }
      }
        " icon="pi pi-arrow-left" iconPos="right" />
    </div>
  </div>
</template>

<style scoped>
.image_container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;

}

@keyframes mymove {
  from {
    top: 80vh
  }

  to {
    top: 10vh;
    opacity: 0;
  }
}

.emoj {
  font-size: 2rem;
  color: antiquewhite;
  position: relative;
  animation: mymove 2.5s;
  position: absolute;

}

@keyframes imageMove {
  0% {
    scale: 0
  }

  80% {
    scale: 1.05
  }

  100% {
    scale: 1
  }
}

img {
  width: 80%;
  border-radius: 0.5rem;
  animation: imageMove 0.5s;
}

.image2 {
  width: 38%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.image_choice {
  width: 40%;
  aspect-ratio: 1.6;
  object-fit: contain;
}

.container {
  padding-top: 2rem;
  padding-inline: 5%;
  margin-bottom: 5rem;
}


h3 {
  width: fit-content;
  color: var(--accent2);
  margin: 0;
}

.button-container {
  display: flex;
  justify-content: end;
}

button {
  width: 10rem;
  font-size: 1.25rem;
  margin-top: 2rem
}

.question {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.question-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  gap: 0;
  width: 100%;
}

.choices-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
}

.choice-text {
  border: 4px solid var(--choiceBackgroundColor);
  border-radius: 0.5rem;
  width: 100%;
  cursor: pointer;
  font-weight: 400;
  padding: 0.5rem 1rem;
  color: var(--header);
}

.question {
  display: flex;
  flex-direction: column;
  align-items: center;

}

h1 {
  color: var(--accent1);
  text-align: center;
  margin: 0;
  padding: 0;
  width: 100%;
  line-height: 2rem;
  margin-bottom: 2rem;
}

.selectedChoice {
  border-color: var(--accent4);
  color: var(--primary);
  transition-duration: 0.5s;
}

.select-lang {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

h4,
p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
}

span {
  font-weight: 600;
  color: var(--header);
}

p {
  flex-direction: row;
}

@media screen and (min-width:1150px) {
  .question {
    display: grid;
    grid-template-columns: 62fr 38fr;
  }

  .question-text {
    justify-content: start;
    height: 100%;
    padding-inline: 5%;
  }

  .choices-wrapper {
    width: 100%;
    padding-inline: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
  }

  img {
    width: 75%;
  }

  button {
    margin-top: 2rem;
  }
}
</style>
