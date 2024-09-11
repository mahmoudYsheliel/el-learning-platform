<script setup lang="ts">
import { HttpRequester } from "@/lib/APICaller";
import "primeicons/primeicons.css";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import { useRouter } from "vue-router";
const prop = defineProps(["showDialog", "materialType", "bteLabel"]);

const missing = ref(false);
const titleEn = ref();
const titleAr = ref();
const descriptionEn = ref();
const descriptionAr = ref();
const imageURL = ref();
const price = ref();
const minAge = ref();
const maxAge = ref();
const objectives = ref<any[]>([]);
const router = useRouter()

function removeObjective(i: number) {
  objectives.value.splice(i, 1);
}
function addObjective() {
  
  objectives.value.push({
    en:'English Objective',
    ar:'الهدف بالعربية'
  });
}
addObjective();

function addCourse() {
  if (
    !titleEn.value ||
    !titleAr.value ||
    !descriptionEn.value ||
    !descriptionAr.value ||
    !price.value ||
    !imageURL.value ||
    !minAge.value ||
    !maxAge.value
  ) {
    missing.value = true;
  } else {
    const createCourseRequester = new HttpRequester("create_course");
    let data = {
      new_course: {
        title:{
          en:titleEn.value,
          ar:titleAr.value
        },
        description:{
          en:descriptionEn.value,
          ar:descriptionAr.value
        },
        price:price.value,
        min_age:minAge.value,
        max_age:maxAge.value,
        objectives:objectives.value,
        image: imageURL.value,
      },
    };
    createCourseRequester.callApi(data).then((res) => {
      if (res.success) {
        router.push(`/editCourse/${res?.data?.course_id}`)
      }
    });
  }
}
function addCategory() {
  if (
    !titleEn.value ||
    !titleAr.value ||
    !descriptionEn.value ||
    !descriptionAr.value ||
    !imageURL.value
  ) {
    missing.value = true;
  } else {
    const createCategoryRequester = new HttpRequester("create_category");
    let data = {
      new_category: {
        category:{
          en:titleEn.value,
          ar:titleAr.value
        },
        description:{
          en:descriptionEn.value,
          ar:descriptionAr.value
        },
        image: imageURL.value,
      },
    };
    createCategoryRequester.callApi(data).then((res) => {
      if (res.success) {
        router.push(`/editCategory/${res?.data?.category_id}`)
      }
    });
  }
}
function addProgram() {
  if (
    !titleEn.value ||
    !titleAr.value ||
    !descriptionEn.value ||
    !descriptionAr.value ||
    !imageURL.value ||
    !minAge.value ||
    !maxAge.value
  ) {
    missing.value = true;
  } else {
    const createProgramRequester = new HttpRequester("create_program");
    let data = {
      new_program: {
        title:{
          en:titleEn.value,
          ar:titleAr.value
        },
        description:{
          en:descriptionEn.value,
          ar:descriptionAr.value
        },
        min_age:minAge.value,
        max_age:maxAge.value,
        image: imageURL.value,
        
      },
    };
    createProgramRequester.callApi(data).then((res) => {
      if (res.success) {
        router.push(`/editProgram/${res?.data?.program_id}`)
      }
    });
  }
}
function addPlan() {
  if (
    !titleEn.value ||
    !titleAr.value ||
    !descriptionEn.value ||
    !descriptionAr.value ||
    !price.value ||
    !imageURL.value ||
    !minAge.value ||
    !maxAge.value
  ) {
    missing.value = true;
  } else {
    const createPlanRequester = new HttpRequester("create_plan");
    let data = {
      new_plan: {
        name:titleEn.value,
        title:{
          en:titleEn.value,
          ar:titleAr.value
        },
        description:{
          en:descriptionEn.value,
          ar:descriptionAr.value
        },
        price:price.value,
        min_age:minAge.value,
        max_age:maxAge.value,
        image: imageURL.value,
        objectives:objectives.value,
      },
    };
    createPlanRequester.callApi(data).then((res) => {
      if (res.success) {
        router.push(`/editPlan/${res?.data?.plan_id}`)
      }
    });
  }
}


