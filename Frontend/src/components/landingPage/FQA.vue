<script lang="ts" setup>
import "primeicons/primeicons.css";
import { ref } from "vue";

const selected = ref(-1);
const questions = [
  {
    id: 0,
    q: " What is Trace?",
    a: "Trace is an AI-powered e-learning website that personalizes the learning journey for children, making it fun, engaging, and effective.",
  },
  {
    id: 1,
    q: "Is Trace safe for my child?",
    a: "Absolutely! We prioritize child safety with secure logins, age-appropriate content, and no third-party advertising.",
  },
  {
    id: 2,
    q: "How much does Trace cost?",
    a: "Trace offers a variety of subscription plans to fit your needs. You can explore our pricing options on the website. ",
  },
  {
    id: 3,
    q: "How does Trace personalize learning?",
    a: "Trace provides a wide variety of interactive games, quizzes, simulations, and creative exercises. All powered by AI to adapt to your child's progress, making learning fun and effective.",
  },
  {
    id: 4,
    q: "IDoes Trace replace traditional schooling?",
    a: "No, Trace is designed to supplement traditional schooling by providing a fun and engaging way for children to practice skills, explore new topics, and reinforce learning.",
  },
  {
    id: 5,
    q: "How can I track my child's progress?",
    a: "You can access a personalized dashboard on Trace that shows your child's progress, strengths, and areas for improvement.",
  },
  {
    id: 6,
    q: "Does Trace provide feedback to my child?",
    a: "Yes, Trace uses AI to provide immediate feedback on your child's answers. It suggests areas for improvement and celebrates their achievements, fostering a sense of progress and helping them identify their strengths and weaknesses.",
  },
];

function flip(id: number) {
  if (id == selected.value) {
    selected.value = -1;
  } else if (id != selected.value) {
    selected.value = id;
  }
}

const height = ref(0);
const toggleHeight = () => {
  height.value = height.value === 0 ? 200 : 0; // Adjust target height as needed
};
</script>
<template>
  <main>
    <h1>Customers Ask</h1>
    <div class="container">
      <div v-for="quest in questions" class="question-container">
        <div
          @click="
            () => {
              flip(quest.id);
            }
          "
          class="question"
        >
          <p>{{ quest.q }}</p>

          <i v-if="selected != quest.id" class="pi pi-plus-circle"></i>
          <i v-if="selected == quest.id" class="pi pi-minus-circle"></i>
        </div>
        <div :class="{ show: selected == quest.id }" class="answer">
          {{ quest.a }}
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 80px;
  gap: 24px;
  transition-duration: 0.5s;
  color: var(--text);
}
.container {
  width: 61.75%;
  margin-inline: auto;
}
h1 {
  color: var(--accent1);
  font-size: 3rem;
  padding-bottom: 1rem;
}
.question {
  display: flex;
  justify-content: space-between;

  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.05);
  padding: 8px;
  border-radius: 8px;
}
.answer {
  padding-top: 16px;
  height: 0px;
  transition: height 0.5s ease-in-out;
  overflow: hidden;
  padding-left: 8px;
}
.show {
  height: 100px;
  border-radius: 8px;
}
</style>
