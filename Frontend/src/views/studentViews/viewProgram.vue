<script setup lang="ts">
import Navbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import CourseCard from "@/components/general/CourseCard.vue";
import InputText from "primevue/inputtext";
import { useRouter, useRoute } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";

import "primeicons/primeicons.css";

import { ref, computed, watch } from "vue";

const programs = ref();
const selectedProgram = ref();

const router = useRouter();
const route = useRoute();
const items = ref<any[]>([]);

const path = computed(() => {
  return route.params.programId;
});
watch(path, () => {
  requests();
});

function requests() {
  items.value = [];
  programs.value = null;
  const programRequester = new HttpRequester("get_all_program");
  const selectedProgramRequester = new HttpRequester("get_program");
  programRequester.callApi().then((res) => {
    programs.value = res.data.program;
    if (programs.value) {
      for (let program of programs.value) {
        items.value.push({
          id: program.id,
          label: program.title,
          command: () => {
            router.push(`/programs/${program.id}`);
          },
        });
      }
    }
  });
  selectedProgramRequester
    .callApi({ program_id: route.params.programId })
    .then((res) => {
      selectedProgram.value = res.data.program;
    });
}
requests();
const search = ref("");
</script>

<template>
  <main>
    <Navbar />

    <div class="container">
      <InputText
        class="search"
        v-model="search"
        placeholder="Search course . . ."
      />
      <div class="programs-wrapper">
        <h4
          v-for="item in items"
          @click="item?.command"
          :class="{ selected: item.id == route.params.programId }"
        >
          {{ item?.label }}
        </h4>
      </div>

      <div class="header-description">
        <div class="header">
          <h1>{{ selectedProgram?.title }}</h1>
          <h3>({{ selectedProgram?.age_group }})</h3>
        </div>
        <div class="description">
          <p>{{ selectedProgram?.description }}</p>
          <img :src="selectedProgram?.image" alt="" />
        </div>
      </div>
      <div class="content">
        <h1 style="margin-block: 6rem 4rem">
          <img
            style="width: 1.5rem; margin-right: 0.5rem"
            src="/images/pen.svg"
            alt=""
          />
          Start your Journey
        </h1>
        <div class="courses">
          <CourseCard
            v-for="course in selectedProgram?.road_map"
            :programId="course.id"
            :search="search"
          />
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
.programs-wrapper {
  width: 40%;
  min-width: 20rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: auto;
  opacity: 0.67;
}
.programs-wrapper > h4 {
  cursor: pointer;
}
.selected {
  color: var(--accent1);
}
.header-description {
  margin-left: 5rem;
}
.header-description > p {
  margin-left: 5rem;
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
  border-bottom: 0.25rem solid var(--accent3);
  width: fit-content;
  padding: 0;
  line-height: 2rem;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.courses {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4rem;
  width: 80%;
  margin-bottom: 10rem;
}
.description {
  display: flex;
  padding-right: 10rem;
  gap: 15rem;
}
img {
  border-radius: 1rem;
  width: 20rem;
}
@media screen and (max-width: 1500px) {
  .description {
    gap: 5rem;
    padding-right: 5rem;
  }
}
@media screen and (max-width: 1000px) {
  .description {
    flex-direction: column-reverse;
    width: 90%;
  }
  img {
    width: 100%;
  }
}
</style>
