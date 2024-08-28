<script lang="ts" setup>
import Navbar from "@/components/general/Navbar.vue";
import Options from "@/components/general/Options.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import { selectLang, translationModule } from "@/lib/Translate";
import { useRouter, useRoute } from "vue-router";
import { ref,computed } from "vue";
import Button from "primevue/button";
const router = useRouter();
const route = useRoute();

const selectedCourse = ref();
const courseRequester = new HttpRequester("get_course_free_lessons");

courseRequester.callApi({ course_id: route.params?.courseId }).then((res) => {
  if (res?.success) {
    selectedCourse.value = res?.data;
  }
});

const isEnrolled=computed(()=>{
  if(route.params?.isEnrolled){
    return route.params?.isEnrolled
  }
  return 0
})
const childId=computed(()=>{
  if(route.params?.childId){
    return route.params?.childId
  }
  return 0
})
</script>

<template>
  <Navbar />
  <Options />
  <div class="main-container">
    <h1>{{ selectLang(selectedCourse?.course?.title) }}</h1>
    <div class="course-container">
      <h2>{{ selectLang(selectedCourse?.lesson?.title) }}</h2>
      <p>{{ selectLang(selectedCourse?.lesson?.description) }}</p>
<div class="frame-wrapper">
    <iframe
        :src="selectedCourse?.lesson?.source"
        frameborder="0"
        sandbox="allow-scripts allow-same-origin"
        allowfullscreen
      ></iframe>
      
</div>
    
    </div>
    <Button :label="selectLang(translationModule.viewCourse)" @click="router.push(`/courseDetails/${route.params?.courseId}/${childId}/${isEnrolled}`)"/>
   
  </div>

  <Footer />
</template>

<style scoped>
.main-container {
  min-height: 80vh;
  padding-inline: 5rem;
  margin-bottom: 5rem;
}
.course-container {
  padding-inline: 5rem;
}
h1 {
  width: fit-content;
  color: var(--accent2);
  border-bottom: 0.4rem solid var(--accent3);
  padding: 0;
  border-radius: 0.5rem;
  line-height: 2rem;
  margin-top: 3rem;
}
.courses-container {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  margin-block: 5rem;
  width: 100%;
}
iframe {
  width: 50%;
  aspect-ratio: 16/9;
  border-radius: 8px;
}
.frame-wrapper{
    display: flex;
    justify-content: center;
}
h2{
    color: var(--accent1);
}
p{
    color: var(--text);
}
</style>
