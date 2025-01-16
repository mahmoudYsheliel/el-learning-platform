<script setup lang="ts">
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";
import { ref, watch } from "vue";
import "primeicons/primeicons.css";
import { HttpRequester } from "@/lib/APICaller";
import { type TwoLang, type Question } from "@/lib/Interfaces";


const title = ref<TwoLang>({ en: "", ar: "" });
const description = ref<TwoLang>({ en: "", ar: "" });

const duration = ref();
const lastQuestionNumber = ref();
const questions = ref<Question[]>([]);

function addQuestion() {
  questions.value.push({
    id: 0,
    question: { en: "", ar: "" },
    choices: [{ id: 0, choice: { en: "", ar: "" } }],
    correct_answer_id: 0,
  });
}
function addChoice(questionOrder: number) {
  questions.value[questionOrder].choices.push({
    id: 0,
    choice: { en: "", ar: "" },
  });
}
function deleteQuestion(questionOrder: number) {
  questions.value.splice(questionOrder, 1);
}

function deleteChoice(questionOrder: number, choiceOrder: number) {
  questions.value[questionOrder].choices.splice(choiceOrder, 1);
}

const prop = defineProps(["addMaterial", 'materialId']);
const emit = defineEmits(["info"]);

if (prop.materialId) {
  new HttpRequester("get_quiz")
    .callApi({ quiz_id: prop.materialId })
    .then((res) => {
      if (res?.success) {
        title.value = res?.data?.quiz?.title;
        description.value = res?.data?.quiz?.description;
        duration.value = res?.data?.quiz?.duration;
        questions.value = res?.data?.quiz?.questions;
      }
    });
}


watch(prop, () => {
  if (prop.addMaterial) {
    for (let i = 0; i < questions.value.length; i++) {
      questions.value[i].id = i + 1;
      for (let j = 0; j < questions.value[i].choices.length; j++) {
        questions.value[i].choices[j].id = j + 1;
      }
    }
    let mat = {
      title: title.value,
      description: description.value,
      questions: questions.value,
      duration: duration.value,
      last_question_number: questions.value.length
    };
    if (prop.materialId) {
      let data = {
        quiz_id: prop.materialId,
        update: mat,
      };
      new HttpRequester("update_quiz").callApi(data).then((res) => {
        if (res?.success) {
          emit("info", null);
        }
      });
    } else {
      let data = {
        new_quiz: mat,
      };
      new HttpRequester("create_quiz").callApi(data).then((res) => {
        if (res?.data?.quiz_id) {
          let info = {
            Id: res?.data?.quiz_id,
            title: { en: title.value.en, ar: title.value.ar },
          };
          emit("info", info);
        }
      });
    }
  }
});




import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = 'AIzaSyB6WTXMQsbP9QJCe1ymDInuXRQ0a_uk4uQ'

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 1,
  },
});
const chat = model.startChat({
  history: [],
});


const question = `I will send you a quiz and i want you to generate json file like this format:
{
  "title": {
    "en": " Quiz - History of Military Aviation",
    "ar": "اختبار - تاريخ الطيران العسكري"
  },
  "description": {
    "en": "Test your knowledge of the history of military aviation and its advancements through the ages!",
    "ar": "اختبر معلوماتك عن تاريخ الطيران العسكري وتطوراته عبر العصور!"
  },
  "questions": [
    {
      "id": 1,
      "question": {
        "en": "What was the first aerial vehicle used for military reconnaissance?",
        "ar": "ما هي وسيلة الطيران الأولى التي استخدمت للاستطلاع العسكري؟"
      },
      "choices": [
        {
          "id": 1,
          "choice": {
            "en": "Jet planes",
            "ar": "الطائرات النفاثة"
          }
        },
        {
          "id": 2,
          "choice": {
            "en": "Airships",
            "ar": "المناطيد"
          }
        },
        {
          "id": 3,
          "choice": {
            "en": "Helicopters",
            "ar": "الطائرات المروحية"
          }
        },
        {
          "id": 4,
          "choice": {
            "en": "Supersonic planes",
            "ar": "الطائرات الأسرع من الصوت"
          }
        }
      ],
      "correct_answer_id": 2
    },
    {
      "id": 2,
      "question": {
        "en": "Drones are part of modern warfare because they don’t put pilots' lives at risk.",
        "ar": "الطائرات بدون طيار (Drones) تعتبر جزءً من الحروب الحديثة لأنها لا تعرض حياة الطيارين للخطر"
      },
      "choices": [
        {
          "id": 1,
          "choice": {
            "en": "True",
            "ar": "صح"
          }
        },
        {
          "id": 2,
          "choice": {
            "en": "False",
            "ar": "خطأ"
          }
        }
      ],
      "correct_answer_id": 0
    },
  ],
  "duration": 15,
  "last_question_number": 6
}
  the quiz is:
`
const answer = ref('')

