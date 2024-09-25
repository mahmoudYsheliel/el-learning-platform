<script setup lang="ts">
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";
import "primeicons/primeicons.css";
import AddSimulation from "../dialogs/AddSimulation.vue";
import AddQuiz from "../dialogs/AddQuiz.vue";
import AddLesson from "../dialogs/AddLesson.vue";
import AddAcitivity from "../dialogs/AddActivity.vue";
import AddProject from "../dialogs/AddProject.vue";

const prop = defineProps(["showDialog",'materialId','materialType']);
const emit = defineEmits(["removeDialog", "info"]);

const materialType = ref(prop.materialType);
const allTypes = ["Lesson", "Quiz", "Activity", "Simulation", "Project"];

const addLesson = ref(false);
const addQuiz = ref(false);
const addActivity = ref(false);
const addProject = ref(false);
const addSimulation = ref(false);

function addMaterial() {
  if (materialType.value == "Lesson") {
    addLesson.value = true;
  }
  if (materialType.value == "Quiz") {
    addQuiz.value = true;
  }
  if (materialType.value == "Activity") {
    addActivity.value = true;
  }
  if (materialType.value == "Simulation") {
    addSimulation.value = true;
  }
  if (materialType.value == "Project") {
    addProject.value = true;
  }
}

function matAdded(info: any) {
  if(info){
    let materialAdded = {
    Id: info?.Id,
    order: 0,
    title: info?.title,
    type: materialType.value,
  };
  emit("info", materialAdded);
  }

  emit("removeDialog", true);
}
</script>

<template>
  <Dialog
    v-model:visible="prop.showDialog"
    modal
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
  >
    <template #container="{ closeCallback }">
      <div class="dialog">
        <div class="container">
          <Dropdown
          v-if="!materialType"
            v-model="materialType"
            :options="allTypes"
            placeholder="Material Type"
          />

          <div class="material-container">
            <AddQuiz
              v-if="materialType == 'Quiz'"
              :add-material="addQuiz"
              :material-id="materialId"
              @info="
                (info) => {
                  matAdded(info);
                }
              "
            />
            <AddLesson
              v-if="materialType == 'Lesson'"
              :add-material="addLesson"
              :material-id="materialId"
              @info="
                (info) => {
                  matAdded(info);
                }
              "
            />
            <AddAcitivity
              v-if="materialType == 'Activity'"
              :add-material="addActivity"
              :material-id="materialId"
              @info="
                (info) => {
                  matAdded(info);
                }
              "
            />
            <AddSimulation
              v-if="materialType == 'Simulation'"
              :add-material="addSimulation"
              :material-id="materialId"
              @info="
                (info) => {
                  matAdded(info);
                }
              "
            />
            <AddProject
              v-if="materialType == 'Project'"
              :add-material="addProject"
              :material-id="materialId"
              @info="
                (info) => {
                  matAdded(info);
                }
              "
            />
          </div>

          <div class="material-btns">
            <Button label="Save Changes" @click="addMaterial" />
            <Button
              style="background-color: red"
              label="Cancel"
              @click="
                () => {
                  $emit('removeDialog');
                }
              "
            />
          </div>
        </div>
      </div>
    </template>
  </Dialog>
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
.element-container > .element {
  margin-bottom: 0.25rem;
  grid-template-columns: 2rem calc(100% - 5rem);
}
h4,
p,
span {
  color: var(--text);
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
.question > p {
  padding: 0;
  margin: 0;
}
.element-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
