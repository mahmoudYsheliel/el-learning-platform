<script lang="ts" setup>
import { ref } from "vue";
import Button from "primevue/button";
import axios from "axios";
import { useToken, useMaterial } from "@/stores/token";

const emit = defineEmits(["selectedMode"]);
const material = useMaterial();
const token = useToken();
interface Choice {
  id: number;
  choice: string;
  isRight: boolean;
}
interface Question {
  id: number;
  question: string;
  choices: Choice[];
  multicorrect: boolean;
}

interface QuestionCorrectAnwer {
  questions: Question;
  correctAnswer: string;
}

const title = ref();
const description = ref();
const duration = ref();
const missingData = ref(false);
const questions = ref<QuestionCorrectAnwer[]>([]);
function addQuestion() {
  questions.value?.push({
    questions: {
      id: questions.value.length,
      question: "Write The Question",
      choices: [
        {
          id: 0,
          choice: "Choice A",
          isRight: false,
        },
        {
          id: 1,
          choice: "Choice B",
          isRight: false,
        },
        {
          id: 2,
          choice: "Choice C",
          isRight: false,
        },
        {
          id: 3,
          choice: "Choice D",
          isRight: false,
        },
      ],
      multicorrect: false,
    },
    correctAnswer: "Choice A",
  });
}

function addQuiz() {
  if (
    title.value &&
    description.value &&
    duration.value &&
    questions.value.length > 0
  ) {
    let questionstToSend = [];
    for (let quest of questions.value) {
      quest.questions.choices.forEach((e) => {
        if (e.choice === quest.correctAnswer) {
          e.isRight = true;
        }
      });
      questionstToSend.push(quest.questions);
    }
    axios
      .post(
        "http://127.0.0.1:8000/create_quiz",
        {
          new_quiz: {
            title: title.value,
            description: description.value,
            duaration: duration.value,
            questions: questionstToSend,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token.getToken}`,
          },
        }
      )
      .then((res) => {
        let order = material.getMaterial.length;
        material.addMaterial(
          res.data.data.quiz_id,
          order + 1,
          title.value,
          "Quiz"
        );
        emit("selectedMode", "selectMaterial");
      });
  } else {
    missingData.value = true;
  }
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Add Quiz</h1>
      <div class="wrapper">
        <h2 style="margin-inline: auto; color: red" v-if="missingData">
          Some Data Is Missing
        </h2>
        <div class="element-container">
          <h2 class="name">Title</h2>
          <input
            v-model="title"
            class="element"
            type="text"
            name="title"
            id="title"
            placeholder="Title"
          />
        </div>
        <div class="element-container">
          <h2 class="name">Description</h2>
          <textarea
            v-model="description"
            class="element"
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
            placeholder="Description"
          />
        </div>
        <div class="element-container">
          <h2 class="name">Duration</h2>
          <input v-model="duration" type="number" placeholder="Duration" />
        </div>
        <div class="element-container">
          <h2 class="name">Questions</h2>
          <div class="questions-wrapper">
            <div class="question" v-for="(quest, i) in questions" :key="i">
              <input
                v-model="quest.questions.question"
                class="question"
                type="text"
                placeholder="The question"
              />
              <div
                class="choice"
                v-for="(choice, j) in quest.questions.choices"
              >
                <input
                  type="radio"
                  :name="quest.questions.question + quest.questions.id"
                  :value="choice.choice"
                  v-model="quest.correctAnswer"
                />
                <input
                  v-model="choice.choice"
                  class="choice"
                  type="text"
                  :placeholder="'choice' + j"
                />
              </div>
            </div>
            <Button @click="addQuestion" label="Add Question" />
          </div>
        </div>

        <Button @click="addQuiz" label="Add Quiz" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 90%;
  margin-inline: auto;
  margin-block: 2rem;
}
h1,
h2 {
  color: var(--text);
}
.wrapper {
  border-radius: 8px;
  border: 2px solid var(--primary);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 90%;
  margin-inline: auto;
  margin-block: 1rem;
}

.element-container {
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 1rem;
}
.element {
  width: 90%;
}
input,
textarea {
  width: 100%;
}
input[type="radio"] {
  width: 2rem;
}

input::placeholder,
textarea::placeholder {
  opacity: 0.5;
}
input:focus,
textarea:focus {
  outline-style: none;
  border: 2px var(--accent1) solid;
}
input,
textarea {
  border-radius: 4px;
  border: 2px solid var(--primary);
  padding: 0.5rem;
  font-size: 1.25rem;
  color: var(--text);
}
textarea {
  resize: none;
}
input[type="checkbox"] {
  width: fit-content;
}
.question {
  width: 90%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
.choice {
  width: 50%;
  margin-bottom: 0.5rem;
}

button {
  padding-inline: 2rem;
  width: fit-content;
}
</style>