function addMaterialType(){
  if(prop.materialType=='Plans'){
    addPlan()
  }else  if(prop.materialType=='Programs'){
    addProgram()
  }else  if(prop.materialType=='Categories'){
    addCategory()
  }else if(prop.materialType=='Courses'){
    addCourse()
  }


}
</script>

<template>
  <Dialog
    v-model:visible="prop.showDialog"
    modal
    style="width: 80%"
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
  >
    <template #container="{ closeCallback }">
      <main>
        <div class="dialog">
          <h2
            v-if="missing"
            style="text-align: center; color: red; font-weight: 700"
          >
            Some Fields Are Missing
          </h2>
          <div class="element">
            <h4>English Title</h4>
            <InputText v-model="titleEn" />
          </div>
          <div class="element">
            <h4>Arabic Title</h4>
            <InputText v-model="titleAr" />
          </div>
          <div class="element">
            <h4>English Description</h4>
            <Textarea v-model="descriptionEn" />
          </div>
          <div class="element">
            <h4>Arabic Description</h4>
            <Textarea v-model="descriptionAr" />
          </div>

          <div class="element">
            <h4>Image Url</h4>
            <InputText v-model="imageURL" />
          </div>
          <div
            v-if="
              materialType == 'Courses' ||
              materialType == 'Programs' ||
              materialType == 'Plans'
            "
            class="element"
          >
            <h4>Min Age</h4>
            <InputNumber class="num" v-model="minAge" />
          </div>
          <div
            v-if="
              materialType == 'Courses' ||
              materialType == 'Programs' ||
              materialType == 'Plans'
            "
            class="element"
          >
            <h4>Max Age</h4>
            <InputNumber class="num" v-model="maxAge" />
          </div>
          <div
            v-if="materialType == 'Courses' || materialType == 'Plans'"
            class="element"
          >
            <h4>Price (EGP)</h4>
            <InputNumber class="num" v-model="price" />
          </div>
          <div v-if="materialType == 'Courses' || materialType == 'Plans'" class="element">
            <h4>Objectives</h4>
            <div class="objectives">
              <div v-for="(objective, i) in objectives" class="objective">
                <InputText v-model="objectives[i].en" />
                <InputText v-model="objectives[i].ar" />
                <i
                  style="cursor: pointer"
                  @click="
                    () => {
                      removeObjective(i);
                    }
                  "
                  class="pi pi-times-circle"
                ></i>
              </div>
              <Button
                style="width: fit-content; font-size: 0.75rem"
                label="Add Objective"
                @click="addObjective"
              />
            </div>
          </div>
          <div class="btn-container">
            <Button
              :label="$props.bteLabel"
              style="font-size: 1rem; margin-top: 2rem"
              @click="addMaterialType"
            />

            <Button
              label="Cancel"
              style="font-size: 1rem; margin-top: 2rem"
              @click="
                () => {
                  $emit('removeDialog');
                }
              "
            />
          </div>
        </div>
      </main>
    </template>
  </Dialog>
</template>

<style scoped>
main {
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

main::-webkit-scrollbar {
  display: none;
}
.dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 90%;
  margin-inline: auto;
  padding-block: 2rem;
}
h2 {
  color: var(--accent1);
  margin: 0;
  padding: 0;
}
.element {
  display: flex;
  align-items: start;
  width: 100%;
}
.element > :first-child {
  width: 12rem;
  color: var(--text);
}
.element > :last-child {
  width: calc(100% - 15rem);
}
.btn-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
}
.objectives {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.objective {
  width: 90%;
  display: flex;
  gap: 1rem;
  align-items: center;
}
.objective > :first-child {
  width: 100%;
}
</style>
