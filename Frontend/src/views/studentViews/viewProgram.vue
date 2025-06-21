<script setup lang="ts">
import Navbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import CourseCard from "@/components/general/CourseCard.vue";
import TrackCard from "@/components/general/TrackCard.vue";
import Button from "primevue/button";
import { HttpRequester } from "@/lib/APICaller";
import { selectLang, translationModule } from "@/lib/Translate";
import "primeicons/primeicons.css";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { type Track, type Program, type TwoLang } from "@/lib/Interfaces";

const route = useRoute();
const router = useRouter();
const programs = ref<Program[]>([]);
const courses = ref<{ id: string, image: string, title: TwoLang, price: number }[]>([])
const selectedPlan = ref<any>(null)
const subscriptionPlanId = computed(() => {
  return route.params?.subscriptionPlanId
})


const selectedProgramId = computed(() => {
  return route.params.programId;
});
const selectedTrackId = ref<number | null>(null)

const programRequester = new HttpRequester("get_all_programs_and_courses");
programRequester.callApi().then((res) => {
  if (res?.success) {
    programs.value = res?.data?.programs;
  }
});

const subscriptionPlansRequester = new HttpRequester('get_subscription_plans')
subscriptionPlansRequester.callApi({ program_id: selectedProgramId.value }).then(res => { 
  if(res?.success && res?.data){
    if(subscriptionPlanId.value){
      selectedPlan.value = res.data?.subscription_plan?.find((sub:any )=>{return sub.id == subscriptionPlanId.value} )
      console.log(selectedPlan.value)
    }
  }
})
const coursesRequester = new HttpRequester("get_courses");
coursesRequester.callApi().then((res) => {
  if (res?.success) {
    courses.value = res?.data?.courses;
  }
});



const selectedProgram = computed((): Program | undefined => {
  for (let program of programs.value) {
    if (program?.id == selectedProgramId.value) {
      if (program?.tracks && program?.tracks.length > 0)
        selectedTrackId.value = program.tracks[0].id
      return program;
    }
  }
});
const selectedLevelCourses = computed(() => {
  const selectedLevel = selectedProgram.value?.tracks?.filter(track => track.id == selectedTrackId.value)[0]
  let coursesIds: string[] = selectedLevel?.courses ?? []
  let trackCourses = []
  for (let v of selectedLevel?.levels ?? []) {
    coursesIds.push(...v.courses ?? [])
  }
  trackCourses = coursesIds.map(id => courses.value.find(course => { return course.id == id }))
  return trackCourses
});
</script>

<template>
  <main>
    <Navbar />
    <Options />
    <div id="program_container">
      <h1>{{ selectLang(selectedProgram?.title) }}</h1>
      <div id="track_image">
        <img :src="selectLang(selectedProgram?.image)" alt="">

        <!-- <div id="sub_card">
          <div class="left_group">
            <h2  v-if="selectedPlan && selectedPlan.price" >{{ selectLang(translationModule.subscribeFor) }}</h2>
            <h2 v-else>{{ selectLang(translationModule.selectPlan) }}</h2>
            <h2 v-if="selectedPlan && selectedPlan.price" style="color: var(--accent1);">{{ selectedPlan.price }} EGP</h2>
          </div>
          <Button :label="selectLang(translationModule.subscribe)" :pt="{ label: { style: 'font-weight: 700' } }" />
        </div> -->
      </div>
      <div id="track_info">
        <h2>{{ selectLang(translationModule.trackDesc) }}</h2>
        <p>{{ selectLang(selectedProgram?.description) }}</p>
      </div>

      <div id="levels_container">

        <div class="level_name" v-for="level in selectedProgram?.tracks" @click="selectedTrackId = level.id" :class="{ selected: (level.id == selectedTrackId) }"> {{ selectLang(level.title) }} </div>
      </div>

      <div class="level_courses">
        <div id="track_info">
          <h2>{{ selectLang(translationModule.aboutLevel) }}</h2>
          <p>{{selectLang(selectedProgram?.tracks?.find(track => track?.id == selectedTrackId)?.description)}}</p>
        </div>
        <h2>{{ selectLang(translationModule.courses) }}</h2>
        <div class="courses">
          <div class="course_card" v-for="course in selectedLevelCourses">
            <img :src="course?.image" alt="">
            <div class="course_info">
              <p>{{ selectLang(course?.title) }}</p>
              <div class="course_price_view">
                <strong style="font-size: 1.5rem;">{{ course?.price }}</strong>
                <Button :label="selectLang(translationModule.viewCourse)" raised @click="router.push(`/courseDetails/${course?.id}/0/0`)" />
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
    <Footer />
  </main>
</template>

<style scoped>
p {
  margin: 0;
}

#program_container {
  width: 90%;
  margin-top: 4rem;
  margin-inline: auto;
}

h1 {
  color: var(--header);
}

#track_image {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
}

#track_image>img {
  width: clamp(20rem, 60vw, 60rem);
  border-radius: 4rem;
  display: inline-block;
}

#track_info {
  width: clamp(20rem, 80vw, 100rem);
}

#sub_card {
  border: 1px var(--borderColor) solid;
  padding: 1.25rem;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.05);
  width: clamp(20rem, 25vw, 30rem);

  height: fit-content;
  border-radius: 1rem;
}

#sub_card>* {
  margin: 0;
}

#sub_card>button {
  margin-top: 1.75rem;
  width: 100%;
}


h2 {
  color: var(--accent2);
  margin-bottom: 0;
}

#levels_container {
  width: clamp(24rem, 80%, 80rem);
  border: 1px var(--accent1) solid;
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-inline: auto;
  margin-block: 2rem;
}

.level_name {
  width: 15rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--accent1);
  border-radius: 1rem;
}

.selected {
  background-color: var(--accent1);
  color: var(--primary);
}

.courses {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 4rem;
}

.course_card {
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem;
  width: clamp(20rem, 25vw, 25rem);
}

.course_card img {
  width: 100%;
  aspect-ratio: 1.5 / 1;
  display: inline-block;

  border-radius: 1rem;
}

.course_info p {
  border-bottom: 1px var(--borderColor) solid;
}

.course_price_view {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

@media screen and (max-width: 1400px) {
  #track_image>img {
    width: 100%
  }

  #track_info {
    width: 100%
  }

  #sub_card {
    width: 100%;
  }

  .left_group {
    display: flex;
    justify-content: space-between;
  }



}
</style>
