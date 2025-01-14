<script lang="ts" setup>
import Button from "primevue/button";
import { useRouter,useRoute } from "vue-router";
import { selectLang,translationModule } from "@/lib/Translate";
import { computed } from "vue";
import 'primeicons/primeicons.css'


const prop = defineProps(["course",'search']);
const router = useRouter()
const route = useRoute()
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
  <main v-if="selectLang(course?.title)?.toLowerCase().includes(search.toLowerCase())">
    <div class="container"  @click="router.push(`/courseDetails/${prop.course?.id}/${childId}/${isEnrolled}`)">
      <img :src="course?.image" alt="" />
      <h2>{{ selectLang(course?.title) }} </h2>
      <Button  @click="router.push(`/courseDetails/${prop.course?.id}/${childId}/${isEnrolled}`)" :label=selectLang(translationModule.learnMore) />
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
