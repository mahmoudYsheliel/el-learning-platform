<script lang="ts" setup>
import Nanbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import { useRoute, useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const programRequester = new HttpRequester("get_program");
const coursesRequester = new HttpRequester("get_courses");
const program = ref();
const courses = ref<any[]>([]);

const titleEn = ref();
const titleAr = ref();
const descriptionEn = ref();
const descriptionAr = ref();
const imageURL = ref();
const minAge = ref();
const maxAge = ref();
const roadMap = ref<any[]>([]);

coursesRequester.callApi({}).then((res) => {
  if (res?.success) {
    courses.value = res?.data?.courses;
    programRequester
      .callApi({ program_id: route.params?.programId })
      .then((res) => {
        if (res?.success) {
          program.value = res?.data?.program;
          titleEn.value = program.value?.title?.en;
          titleAr.value = program.value?.title?.ar;
          descriptionEn.value = program.value?.description?.en;
          descriptionAr.value = program.value?.description?.ar;
          imageURL.value = program.value?.image;
          minAge.value = program.value?.min_age;
          maxAge.value = program.value?.max_age;
          roadMap.value = [];
          for (let i = 0; i < program.value?.road_map?.length; i++) {
            roadMap.value.push({
              start: program.value?.road_map[i]?.week_start,
              end: program.value?.road_map[i]?.week_end,
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
  roadMap.value.push({
    start: 0,
    end: 0,
    course: null,
  });
}
function deleteCourse(index:number){
    roadMap.value.splice(index, 1);
}

function updateProgram(){
    let updatedRoadMap=[]
    for (let i=0;i< roadMap.value.length ; i++){
        updatedRoadMap.push({
            id: roadMap.value[i]?.course?.id,
            week_start:roadMap.value[i]?.start,
            week_end:roadMap.value[i]?.end
        })
    }
    const data ={
        program_id:route.params?.programId,
        update:{
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
            image:imageURL.value,
            road_map:updatedRoadMap
        }
    }
    new HttpRequester('update_program').callApi(data).then(res=>{
        if(res?.success){
router.push('/manageCourses')
        }
    })
}
</script>

<template>
  <Nanbar />
  <div class="container">
    <div class="element">
      <h3>English Title</h3>
      <InputText v-model="titleEn" />
    </div>

    <div class="element">
      <h3>Arabic Title</h3>
      <InputText v-model="titleAr" />
    </div>

    <div class="element">
      <h3>English Description</h3>
      <Textarea v-model="descriptionEn" />
    </div>

    <div class="element">
      <h3>Arabic Description</h3>
      <Textarea v-model="descriptionAr" />
    </div>

    <div class="element">
      <h3>Image Sourse</h3>
      <InputText v-model="imageURL" />
    </div>
    <img :src="imageURL" alt="" />

    <div class="element">
      <h3>Min Age</h3>
      <InputText v-model="minAge" />
    </div>

    <div class="element">
      <h3>Max Age</h3>
      <InputText v-model="maxAge" />
    </div>
    <h3>Road Map</h3>

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
        <span>Start Week</span>
        <InputNumber v-model="roadMap[i].start" />
      </div>
      <div class="element">
        <span>End Week</span>
        <InputNumber v-model="roadMap[i].end" />
      </div>
      <Button @click="()=>{deleteCourse(i)}" label="Remove From Road Map" style="background-color: red;"/>
    </div>
    <div class="btn-container">
      <Button @click="addCourse" label="Add Course to Road Map" />
      <Button @click="updateProgram" style="font-size: 1.25rem" label="Save Changes" />
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
  border-top: 4px solid var(--choiceBackgroundColor);
}
h3 {
  padding: 0;
  margin: 0;
  color: var(--text);
}
span {
  color: var(--text);
}
.btn-container {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 5rem;
}
</style>
