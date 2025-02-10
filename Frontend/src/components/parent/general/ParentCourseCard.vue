<script lang="ts" setup>
import Button from "primevue/button";
import { HttpRequester } from "../../../lib/APICaller";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { selectLang,translationModule } from "@/lib/Translate";


const prop = defineProps(["programId",'childId','isEnrolled']);
const router = useRouter()
const course = ref();
const courseRequester = new HttpRequester("get_course");
courseRequester
  .callApi({ course_id: prop.programId })
  .then((res) => (course.value = res?.data?.course));
  
</script>

<template>
  <main>
    <div class="container"  @click="()=>{router.push(`/courseDetails/${prop.programId}/${prop.childId}/${prop.isEnrolled}`)}" >
      <img :src="course?.image" alt="" />
      <h2>{{selectLang(course?.title) }}</h2>
      <Button  @click="()=>{router.push(`/courseDetails/${prop.programId}/${prop.childId}/${prop.isEnrolled}`)}" :label=selectLang(translationModule.learnMore) />
    </div>
  </main>
</template>

<style scoped>
.container{
    width: fit-content;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}
h2{
    color: var(--header);
    margin: 0;
    padding-left: 1rem;
}
button{
    align-self: end;
}
img{
    width: 24rem;
    aspect-ratio: 1.6/1;
    border-radius: 8px;
}
</style>
