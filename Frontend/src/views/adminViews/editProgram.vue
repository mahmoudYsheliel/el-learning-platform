<script lang="ts" setup>
import Nanbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import { useRoute, useRouter } from "vue-router";
import { programObject } from "@/lib/Modules";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import "primeicons/primeicons.css";
import { ref, reactive } from "vue";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';


const route = useRoute();
const router = useRouter();
const programRequester = new HttpRequester("get_program");
const coursesRequester = new HttpRequester("get_courses");
const program = ref();
const courses = ref<any[]>([]);

const roadMap = ref<any[]>([]);
const tracks = ref<any[]>([]);

const selectedTrack = ref()



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

          tracks.value = []
          for (let a = 0; a < program.value?.tracks?.length; a++) {
            let track = program.value?.tracks[a]
            for (let i = 0; i < track?.levels?.length; i++) {
              for (let j = 0; j < track?.levels[i]?.courses?.length; j++) {
                track.levels[i].courses[j] = courses.value?.find((course: any) => {
                  return course?.id == track.levels[i].courses[j]
                })
              }
            }

            for (let i = 0; i < track?.courses?.length; i++) {
              track.courses[i] = courses.value?.find((course: any) => {
                return course?.id == track?.courses[i]
              })
            }
            tracks.value.push(track)
          }

        }
      });
  }
});

function addCourse() {
  roadMap.value.push({ course: null });
}
function addTrack() {
  tracks.value.push({
    title: {
      en: 'New Track',
      ar: ''
    },
    description: {
      en: '',
      ar: ''
    },
    female_image: '',
    male_image: '',
    image: '',
    video: '',
    levels: [],
    courses: []
  });
  selectedTrack.value = tracks.value[tracks.value?.length - 1]
}
function addTrackLevel() {

  selectedTrack.value?.levels.push({
    title: {
      en: 'New Level',
      ar: ''
    },
    courses: []
  });
}
function addTrackCourse() {

  selectedTrack.value?.courses.push({
    course: null
  });
}
function addLevelCourse(levelOrder: number) {

  selectedTrack.value?.levels[levelOrder]?.courses.push({
    course: null
  });
}
function deleteCourse(index: number) {
  roadMap.value.splice(index, 1);
}
function deleteTrack() {
  let index = -1
  for (let i =0;i<tracks.value.length;i++){
    if ( tracks.value[i]?.title.en == selectedTrack.value?.title?.en){
      index=i
    }
  }
  tracks.value.splice(index, 1);
  selectedTrack.value = tracks.value[0]
}

