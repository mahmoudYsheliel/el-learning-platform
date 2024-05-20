<script lang="ts" setup>
import Button from "primevue/button";
import Nanbar from "@/components/instructorHome/Nanbar.vue";
import axios from "axios";
import { ref } from "vue";
import { useToken } from "@/stores/token";
import { useRouter } from "vue-router";

const router = useRouter();
const date = new Date();
const token = useToken();
const title = ref();
const description = ref();
const imageURL = ref();
const price = ref();
const minAge = ref();
const maxAge = ref();
const duration = ref();
const objectives = ref<string[]>([""]);
const allCategories = ref();
const selectedCategories = ref<boolean[]>([]);
const missingData = ref(false);

const getCategories = async () => {
  axios.post("http://127.0.0.1:8000/get_categories", {}, {}).then((res) => {
    try {
      allCategories.value = res.data.data.categories;
      for (let cat of allCategories.value) {
        selectedCategories.value?.push(false);
      }
    } catch (err) {}
  });
};
getCategories();
function addCourse() {
  if (
    title.value &&
    description.value &&
    imageURL.value &&
    price.value &&
    minAge.value &&
    maxAge.value &&
    duration.value &&
    objectives.value.length > 1 &&
    selectedCategories.value.find((e) => e == true)
  ) {
    let selectedCats: any[] = [];
    for (let i = 0; i < selectedCategories.value.length; i++) {
      if (selectedCategories.value[i]) {
        selectedCats.push({
          Id: allCategories.value[i].id,
          title: allCategories.value[i].category,
        });
      }
    }
    axios
      .post(
        "http://127.0.0.1:8000/create_course",
        {
          new_course: {
            title: title.value,
            description: description.value,
            price: price.value,
            image: imageURL.value,
            categories: selectedCats,
            objectives: objectives.value,
            min_age: minAge.value,
            max_age: maxAge.value,
            duration: duration.value,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token.getToken}`,
          },
        }
      )
      .then((res) => {
        router.push(`/addCourseMaterial/${res.data.data.course_id}`);
      });
  } else {
    missingData.value = true;
  }
}
</script>

<template>
  <main>
    <Nanbar />
    <div class="container">
      <h1>Add Course Information</h1>

      <div class="wrapper">
        <h4 style="margin-inline: auto; color: red" v-if="missingData">
          Some Data Is Missing
        </h4>
        <div class="element-container">
          <h4 class="name">Title</h4>
          <input
            v-model="title"
            class="element"
            type="text"
            name="title"
            id="title"
          />
        </div>

        <div class="element-container">
          <h4 class="name">Description</h4>
          <textarea
            v-model="description"
            class="element"
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          ></textarea>
        </div>

        <div class="element-container">
          <h4 class="name">Image URL</h4>
          <input v-model="imageURL" class="element" type="text" />
        </div>

        <div class="element-container">
          <h4 class="name">Price</h4>
          <input v-model="price" class="element" type="number" />
        </div>

        <div class="element-container">
          <h4 class="name">Minimum Age</h4>
          <input v-model="minAge" class="element" type="number" />
        </div>

        <div class="element-container">
          <h4 class="name">Maximum Age</h4>
          <input v-model="maxAge" class="element" type="number" />
        </div>

        <div class="element-container">
          <h4 class="name">Duration</h4>
          <input v-model="duration" class="element" type="number" />
        </div>

        <div class="element-container">
          <h4 class="name">Objectives</h4>
          <div class="objectives">
            <div
              v-for="(objective, i) in objectives"
              class="objective"
              :key="i"
            >
              <input v-model="objectives[i]" class="element" type="text" />
              <i
                class="pi pi-times-circle"
                @click="objectives.splice(i, 1)"
                style="padding-left: 1rem; color: red"
              ></i>
            </div>
            <i class="pi pi-plus-circle" @click="objectives.push('')"></i>
          </div>
        </div>

        <div class="element-container">
          <h4 class="name">Categories</h4>
          <div class="objectives">
            <div v-for="(cat, i) in allCategories" class="category">
              <input
                type="checkbox"
                :id="cat.id"
                :name="cat.id"
                v-model="selectedCategories[i]"
              />
              <label :for="cat.id">{{ cat.category }}</label>
            </div>
          </div>
        </div>
        <Button @click="addCourse" label="Add Course" />
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
h4 {
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

  gap: 0.5rem;
}
.element {
  width: 90%;
}
.objectives {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
i {
  font-size: 1.5rem;
  color: var(--accent2);
  cursor: pointer;
  align-self: flex-end;
}
input,
textarea {
  width: 100%;
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
  color: var(--text);
}
textarea {
  resize: none;
}
input[type="checkbox"] {
  width: fit-content;
}
.category {
  display: flex;
  gap: 1rem;
}
Button {
  font-size: 1.25rem;
  padding-inline: 2rem;
  width: fit-content;
  margin-top: 2rem;
}
</style>
