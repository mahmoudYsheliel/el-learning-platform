<script lang="ts" setup>
import { computed, ref,watch } from "vue";
import { useRoute } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";

const route =useRoute()
const lesson =ref()
const path=computed(()=>{return route.params.materialId})
watch(path,()=>{getlesson()})
const getlesson = () => {
  const lessonRequester = new HttpRequester('get_lesson')
  lessonRequester.callApi({lesson_id:route.params.materialId}).then(res=>{if(res.success){
    lesson.value = res.data.lesson
  }})
};
getlesson();
</script>

<template>
  <main>
    <div class="container">
      <h2>
        {{ lesson?.title }}
      </h2>
      <p>{{ lesson?.description }}</p>
      <div class="wrapper">
        <iframe :src="lesson?.source" frameborder="0"></iframe>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 80%;
  margin-inline: auto;
}
h2 {
  color: var(--accent1);
  margin: 0;
  line-height: 1rem;
  margin-top: 2rem;
  border-bottom: 4px solid var(--accent3);
  width: fit-content;
}
iframe {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 8px;
}
.wrapper {
  margin-top: 2rem;
  width: 75%;
  margin-inline: auto;
}
</style>