function updateProgram() {
  let updatedRoadMap = [];
  for (let i = 0; i < roadMap.value.length; i++) {
    updatedRoadMap.push({
      id: roadMap.value[i]?.course?.id,
    });
  }
  let updated_tracks = []




  for (let a = 0; a < tracks.value?.length; a++) {
    let track = tracks.value[a]
    for (let i = 0; i < track?.levels?.length; i++) {
      for (let j = 0; j < track?.levels[i]?.courses?.length; j++) {
        track.levels[i].courses[j] = courses.value?.find((course: any) => {
          return course?.id == track.levels[i].courses[j].id
        })?.id
      }
    }

    for (let i = 0; i < track?.courses?.length; i++) {
      track.courses[i] = courses.value?.find((course: any) => {
        return course?.id == track?.courses[i]
      })?.id
    }
    updated_tracks.push(track)
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
      tracks: updated_tracks
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
    <TabView>
      <TabPanel>
        <template #header>
          <div class="tab_header">
            <i class="pi pi-info"></i>
            <p> Basic Info </p>
          </div>
        </template>
        <div class="tab_container">
          <div class="element" v-for="element in programObject">
            <h3>{{ element.label }}</h3>
            <component :type="element.inputType" :is="element.component" v-model="element.variable" />
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="tab_header">
            <i class="pi pi-bars"></i>
            <p> Tracks</p>
          </div>
        </template>
        <div class="tab_container">
          <div class="tracks">
            <div class="btn-container">
              <Button @click="addTrack" icon="pi pi-plus-circle" label="Add Track" />
            </div>
            <div class="element" style="margin-bottom: 0.5rem;">
              <h3>Select Track</h3>
              <Dropdown v-model="selectedTrack" :options="tracks" optionLabel="title.en" placeholder="Select a track" />
            </div>
            <div class="track_container" v-if="selectedTrack" style="border-top: 2px solid var(--text);padding-top: 1rem;">
              <div class="btn-container">
              <Button @click="deleteTrack()" icon="pi pi-times-circle" label="Delete Track" style="background-color: red;"/>
            </div>
              <div class="element">
                <h4>English Title</h4>
                <InputText v-model="selectedTrack.title.en" />
              </div>
              <div class="element">
                <h4>Arabic Title</h4>
                <InputText v-model="selectedTrack.title.ar" />
              </div>
              <div class="element">
                <h4>English Description</h4>
                <Textarea v-model="selectedTrack.description.en" />
              </div>
              <div class="element">
                <h4>Arabic Description</h4>
                <Textarea v-model="selectedTrack.description.ar" />
              </div>
              <div class="images">
                <div class="image">
                  <h4>Female Image</h4>
                  <InputText v-model="selectedTrack.female_image" />
                  <img :src="selectedTrack.female_image" alt="">
                </div>
                <div class="image">
                  <h4>Male Image</h4>
                  <InputText v-model="selectedTrack.male_image" />
                  <img :src="selectedTrack.male_image" alt="">
                </div>
                <div class="image">
                  <h4>Image</h4>
                  <InputText v-model="selectedTrack.image" />
                  <img :src="selectedTrack.image" alt="">
                </div>
                <div class="image">
                  <h4>Video</h4>
                  <InputText v-model="selectedTrack.video" />
                  <iframe v-if="selectedTrack.video" style="aspect-ratio: 1.75/1;" :src="selectedTrack.video" alt=""></iframe>
                </div>
              </div>
              <h3>Levels</h3>
              <TabView :scrollable="true">
                <TabPanel v-for="level, i in selectedTrack?.levels" :key="i">
                  <template #header>
                    {{ level.title.en }}
                  </template>
                  <div class="level_container">
                    <div class="element">
                      <h4>English Title</h4>
                      <InputText v-model="level.title.en" />
                    </div>
                    <div class="element">
                      <h4>Arabic Title</h4>
                      <InputText v-model="level.title.ar" />
                    </div>
                    <div class="btn-container">
                      <Button @click="addLevelCourse(i)" icon="pi pi-plus-circle" label="Add Level Course" style="font-size: 0.75rem; " />
                    </div>
                    <div v-for="(course, j) in level.courses" class="row">
                      <div class="courseelement">
                        <Dropdown v-model="level.courses[j]" :options="courses" optionLabel="title.en" placeholder="Select a Course" />
                        <i class="pi pi-times-circle" @click="() => {
                          level.courses.splice(j, 1);
                        }
                          "></i>
                      </div>
                    </div>


                    <div class="btn-container">
                      <Button @click="() => { selectedTrack?.levels?.splice(i, 1) }" icon="pi pi-times-circle" label="Delete Level" style=" background-color: red;" />
                    </div>

                  </div>
                  

                </TabPanel>
              </TabView>
              <div class="btn-container">
                    <Button @click="addTrackLevel()" icon="pi pi-plus-circle" label="Add Level" />
                  </div>



            </div>

          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="tab_header">
            <i class="pi pi-book"></i>
            <p> Courses</p>
          </div>
        </template>
        <div class="tab_container">
          <div>
            <div v-for="(roadMapStap, i) in roadMap" class="row">
              <div class="courseelement">
                <Dropdown v-model="roadMap[i].course" :options="courses" optionLabel="title.en" placeholder="Select a Course" />
                <i class="pi pi-times-circle" @click="() => {
                  deleteCourse(i);
                }
                  "></i>
              </div>
            </div>
            <div class="btn-container">
              <Button @click="addCourse" icon="pi pi-plus-circle" label="Add Course" />
            </div>
          </div>
        </div>
      </TabPanel>
    </TabView>

    <div class="btn-container">
      <Button @click="updateProgram" label="Save Changes" />
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

.level {
  border: 2px solid var(--text);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

h4 {
  color: var(--text);
  margin: 0;
}

.images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.image {
  display: flex;
  flex-direction: column;
}

.container {
  min-height: 80vh;
  width: 90%;
  margin-inline: auto;
  margin-bottom: 5rem;
}

.element {
  display: grid;
  grid-template-columns: 15rem calc(100% - 15rem);
  margin-bottom: 1rem;
}

textarea {
  height: 5rem;
}

img,
iframe {
  display: block;
  width: 62.5%;
  margin-block: 1rem;
  margin-inline: auto;
  border-radius: 0.5rem;
}

.row {
  padding: 0.5rem;
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
  justify-content: space-evenly;
  margin-block: 1rem;
}

.row>i {
  cursor: pointer;
  color: red;
}

.courseelement {
  display: grid;
  grid-template-columns: calc(100% - 5rem) 5rem;
  gap: 2rem;
}
</style>
