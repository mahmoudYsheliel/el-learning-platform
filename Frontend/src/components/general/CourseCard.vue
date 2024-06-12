<script lang="ts" setup>
import Button from "primevue/button";
import { HttpRequester } from "@/lib/APICaller";
import { ref } from "vue";
import { useRouter } from "vue-router";
const prop = defineProps(["programId",'search']);
const router = useRouter()
const course = ref();
const courseRequester = new HttpRequester("get_course");
courseRequester
  .callApi({ course_id: prop.programId })
  .then((res) => (course.value = res.data.course));
  
</script>

<template>
  <main v-if="course?.title.toLowerCase().includes(search.toLowerCase())">
    <div class="container">
      <img :src="course?.image" alt="" />
      <h2>{{ course?.title }}</h2>
      <Button @click="()=>{router.push(`/viewCourseDetails/${prop.programId}`)}" label="Learn More" />
    </div>
  </main>
</template>

<style scoped>
.container{
    width: fit-content;
    display: flex;
    flex-direction: column;
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
