<script setup lang="ts">
import { HttpRequester } from "@/lib/APICaller";
import "primeicons/primeicons.css";
import Dialog from "primevue/dialog";
import {variableObject} from '@/lib/Modules'
import Button from "primevue/button";
import { useRouter } from "vue-router";
import {
  type TwoLang,
  type UpdatProgramCourseCategoryPlan,
} from "@/lib/Interfaces";
const prop = defineProps(["showDialog", "materialType", "bteLabel"]);

const router = useRouter();


function addMaterialType() {
  let updateObject = { API: "", object: {} };
  let objectVar: UpdatProgramCourseCategoryPlan = {};
  let API = "";
  objectVar.description = {
    en: variableObject.value.descriptionEn.variable,
    ar: variableObject.value.descriptionAr.variable,
  };
  objectVar.image = variableObject.value.imageURL.variable;
  if (prop.materialType == "Categories") {
    objectVar.category = {
      en: variableObject.value.titleEn.variable,
      ar: variableObject.value.titleAr.variable,
    };
    API = "create_category";
    updateObject = { API: API, object: { new_category: objectVar } };
  } else if (
    prop.materialType == "Courses" ||
    prop.materialType == "Plans" ||
    prop.materialType == "Programs"
  ) {
    objectVar.max_age = Number(variableObject.value.maxAge.variable);
    objectVar.min_age = Number(variableObject.value.minAge.variable);
    objectVar.title = {
      en: variableObject.value.titleEn.variable,
      ar: variableObject.value.titleAr.variable,
    };
  }
  if (prop.materialType == "Plans") {
    API = "create_plan";
    objectVar.price = Number(variableObject.value.price.variable);
    updateObject = { API: API, object: { new_plan: objectVar } };
  }
  if (prop.materialType == "Programs") {
    API = "create_program";
    updateObject = { API: API, object: { new_program: objectVar } };
  }
  if (prop.materialType == "Courses") {
    API = "create_course";
    objectVar.price = Number(variableObject.value.price.variable);
    updateObject = { API: API, object: { new_course: objectVar } };
  }

  new HttpRequester(updateObject.API)
    .callApi(updateObject.object)
    .then((res: any) => {
      if (res?.success) {
        if (prop.materialType == "Plans") {
          router.push(`/editPlan/${res?.data?.plan_id}`);
        }
        if (prop.materialType == "Courses") {
          router.push(`/editCourse/${res?.data?.course_id}`);
        }
        if (prop.materialType == "Programs") {
          router.push(`/editProgram/${res?.data?.program_id}`);
        }
        if (prop.materialType == "Categories") {
          router.push(`/editCategory/${res?.data?.category_id}`);
        }
      }
    });
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
          <div
            v-for="(element, i) in variableObject"
            style="width: 100%; margin: 0; padding: 0"
          >
            <div class="element" v-if="element.forTypes.includes(materialType)">
              <h4>{{ element.label }}</h4>
              <component
                :type="element.inputType"
                :is="element.component"
                v-model="element.variable"
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
  width: 90%;
  margin-inline: auto;
  padding-block: 2rem;
}
h2 {
  color: var(--accent1);
  margin: 0;
  padding: 0;
}
h4 {
  padding: 0;
  margin-block: 0.5rem;
}
.element {
  display: flex;
  align-items: start;
  width: 100%;
  margin-bottom: 1rem;
}
.element > :first-child {
  width: 12rem;
  color: var(--accent1);
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
