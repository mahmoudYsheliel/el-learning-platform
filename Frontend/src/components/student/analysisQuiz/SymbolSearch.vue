<script lang="ts" setup>
import Button from "primevue/button";
import { selectLang, translationModule } from "@/lib/Translate";
import { ref } from "vue";
import CountDown from "@/components/general/CountDown.vue";

const props = defineProps([
  "showPrevious",
  "showNext",
  "question",
  "answers",
  "selectedQuestionOrder",
  "sectionName",
  "audio_link",
  "leftTime",
  "duration",
]);

defineEmits(["previous", "next", "answer"]);

function scrollTop() {
  window.scrollTo(0, 0);
}
const lang = ref("en");
let questions = parseStringWithInversion(selectLang(props.question?.question));
let imageSrcs = parseStringWithInversion(props.question?.image);

function parseStringWithInversion(input: string | undefined) {
  if (input) {
    let reversedInput = input.split("").reverse().join("");
    let reversedParts = reversedInput.split("_____");
    let result = reversedParts
      .map((part) => part.split("").reverse().join(""))
      .filter((part) => part !== "");
    return result.reverse();
  }
  return "invalid";
}

let stage = "show image"; // or show options
setTimeout(() => {
  stage = "show options";
}, 5000);
</script>

<template>
  <div class="container">
    <div style="display: flex; justify-content: space-between">
      <h1>
        {{ selectLang(translationModule.question) }}
        {{ selectedQuestionOrder + 1 }}
      </h1>
      <CountDown :total-time="duration" :remaining-time="leftTime" />
    </div>
    <div class="question" v-if="stage == 'show image'">
      <h4 class="question-text">
        {{ questions[0] }}
        <div class="img-cont" style="display: flex; gap: 2rem;">
          <img :src="imageSrcs[0]" alt="" />
          <img :src="imageSrcs[1]" alt="" />
        </div>
      </h4>
    </div>
    <div class="question-container" v-if="stage == 'show options'">
      <div class="question">
        <h4 class="question-text">
          {{ questions[1] }}
          <div class="img-cont">
            <img :src="imageSrcs[2]" alt="" />
          </div>
        </h4>
        <div class="choices-wrapper">
          <p
            v-for="choice in question?.choices"
            class="choice-text"
            :class="{selectedChoice:(answers?.some((item:any)=>{return item?.sub_section_name==sectionName && item?.question_id==question?.id && item?.choice_id==choice?.id}))}"
            :key="choice"
            @click="
              () => {
                $emit('answer', {
                  section_name: sectionName,
                  question_id: question?.id,
                  choice_id: choice?.id,
                });
              }
            "
          >
            <span>{{ selectLang(choice?.choice) }}</span>
            <img v-if="choice?.image" :src="choice?.image" alt="" />
          </p>
        </div>
      </div>
    </div>

    <div class="button-container">
      <Button
        :label="selectLang(translationModule.prev)"
        @click="
          () => {
            scrollTop();
            $emit('previous');
          }
        "
        :disabled="!showPrevious"
        style="visibility: hidden;"
      />
      <Button
        :label="selectLang(translationModule.next)"
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
.container {
  padding-top: 2rem;
}
h4 > img {
  min-width: 20rem;
}
h1 {
  width: fit-content;
  line-height: 1.5rem;
  color: var(--accent1);
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
.langs {
  display: flex;
  gap: 1rem;
  color: var(--text);
}
.langs > .selected {
  color: var(--accent1);
}
.langs > p {
  cursor: pointer;
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
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-direction: column;
}
p {
  flex-direction: row;
}
img {
  animation: forwards mymove 0.5s;
  border-radius: 0.5rem;
  background-color: white;
  height: 5rem;
}
@keyframes mymove {
  from {
    scale: 0;
  }
  to {
    scale: 1;
  }
}
</style>
