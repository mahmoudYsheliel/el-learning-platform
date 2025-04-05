<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";
import Button from "primevue/button";
import "primeicons/primeicons.css";
import { selectLang, translationModule } from "@/lib/Translate";
import { useLang } from "@/stores/token";

const emit = defineEmits(["next"]);
defineProps(["completed"]);

const route = useRoute();
const project = ref();
const path = computed(() => {
  return route.params.materialId;
});
watch(path, () => {
  getproject();
});
const getproject = () => {
  const projectRequester = new HttpRequester("get_project");
  projectRequester
    .callApi({ project_id: route.params.materialId })
    .then((res) => {
      if (res?.success) {
        project.value = res?.data?.project;
        const selectedlang = lang.getLang

        if (selectedlang == 'en') {
          projectScourse.value = project.value?.source?.replace('view?usp=sharing', 'preview')?.replace('view?usp=drive_link', 'preview')
        }
        if (selectedlang == 'ar') {
          projectScourse.value = project.value?.source2?.replace('view?usp=sharing', 'preview')?.replace('view?usp=drive_link', 'preview')
        }
      }
    });
};
getproject();

function markCompleted() {
  const addAnswersRequester = new HttpRequester("add_progress");
  let progres = {
    project_progress: {
      project_id: route.params.materialId,
      completed_at: new Date().toISOString(),
    },
    material_type: "Project",
  };

  addAnswersRequester
    .callApi({ progres: progres, enrolment_id: route.params.enrollmentId })
    .then((res) => {
      emit("next", true);
    });
}
const lang = useLang()
const projectScourse = ref('')

watch((lang), () => {
  const selectedlang = lang.getLang
  if (selectedlang == 'en') {
    projectScourse.value = project.value?.source?.replace('view?usp=sharing', 'preview')?.replace('view?usp=drive_link', 'preview')
  }
  if (selectedlang == 'ar') {
    projectScourse.value = project.value?.source2?.replace('view?usp=sharing', 'preview')?.replace('view?usp=drive_link', 'preview')
  }

})
</script>

<template>
  <main>
    <div class="container">
      <h2>
        {{ selectLang(project?.title) }}
      </h2>
      <p>{{ selectLang(project?.description) }}</p>
      <div class="wrapper">

        <iframe :src="projectScourse" frameborder="0" sandbox="allow-scripts allow-same-origin" allowfullscreen></iframe>

      </div>
      <Button :disabled="completed" icon="pi pi-check-circle" :label="selectLang(translationModule.markCompleted)" icon-pos="right" @click="markCompleted" />
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

button {
  font-size: 0.75rem;
}
</style>
