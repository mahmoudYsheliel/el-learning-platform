<script lang="ts" setup>
import Nanbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import { useRoute, useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import { planObject } from "@/lib/Modules";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { ref, reactive } from "vue";
import "primeicons/primeicons.css";

const route = useRoute();
const router = useRouter();
const planRequester = new HttpRequester("get_plan");
const coursesRequester = new HttpRequester("get_courses");
const categoriesRequester = new HttpRequester("get_categories");
const plan = ref();
const courses = ref<any[]>([]);
const categories = ref<any[]>([]);

const roadMap = ref<any[]>([]);
const objectives = ref<any[]>([]);
const planCategories = ref<any[]>([]);



categoriesRequester.callApi().then((res) => {
  if (res?.success) {
    categories.value = res?.data?.categories;
    coursesRequester.callApi({}).then((res) => {
      if (res?.success) {
        courses.value = res?.data?.courses;
        planRequester.callApi({ plan_id: route.params?.planId }).then((res) => {
          if (res?.success) {
            plan.value = res?.data?.plan;
            planObject.value = {
            ...planObject.value,
            titleEn: {
              ...planObject.value.titleEn,
              variable: plan.value?.title?.en || "",
            },
            titleAr: {
              ...planObject.value.titleAr,
              variable: plan.value?.title?.ar || "",
            },
            descriptionEn: {
              ...planObject.value.descriptionEn,
              variable: plan.value?.description?.en || "",
            },
            descriptionAr: {
              ...planObject.value.descriptionAr,
              variable: plan.value?.description?.ar || "",
            },
            image: {
              ...planObject.value.image,
              variable: plan.value?.image || "",
            },
            minAge: {
              ...planObject.value.minAge,
              variable: plan.value?.min_age || "",
            },
            maxAge: {
              ...planObject.value.maxAge,
              variable: plan.value?.max_age || "",
            },
            price: {
              ...planObject.value.price,
              variable: plan.value?.price || "",
            },
          };

          
            for (let objective of plan?.value.objectives) {
              objectives.value.push(objective);
            }
            for (let cat of plan?.value.categories) {
              planCategories.value.push(
                categories.value?.find((category) => {
                  return category?.id == cat?.Id;
                })
              );
            }
            roadMap.value = [];
            for (let i = 0; i < plan.value?.courses?.length; i++) {
              roadMap.value.push({
                course: courses.value.find((course) => {
                  return course?.id == plan.value?.courses[i]?.Id;
                }),
                restriction: courses.value.find((course) => {
                  return (
                    course?.id == plan.value?.courses[i]?.ristriction_on_course
                  );
                }),
              });
            }
          }
        });
      }
    });
  }
});

function addCourse() {
  roadMap.value.push({
    restriction: null,
    course: null,
  });
}
function deleteCourse(index: number) {
  roadMap.value.splice(index, 1);
}

function addCategory() {
  planCategories.value.push({
    Id: null,
    ristriction_on_course: null,
  });
}
function deleteCategory(index: number) {
  planCategories.value.splice(index, 1);
}

function addObjective() {
  objectives.value.push({
    en: null,
    ar: null,
  });
}
function deleteObjective(index: number) {
  objectives.value.splice(index, 1);
}

function updateplan() {
  let updatedRoadMap = [];
  for (let i = 0; i < roadMap.value.length; i++) {
    updatedRoadMap.push({
      Id: roadMap.value[i]?.course?.id,
      ristriction_on_course: roadMap.value[i]?.restriction?.id,
    });
  }
  let updatedPlanCategories = [];
  for (let i = 0; i < planCategories.value.length; i++) {
    updatedPlanCategories.push({
      Id: planCategories.value[i]?.id,
      title: planCategories.value[i]?.category,
    });
  }
  const data = {
    plan_id: route.params?.planId,
    update: {
      name: planObject.value.titleEn.variable,
      title: {
        en: planObject.value.titleEn.variable,
        ar: planObject.value.titleAr.variable,
      },
      description: {
        en: planObject.value.descriptionEn.variable,
        ar: planObject.value.descriptionAr.variable,
      },
      courses: updatedRoadMap,
      categories: updatedPlanCategories,
      objectives: objectives.value,
      price: planObject.value.price.variable,
      min_age: planObject.value.minAge.variable,
      max_age: planObject.value.maxAge.variable,
      image: planObject.value.image.variable,
    },
  };
  new HttpRequester("update_plan").callApi(data).then((res) => {
    if (res?.success) {
      router.push("/manageCourses");
    }
  });
}
</script>

<template>
  <Nanbar />
  <div class="container">
    <div class="element" v-for="element in planObject">
      <h3>{{ element.label }}</h3>
      <component
        :type="element.inputType"
        :is="element.component"
        v-model="element.variable"
      />
    </div>

    <Accordion :activeIndex="0">
      <AccordionTab
        :pt="{
          headerAction: {
            style: 'padding-inline:0',
          },
        }"
      >
        <template #header>
          <h3>Road Map</h3>
        </template>
        <div v-for="(roadMapStap, i) in roadMap" class="row">
          <div class="element">
            <span>Course</span>
            <Dropdown
              v-model="roadMap[i].course"
              :options="courses"
              optionLabel="title.en"
              placeholder="Select a Course"
            />
          </div>
          <div class="element">
            <span>Prequsite</span>
            <Dropdown
              v-model="roadMap[i].restriction"
              :options="courses"
              optionLabel="title.en"
              placeholder="Select a Course"
            />
          </div>

          <Button
            @click="
              () => {
                deleteCourse(i);
              }
            "
            label="Remove"
            style="background-color: red"
          />
        </div>
        <div class="btn-container" style="margin-right: 2rem">
          <i class="pi pi-plus-circle" @click="addCourse" style="font-size: 1.5rem; color: var(--accent1);" />
        </div>
      </AccordionTab>

      <AccordionTab
        :pt="{
          headerAction: {
            style: 'padding-inline:0',
          },
        }"
      >
        <template #header>
          <h3>Objectives</h3>
        </template>
        <div v-for="(objective, i) in objectives" class="row">
          <div class="element">
            <span>English</span>
            <InputText v-model="objectives[i].en" />
          </div>
          <div class="element">
            <span>Arabic</span>
            <InputText v-model="objectives[i].ar" />
          </div>

          <Button
            @click="
              () => {
                deleteObjective(i);
              }
            "
            label="Remove"
            style="background-color: red"
          />
        </div>
        <div class="btn-container" style="margin-right: 2rem">
          <i class="pi pi-plus-circle" @click="addObjective" style="font-size: 1.5rem; color: var(--accent1);" />

        </div>
      </AccordionTab>

      <AccordionTab
        :pt="{
          headerAction: {
            style: 'padding-inline:0',
          },
        }"
      >
        <template #header>
          <h3>Categories</h3>
        </template>
        <div v-for="(category, i) in planCategories" class="row">
          <div class="element">
            <span>Category</span>
            <Dropdown
              v-model="planCategories[i]"
              :options="categories"
              optionLabel="category.en"
            />
          </div>

          <Button
            @click="
              () => {
                deleteCategory(i);
              }
            "
            label="Remove"
            style="background-color: red"
          />
        </div>
        <div class="btn-container" style="margin-right: 2rem">
          <i class="pi pi-plus-circle" @click="addCategory" style="font-size: 1.5rem; color: var(--accent1);" />

        </div>
      </AccordionTab>
    </Accordion>

    <div class="btn-container">
      <Button
        @click="updateplan"
        label="Save Changes"
        style="margin-top: 2rem;"
      />
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.container {
  min-height: 80vh;
  width: 90%;
  margin-inline: auto;
  margin-block: 5rem;
}
.element {
  display: grid;
  grid-template-columns: 15rem calc(100% - 15rem);
  margin-bottom: 0.5rem;
}
textarea {
  height: 10rem;
}
img {
  display: block;
  width: 62.5%;
  margin-block: 1rem;
  margin-inline: auto;
  border-radius: 0.5rem;
}
.row {
  padding: 1rem;
  border-top: 2px solid var(--choiceBackgroundColor);
}
h3 {
  padding: 0;
  margin: 0;
  color: var(--accent1);
}
span {
  color: var(--text);
}
.btn-container {
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-bottom: 3rem;
}
</style>
