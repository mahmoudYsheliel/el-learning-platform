<script setup lang="ts">
import Navbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import CourseCard from "@/components/general/CourseCard.vue";
import TrackCard from "@/components/general/TrackCard.vue";
import InputText from "primevue/inputtext";
import { HttpRequester } from "@/lib/APICaller";
import { selectLang, translationModule } from "@/lib/Translate";
import "primeicons/primeicons.css";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const programs = ref<any[]>([]);
const selectedProgramId = computed(() => {
  return route.params.programId;
});

const programRequester = new HttpRequester("get_all_programs_and_courses");
programRequester.callApi().then((res) => {
  if (res?.success) {
    programs.value = res?.data?.programs;
  }
});
const selectedProgram = computed(() => {
  for (let program of programs.value) {
    if (program?.id == selectedProgramId.value) {
      return program;
    }
  }
});
const search = ref("");
</script>

<template>
  <main>
    <Navbar />
    <Options />

    <div class="container">
      <InputText class="search" v-model="search" :placeholder="selectLang(translationModule.searchCourses)" />
      <div class="programs-wrapper">
        <h4 v-for="program in programs" @click="router.push(`/programs/${program?.id}`)" :class="{ selected: program.id == selectedProgramId }">
          {{ selectLang(program?.title) }}
        </h4>
      </div>

      <div class="header-description">
        <div class="header">
          <h1>
            {{ selectLang(selectedProgram?.title) }} (Age:
            {{ selectedProgram?.min_age }} - {{ selectedProgram?.max_age }})
          </h1>
        </div>
        <div class="description">
          <p>{{ selectLang(selectedProgram?.description) }}</p>
          <div>
            <img :src="selectedProgram?.image" alt="" class="image" />
          </div>
        </div>
      </div>
      <div class="content">
        <h1>
          <img style="width: 1.5rem; margin-right: 0.5rem" src="/images/pen.svg" alt="" />
          {{ selectLang(translationModule.startJourney) }}
        </h1>

        <div class="courses_tracks_container" v-if="selectedProgram?.tracks?.length>0">
          <h2>{{ selectLang(translationModule.tracks) }}</h2>
          <div class="courses_tracks">
            <TrackCard v-for="track,i in selectedProgram?.tracks" :track="track" :program-id="selectedProgramId" :track-id="i" :search="search" />
          </div>
        </div>

        <div class="courses_tracks_container" v-if="selectedProgram?.courses?.length>0">
          <h2>{{ selectLang(translationModule.courses) }}</h2>
          <div class="courses_tracks">
            <CourseCard v-for="course in selectedProgram?.courses" :course="course" :search="search" />
          </div>
        </div>

      </div>
    </div>

    <Footer />
  </main>
</template>

<style scoped>
.search {
  width: 62.5%;
  margin-top: 5rem;
  display: block;
  margin-inline: auto;
}
h2{
  color: var(--accent2);
  padding-inline: 2rem;
  font-size: 2rem;
}
.programs-wrapper {
  width: 40%;
  min-width: 20rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: auto;
  opacity: 0.67;
}

.programs-wrapper>h4 {
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
}

.selected {
  color: var(--accent1);
  transition-duration: 0.5s;
}

.header-description {
  margin-inline: 5rem;
}

.header-description>p {
  max-width: 80rem;
  color: var(--text);
}

.header {
  display: flex;
  gap: 0.5rem;
}

h3 {
  opacity: 0.7;
}

h1 {
  color: var(--accent1);
  width: fit-content;
  padding: 0;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.courses_tracks {
  display: flex;
  gap: 4rem;
  padding: 1rem 2rem;
  margin-bottom: 0rem;
  margin-inline: auto;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
}
.courses_tracks_container{
  width: 100%;

}

.description {
  display: flex;
  gap: 15rem;
  margin-bottom: 2rem;
}

.image {
  border-radius: 1rem;
  width: 20rem;
  aspect-ratio: 1.6/1;
  object-fit: cover;
}

@media screen and (max-width: 1500px) {
  .description {
    gap: 5rem;
  }
}

@media screen and (max-width: 1000px) {
  .description {
    flex-direction: column-reverse;
    gap: 1rem;
    width: 90%;
  }

  .header-description {
    margin-inline: 2rem;
  }

  .image {
    width: 100%;
  }
}
</style>
