<script lang="ts" setup>
import Navbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import { selectLang, translationModule } from "@/lib/Translate";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

const router = useRouter();
const courses = ref();
const coursesRequester = new HttpRequester("get_all_courses_with_free_lessons");

coursesRequester.callApi().then((res) => {
  if (res?.success) {
    courses.value = res?.data?.courses;
  }
});
const search = ref('')
</script>

<template>
  <Navbar />
  <Options />
  <div class="main-container">
    <h1>{{ selectLang(translationModule.freeLessons) }}</h1>
    <InputText
        class="search"
        v-model="search"
        :placeholder="selectLang(translationModule.searchCourses)"
      />
    <div class="courses-container">
      <div class="courseCard" v-for="course in courses">
        <div class="container" v-if="selectLang(course?.title)?.toLowerCase().includes(search.toLowerCase())">
          <img :src="course?.image" alt="" />
          <h2>{{ selectLang(course?.title) }}</h2>
          <Button
            @click="
              router.push(`/freeLesson/${course?.id}/${course?.lesson?.Id}`)
            "
            :label="selectLang(translationModule.viewFreeLesson)"
          />
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
.main-container {
  min-height: 80vh;
  padding-inline: 4rem;
  width: 100%;
}
h1{
    width: fit-content;
    color: var(--accent2);
    padding: 0;
    border-radius:0.5rem;
    line-height: 2rem; 
    margin-top: 3rem;
}
.courses-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  justify-content: center;
  margin-block: 5rem;
  width: 100%;
}

.container {
  width: fit-content;
  display: flex;
  flex-direction: column;
}

button {
  align-self: end;
}
.search {
  width: 62.5%;
  display: block;
  margin-inline: auto;
}
.courseCard{
    width: fit-content;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}
h2{
    color: var(--header);
    margin: 0;
    padding-left: 0.5rem;
    font-size: 1rem
}
button{
    align-self: end;
}
img{
    width: 16rem;
    aspect-ratio: 1.6/1;
    border-radius: 8px;
}
</style>
