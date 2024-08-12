<script lang="ts" setup>
import { computed, ref,watch } from "vue";
import { useRoute } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";
import Button from "primevue/button";
import 'primeicons/primeicons.css'
import { selectLang,translationModule } from "@/lib/Translate";

const emit=defineEmits(['next'])
defineProps(['completed'])

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

function markCompleted(){
  const addAnswersRequester = new HttpRequester('add_progress')
  let progres = {
    lesson_progress:{
      lesson_id:route.params.materialId,
      completed_at: new Date().toISOString(),
    },
    material_type:'Lesson'
  }

  addAnswersRequester.callApi({progres:progres,enrolment_id:route.params.enrollmentId}).then(res=>{emit('next',true)})
}
</script>

<template>
  <main>
    <div class="container">
      <h2>
        {{selectLang(lesson?.title) }}
      </h2>
      <p>{{selectLang(lesson?.description) }}</p>
      <div class="wrapper">
        <iframe :src="lesson?.source" frameborder="0" sandbox="allow-scripts allow-same-origin" allowfullscreen ></iframe>
      </div>
      <Button :disabled="completed" icon="pi pi-check-circle"  :label=selectLang(translationModule.markCompleted) icon-pos="right" @click="markCompleted"/>
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
button{
  font-size: 0.75rem;
}
</style>