async function submitQuestion() {
  current_step.value = 'edit'
  const result = await chat.sendMessage(question + quiz.value);
  answer.value = result.response.text()
  let text = answer.value
  const match = text.match(/```json([\s\S]*?)```/);
  if (match) {
    const jsonString = match[1].trim();
    const jsonData = JSON.parse(jsonString);
    console.log(jsonData);
    title.value = jsonData?.title;
    description.value = jsonData?.description;
    duration.value = jsonData?.duration;
    questions.value = jsonData?.questions;
  } else {
    console.log("No JSON found.");
  }
}

const current_step = ref('smart')
const quiz = ref('')
</script>

<template>
  <div class="smart_extract" v-if="current_step == 'smart'">
    <div class="element">
      <h4>Smart Extraction</h4>
      <Textarea v-model="quiz" />
    </div>
    <Button @click="submitQuestion" label="Proceed" />
  </div>



  <div class="container" v-if="current_step == 'edit'">
    <div class="material-container">
      <div class="element">
        <h4>English Title</h4>
        <InputText v-model="title.en" />
      </div>
      <div class="element">
        <h4>Arabic Title</h4>
        <InputText v-model="title.ar" />
      </div>

      <div class="element">
        <h4>English Description</h4>
        <InputText v-model="description.en" />
      </div>
      <div class="element">
        <h4>Arabic Description</h4>
        <InputText v-model="description.ar" />
      </div>


      <div class="element">
        <h4>Duration</h4>
        <InputNumber v-model="duration" />
      </div>

      <div class="questions">
        <h4>Questions</h4>
        <div class="question" v-for="(question, i) in questions">
          <p>
            <span> Question {{ i + 1 }}</span>
            <i class="pi pi-times-circle" @click="() => {
              deleteQuestion(i);
            }
              " />
          </p>
          <div class="element-container">
            <div class="element">
              <span>En</span>
              <InputText v-model="question.question.en" />
            </div>

            <div class="element">
              <span>Ar</span>
              <InputText v-model="question.question.ar" />
            </div>
          </div>

          <div class="choices" v-for="(choice, j) in question.choices">
            <RadioButton v-model="question.correct_answer_id" :inputId="i.toString() + j.toString()" :name="i.toString()" :value="j + 1" />
            <label class="choice" :for="i.toString() + j.toString()">
              <p>
                <span> Choice {{ j + 1 }}</span>
                <i class="pi pi-times-circle" @click="() => {
                  deleteChoice(i, j);
                }
                  " />
              </p>

              <div class="element-container">
                <div class="element">
                  <span>En</span>
                  <InputText v-model="choice.choice.en" />
                </div>

                <div class="element">
                  <span>Ar</span>
                  <InputText v-model="choice.choice.ar" />
                </div>
              </div>
            </label>
          </div>

          <div class="btn-container">
            <Button label="Add Choice" style="font-size: 0.6rem" @click="() => {
              addChoice(i);
            }
              " />
          </div>
        </div>
        <div class="btn-container">
          <Button style="width: fit-content; font-size: 0.7rem" label="Add Question" @click="addQuestion" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  height: 100%;
  width: 90vw;
  overflow-y: scroll;
}

.container {
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.material-container {
  width: 100%;
}

.element {
  display: grid;
  grid-template-columns: 15rem calc(100% - 15rem);
  margin-bottom: 1rem;
}

.element-container>.element {
  margin-bottom: 0.25rem;
  grid-template-columns: 2rem calc(100% - 5rem);
}

h4,
p,
span {
  color: var(--accent1);
  margin-block: 0.5rem;
}

h2 {
  color: var(--accent1);
  margin: 0;
  padding: 0;
}

.btn-container {
  display: flex;
  justify-content: end;
  width: 100%;
}

.material-btns {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.question,
.choices {
  margin: 0.5rem;
  padding: 0.5rem;
}

.question {
  border: 2px solid var(--choiceBackgroundColor);
  border-radius: 0.5rem;
}

p {
  display: flex;
  justify-content: space-between;
}

.pi-times-circle {
  color: red;
  cursor: pointer;
}

.question {
  font-size: 0.75rem;
}

.question>p {
  padding: 0;
  margin: 0;
}

.element-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
