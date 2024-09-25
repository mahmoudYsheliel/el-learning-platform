<script lang="ts" setup>
import Nanbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import { useRoute, useRouter } from "vue-router";
import { programObject } from "@/lib/Modules";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import "primeicons/primeicons.css";
import { ref, reactive } from "vue";

const route = useRoute();
const router = useRouter();
const programRequester = new HttpRequester("get_program");
const coursesRequester = new HttpRequester("get_courses");
const program = ref();
const courses = ref<any[]>([]);

const roadMap = ref<any[]>([]);



coursesRequester.callApi({}).then((res) => {
  if (res?.success) {
    courses.value = res?.data?.courses;
    programRequester
      .callApi({ program_id: route.params?.programId })
      .then((res) => {
        if (res?.success) {
          program.value = res?.data?.program;

          programObject.value = {
            ...programObject.value,
            titleEn: {
              ...programObject.value.titleEn,
              variable: program.value?.title?.en || "",
            },
            titleAr: {
              ...programObject.value.titleAr,
              variable: program.value?.title?.ar || "",
            },
            descriptionEn: {
              ...programObject.value.descriptionEn,
              variable: program.value?.description?.en || "",
            },
            descriptionAr: {
              ...programObject.value.descriptionAr,
              variable: program.value?.description?.ar || "",
            },
            image: {
              ...programObject.value.image,
              variable: program.value?.image || "",
            },
            minAge: {
              ...programObject.value.minAge,
              variable: program.value?.min_age || "",
            },
            maxAge: {
              ...programObject.value.maxAge,
              variable: program.value?.max_age || "",
            },
          };



          roadMap.value = [];
          for (let i = 0; i < program.value?.road_map?.length; i++) {
            roadMap.value.push({
              course: courses.value.find((course) => {
                return course?.id == program.value?.road_map[i]?.id;
              }),
            });
          }
        }
      });
  }
});

function addCourse() {
  roadMap.value.push({ course: null });
}
function deleteCourse(index: number) {
  roadMap.value.splice(index, 1);
}

function updateProgram() {
  let updatedRoadMap = [];
  for (let i = 0; i < roadMap.value.length; i++) {
    updatedRoadMap.push({
      id: roadMap.value[i]?.course?.id,
    });
  }
  const data = {
    program_id: route.params?.programId,
    update: {
      title: {
        en: programObject.value.titleEn.variable,
        ar: programObject.value.titleAr.variable,
      },
      description: {
        en: programObject.value.descriptionEn.variable,
        ar: programObject.value.descriptionAr.variable,
      },
      min_age: programObject.value.minAge.variable,
      max_age: programObject.value.maxAge.variable,
      image: programObject.value.image.variable,
      road_map: updatedRoadMap,
    },
  };
  new HttpRequester("update_program").callApi(data).then((res) => {
    if (res?.success) {
      router.push("/manageCourses");
    }
  });
}
</script>

<template>
  <Nanbar />
  <div class="container">
    <div class="element" v-for="element in programObject">
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
        <div>
          <div v-for="(roadMapStap, i) in roadMap" class="row">
            <div class="courseelement">
              <Dropdown
                v-model="roadMap[i].course"
                :options="courses"
                optionLabel="title.en"
                placeholder="Select a Course"
              />
              <i
                class="pi pi-times-circle"
                @click="
                  () => {
                    deleteCourse(i);
                  }
                "
              ></i>
            </div>
          </div>
          <div class="btn-container">
            <i
              @click="addCourse"
              class="pi pi-plus-circle"
              label="Add Course to Road Map"
              style="font-size: 1.5rem; color: var(--accent1)"
            ></i>
          </div>
        </div>
      </AccordionTab>
    </Accordion>

    <div class="btn-container">
      <Button @click="updateProgram" label="Save Changes" />
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
  margin-bottom: 1rem;
}
textarea {
  height: 5rem;
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
  border-top: 4px solid var(--choiceBackgroundColor);
}
h3 {
  padding: 0;
  margin: 0;
  color: var(--accent1);
}
.btn-container {
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-bottom: 5rem;
}
i {
  cursor: pointer;
  color: red;
}
.courseelement {
  display: grid;
  grid-template-columns: calc(100% - 5rem) 5rem;
  gap: 2rem;
}
</style>
