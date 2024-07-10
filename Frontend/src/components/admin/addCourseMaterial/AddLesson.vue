<script lang="ts" setup>
import { useToken, useMaterial } from "@/stores/token";

import { ref } from "vue";
import Button from "primevue/button";
import axios from "axios";
const emit = defineEmits(["selectedMode"]);
const title = ref("");
const description = ref("");
const source = ref("");
const missingData = ref(false);
const token = useToken();
const material = useMaterial();
function addLesson() {
  if (title.value && description.value && source.value) {
    axios
      .post(
        "http://127.0.0.1:8000/create_lesson",
        {
          new_lesson: {
            title: title.value,
            description: description.value,
            source: source.value,
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
          res.data.data.lesson_id,
          order + 1,
          title.value,
          "Lesson"
        );
      });
    emit("selectedMode", "selectMaterial");
  } else {
    missingData.value = true;
  }
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Add Lesson</h1>
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
          <h2 class="name">Source</h2>
          <input
            v-model="source"
            class="element"
            type="text"
            name="source"
            id="source"
            placeholder="Source"
          />
        </div>
        <Button @click="addLesson" label="Add Lesson" />
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
label {
  color: var(--text);
  font-size: 1.1rem;
  font-weight: bold;
}
button {
  padding-inline: 2rem;
  width: fit-content;
}
</style>
