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
import { ref,reactive } from "vue";

const route = useRoute();
const router = useRouter();
const courseRequester = new HttpRequester("get_course");
const categoriesRequester = new HttpRequester("get_categories");
const course = ref();
const categories = ref<any[]>([]);

const objectives = ref<any[]>([]);
const courseCategories = ref<any[]>([]);
const chapters = ref<any[]>([]);

categoriesRequester.callApi().then((res) => {
  if (res?.success) {
    categories.value = res?.data?.categories;
    courseRequester
      .callApi({ course_id: route.params?.courseId })
      .then((res) => {
        if (res?.success) {
          course.value = res?.data?.course;
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
      price: courseObject.value.price.variable,
      min_age: courseObject.value.minAge.variable,
      max_age: courseObject.value.maxAge.variable,
      image: courseObject.value.image.variable,
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
  setTimeout(()=>{
  chapters.value[chapterOrder.value].materials.push(info)},250)
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
</script>

<template>
  <AddMaterialDialog
    v-if="addMaterialDialog"
    :showDialog="addMaterialDialog"
    :material-type="materialType"
    :material-id="materialId"
    @removeDialog="addMaterialDialog = false"
    @info="
      (info) => {
        addMaterial(info);
      }
    "
  />
  <Nanbar />
  <div class="container">
    <div class="element" v-for="element in courseObject">
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
        <div class="btn-container">
          <Button @click="addObjective" label="Add Objective " />
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
        <div v-for="(category, i) in courseCategories" class="row">
          <div class="element">
            <span>Category</span>
            <Dropdown
              v-model="courseCategories[i]"
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
        <div class="btn-container">
          <Button @click="addCategory" label="Add Category " />
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
          <h3>Chapters</h3>
        </template>
        <Accordion>
          <AccordionTab
            class="row"
            v-for="(chapter, i) in chapters"
            :key="'chap' + i.toString()"
          >
            <template #header>
              <h3>Chapter {{ i + 1 }}</h3>
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
            <transition-group name="swap" tag="ul">
              <li
                class="row2 row"
                v-for="(material, j) in chapters[i].materials"
                :key="material"
              >
                <div class="options">
                  <i
                    class="pi pi-arrow-up"
                    style="color: var(--accent1)"
                    @click="moveUp(i, j)"
                  ></i>
                  <i
                    class="pi pi-arrow-down"
                    style="color: var(--accent1)"
                    @click="moveDown(i, j)"
                  ></i>
                </div>
                <div class="mat-group">
                  <div
                    v-for="(mask, k) in chaptersLabels"
                    :key="'mask' + i.toString() + j.toString() + k.toString()"
                  >
                    <div class="element">
                      <span>{{ mask.label }}</span>
                      <component
                        :key="
                          'com' +
                          i.toString() +
                          j.toString() +
                          k.toString() +
                          'a'
                        "
                        :is="mask.component"
                        :disabled="mask.disabled"
                        v-if="mask.mask2"
                        v-model="
                          chapters[i].materials[j][mask.mask1][mask.mask2]
                        "
                      />
                      <component
                        :key="
                          'com' +
                          i.toString() +
                          j.toString() +
                          k.toString() +
                          'b'
                        "
                        :is="mask.component"
                        :disabled="mask.disabled"
                        v-else
                        v-model="chapters[i].materials[j][mask.mask1]"
                      />
                    </div>
                  </div>
                  <div class="material-btns">
                    <Button
                      label="Edit"
                      @click="
                        materialId = material?.Id;
                        materialType = material?.type;
                        addMaterialDialog = true;
                        chapterOrder = i;
                      "
                    />
                    <Button
                      style="background-color: red"
                      label="delete"
                      @click="chapters[i]?.materials?.splice(j, 1)"
                    />
                  </div>
                </div>
              </li>
            </transition-group>

            <div style="display: flex; justify-content: end">
              <Button
                @click="
                  materialId = '';
                  materialType = '';
                  addMaterialDialog = true;
                  chapterOrder = i;
                "
                label="Add"
                style="margin-right: 2rem"
              />
            </div>
          </AccordionTab>
        </Accordion>
        <div class="btn-container">
          <Button label="Add Chapter" @click="addChapter" />
        </div>
      </AccordionTab>
    </Accordion>

    <div class="btn-container">
      <Button @click="updatecourse" label="Save Changes" />
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



.swap-enter-active, .swap-leave-active {
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
  position: relative; /* Ensures smooth moving of elements when swapping */
}
</style>
