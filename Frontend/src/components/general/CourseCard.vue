<script lang="ts" setup>
import Button from "primevue/button";
import { useRouter, } from "vue-router";
import { selectLang,translationModule } from "@/lib/Translate";


const prop = defineProps(["course",'search']);
const router = useRouter()
  
</script>

<template>
  <main v-if="selectLang(course?.title)?.toLowerCase().includes(search.toLowerCase())">
    <div class="container">
      <img :src="course?.image" alt="" />
      <h2>{{ selectLang(course?.title) }}</h2>
      <Button @click="router.push(`/viewCourseDetails/${prop.course?.id}`)" :label=selectLang(translationModule.learnMore) />
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
