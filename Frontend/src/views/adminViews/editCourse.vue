<script lang="ts" setup>
import Nanbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import { useRoute, useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import { chaptersLabels, courseObject } from "@/lib/Modules";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import "primeicons/primeicons.css";
import AddMaterialDialog from "@/components/dialogs/AddMaterialDialog.vue";
import { ref, reactive } from "vue";
import RadioButton from "primevue/radiobutton";

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import RemoveChapterDialog from "@/components/dialogs/RemoveChapterDialog.vue";

const route = useRoute();
const router = useRouter();
const courseRequester = new HttpRequester("get_course");
const categoriesRequester = new HttpRequester("get_categories");
const course = ref();
const categories = ref<any[]>([]);

const objectives = ref<any[]>([]);
const courseCategories = ref<any[]>([]);
const chapters = ref<any[]>([]);
const isLocked = ref(false)

categoriesRequester.callApi().then((res) => {
  if (res?.success) {
    categories.value = res?.data?.categories;
    courseRequester
      .callApi({ course_id: route.params?.courseId })
      .then((res) => {
        if (res?.success) {
          course.value = res?.data?.course;
          isLocked.value = course.value?.is_locked ?? false
          courseObject.value = {
            ...courseObject.value,
            titleEn: {
              ...courseObject.value.titleEn,
              variable: course.value?.title?.en || "",
            },
            titleAr: {
              ...courseObject.value.titleAr,
              variable: course.value?.title?.ar || "",
            },
            descriptionEn: {
              ...courseObject.value.descriptionEn,
              variable: course.value?.description?.en || "",
            },
            descriptionAr: {
              ...courseObject.value.descriptionAr,
              variable: course.value?.description?.ar || "",
            },
            image: {
              ...courseObject.value.image,
              variable: course.value?.image || "",
            },
            minAge: {
              ...courseObject.value.minAge,
              variable: course.value?.min_age || "",
            },
            maxAge: {
              ...courseObject.value.maxAge,
              variable: course.value?.max_age || "",
            },
            price: {
              ...courseObject.value.price,
              variable: course.value?.price || "",
            },
            duration: {
              ...courseObject.value.duration,
              variable: course.value?.duration || "",
            },
          };

          for (let objective of course?.value.objectives) {
            objectives.value.push(objective);
          }
          for (let chapter of course?.value.chapters) {
            chapters.value.push(chapter);
          }
          for (let cat of course?.value.categories) {
            courseCategories.value.push(
              categories.value?.find((category) => {
                return category?.id == cat?.Id;
              })
            );
          }
        }
      });
  }
});

const materialId = ref("");
const materialType = ref("");

function addCategory() {
  courseCategories.value.push({
    Id: null,
    ristriction_on_course: null,
  });
}
function deleteCategory(index: number) {
  courseCategories.value.splice(index, 1);
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

function updatecourse() {
  let updatedcourseCategories = [];
  for (let i = 0; i < courseCategories.value.length; i++) {
    updatedcourseCategories.push({
      Id: courseCategories.value[i]?.id,
      title: courseCategories.value[i]?.category,
    });
  }
  const data = {
    course_id: route.params?.courseId,
    update: {
      title: {
        en: courseObject.value.titleEn.variable,
        ar: courseObject.value.titleAr.variable,
      },
      description: {
        en: courseObject.value.descriptionEn.variable,
        ar: courseObject.value.descriptionAr.variable,
      },
      chapters: chapters.value,
      categories: updatedcourseCategories,
      objectives: objectives.value,
      price: Number(courseObject.value.price.variable),
      min_age: Number(courseObject.value.minAge.variable),
      max_age: Number(courseObject.value.maxAge.variable),
      image: courseObject.value.image.variable,
      duration: Number(courseObject.value.duration.variable),
      is_locked: isLocked.value
    },
  };
  new HttpRequester("update_course").callApi(data).then((res) => {
    if (res?.success) {
      router.push("/manageCourses");
    }
  });
}

const addMaterialDialog = ref(false);
const chapterOrder = ref(-1);

function addMaterial(info: any) {
  setTimeout(() => {
    chapters.value[chapterOrder.value].materials.push(info)
  }, 250)
}

function addChapter() {
  chapters.value.push({ title: { en: "", ar: "" }, materials: [] });
}

function moveUp(chapterindex: number, matIndex: number) {
  if (matIndex > 0) {
    let tem = chapters.value[chapterindex].materials[matIndex - 1];
    chapters.value[chapterindex].materials[matIndex - 1] =
      chapters.value[chapterindex]?.materials[matIndex];
    chapters.value[chapterindex].materials[matIndex] = tem;
  }
}
function moveDown(chapterindex: number, matIndex: number) {
  if (matIndex < chapters.value[chapterindex]?.materials?.length - 1) {
    let tem = chapters.value[chapterindex]?.materials[matIndex + 1];
    chapters.value[chapterindex].materials[matIndex + 1] =
      chapters.value[chapterindex]?.materials[matIndex];
    chapters.value[chapterindex].materials[matIndex] = tem;
  }
}



function moveUpChapter(chapterindex: number) {
  let tem = chapters.value[chapterindex];
  chapters.value[chapterindex] = chapters.value[chapterindex - 1];
  chapters.value[chapterindex - 1] = tem;
}
function moveDownChapter(chapterindex: number) {
  let tem = chapters.value[chapterindex];
  chapters.value[chapterindex] = chapters.value[chapterindex + 1];
  chapters.value[chapterindex + 1] = tem;

}


const showDeleteChapter = ref(false)
const removeChapterIndex = ref(-1)
</script>

<template>
  <AddMaterialDialog v-if="addMaterialDialog" :showDialog="addMaterialDialog" :material-type="materialType" :material-id="materialId" @removeDialog="addMaterialDialog = false" @info="(info) => {
    addMaterial(info);
  }
  " />
  <RemoveChapterDialog :showDialog="showDeleteChapter" @hide-dialog="showDeleteChapter = false" @confirm="chapters.splice(removeChapterIndex, 1); showDeleteChapter = false" />
  <Nanbar />

  <div class="container">
   <Tabs value="0">
    <TabPanels>
      <TabList>
        <Tab value="0" as="div" class="flex items-center gap-2">
          <div class="tab_header">
            <i class="pi pi-info"></i>
            <p>Basic Info</p>
          </div>
        </Tab>
        <Tab value="1" as="div" class="flex items-center gap-2">
          <div class="tab_header">
            <i class="pi pi-align-justify"></i>
            <p>Categories</p>
          </div>
        </Tab>
        <Tab value="2" as="div">
          <div class="tab_header">
            <i class="pi pi-star"></i>
            <p>Objectives</p>
          </div>
        </Tab>
        <Tab value="3" as="div">
          <div class="tab_header">
            <i class="pi pi-book"></i>
            <p>Chapters</p>
          </div>
        </Tab>
      </TabList>

      <TabPanel value="0" as="div">

        <div class="tab_container">
          <div class="element" v-for="element in courseObject">
            <h3>{{ element.label }}</h3>
            <component :type="element.inputType" :is="element.component" v-model="element.variable" />
          </div>

          <div class="element">
            <h3>Is Locked</h3>

            <div style="display: flex; justify-content: space-around;">
              <div style="display: flex; justify-content: center; align-items: center; gap: 0.5rem;">
                <RadioButton v-model="isLocked" inputId="v1" name="isLocked" :value="true" />
                <label style="font-size: 1.25rem;" for="v1">Yes</label>
              </div>
              <div style="display: flex; justify-content: center; align-items: center; gap: 0.5rem;">
                <RadioButton v-model="isLocked" inputId="v2" name="isLocked" :value="false" />
                <label style="font-size: 1.25rem;" for="v2">No</label>
              </div>
            </div>
          </div>

        </div>
      </TabPanel>

      <TabPanel value="1" as="div">

        <div class="tab_container">
          <div v-for="(category, i) in courseCategories" class="row">
            <div style="display: grid; grid-template-columns: 3fr 1fr;gap: 1rem;">

              <Dropdown v-model="courseCategories[i]" :options="categories" optionLabel="category.en" />
              <Button @click="() => {
                deleteCategory(i);
              }
              " label="Remove" style="background-color: red" />
            </div>


          </div>
          <div class="btn-container">
            <Button @click="addCategory" label="Add Category " />
          </div>
        </div>
      </TabPanel>

      <TabPanel value="2" as="div">

        <div class="tab_container">
          <div v-for="(objective, i) in objectives" class="row">
            <div class="element">
              <span>English</span>
              <InputText v-model="objectives[i].en" />
            </div>
            <div class="element">
              <span>Arabic</span>
              <InputText v-model="objectives[i].ar" />
            </div>

            <Button @click="() => {
              deleteObjective(i);
            }
            " label="Remove" style="background-color: red" />
          </div>
          <div class="btn-container">
            <Button @click="addObjective" label="Add Objective " />
          </div>
        </div>
      </TabPanel>


      <TabPanel value="3" as="div">
     
        <div class="tab_container">

          <Accordion>

            <AccordionTab class="row" v-for="(chapter, i) in chapters" :key="'chap' + i.toString()">
              <template #header>
                <div style="display: flex;gap: 0.5rem;align-items: center;width: 80vw;">
                  <div class="options" style="gap: 0.5rem;">
                    <i class="pi pi-arrow-up" style="color: var(--accent1)" @click.stop="moveUpChapter(i)" v-if="i > 0"></i>
                    <i class="pi pi-arrow-down" style="color: var(--accent1)" @click.stop="moveDownChapter(i)" v-if="i < chapters.length - 1"></i>
                  </div>
                  <h3>{{ chapter.title.en }}</h3>
                  <icon @click.stop="showDeleteChapter = true; removeChapterIndex = i" class="pi pi-trash" style="color: red; margin-left: auto;margin-right: 0.5rem; font-size: 1.25rem;" />
                </div>

              </template>

              <div class="element">
                <span>English Title</span>
                <InputText v-model="chapters[i].title.en" />
              </div>
              <div class="element">
                <span>Arabic Title</span>
                <InputText v-model="chapters[i].title.ar" />
              </div>

              <h3>Materials</h3>
              <TransitionGroup name="swap" tag="dev">
                <li class="row2 row" v-for="(material, j) in chapters[i].materials" :key="material">
                  <div class="options">
                    <i class="pi pi-arrow-up" style="color: var(--accent1)" @click="moveUp(i, j)"></i>
                    <i class="pi pi-arrow-down" style="color: var(--accent1)" @click="moveDown(i, j)"></i>
                  </div>
                  <div class="mat-group">
                    <div v-for="(mask, k) in chaptersLabels" :key="'mask' + i.toString() + j.toString() + k.toString()">
                      <div class="element">
                        <span>{{ mask.label }}</span>
                        <component :key="'com' +
                          i.toString() +
                          j.toString() +
                          k.toString() +
                          'a'
                          " :is="mask.component" :disabled="mask.disabled" v-if="mask.mask2" v-model="chapters[i].materials[j][mask.mask1][mask.mask2]
                            " />
                        <component :key="'com' +
                          i.toString() +
                          j.toString() +
                          k.toString() +
                          'b'
                          " :is="mask.component" :disabled="mask.disabled" v-else v-model="chapters[i].materials[j][mask.mask1]" />
                      </div>
                    </div>
                    <div class="material-btns">
                      <Button label="Edit" @click="
                        materialId = material?.Id;
                      materialType = material?.type;
                      addMaterialDialog = true;
                      chapterOrder = i;
                      " />
                      <Button style="background-color: red" label="delete" @click="chapters[i]?.materials?.splice(j, 1)" />
                    </div>
                  </div>
                </li>
              </TransitionGroup>

              <div style="display: flex; justify-content: end">
                <Button @click="
                  materialId = '';
                materialType = '';
                addMaterialDialog = true;
                chapterOrder = i;
                " label="Add" style="margin-right: 2rem" />
              </div>
            </AccordionTab>
          </Accordion>
          <div class="btn-container">
            <Button label="Add Chapter" @click="addChapter" />
          </div>
        </div>

      </TabPanel>
      
    </TabPanels>
   </Tabs>

    <div class="btn-container">
      <Button @click="updatecourse" label="Save Changes" />
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.tab_header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

}

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
  margin-bottom: 5rem;
}

.material-btns {
  display: flex;
  justify-content: space-around;
}

.row2 {
  display: grid;
  grid-template-columns: 1rem calc(100% - 1rem);
  gap: 2rem;
}

.options {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 62%;
}



.swap-enter-active,
.swap-leave-active {
  transition: all 0.5s ease;
}

.swap-enter {
  opacity: 0;
  transform: translateY(100px);
}

.swap-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Leaving transitions */
.swap-leave {
  opacity: 1;
  transform: translateY(0);
}

.swap-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

/* This will handle moving/reordering animations */
.swap-move {
  transition: transform 0.5s ease;
}

.row {
  position: relative;
  /* Ensures smooth moving of elements when swapping */
}
</style>
