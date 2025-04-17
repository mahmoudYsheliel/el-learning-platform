<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";
import Button from "primevue/button";
import "primeicons/primeicons.css";
import { selectLang, translationModule } from "@/lib/Translate";

const emit = defineEmits(["next"]);
defineProps(["completed"]);

const route = useRoute();
const activity = ref();
const path = computed(() => {
  return route.params.materialId;
});
watch(path, () => {
  getactivity();
});
const getactivity = () => {
  const activityRequester = new HttpRequester("get_activity");
  activityRequester
    .callApi({ activity_id: route.params.materialId })
    .then((res) => {
      if (res?.success) {
        activity.value = res?.data?.activity;
      }
    });
};
getactivity();

function markCompleted() {
  const addAnswersRequester = new HttpRequester("add_progress");
  let progres = {
    activity_progress: {
      activity_id: route.params.materialId,
      completed_at: new Date().toISOString(),
    },
    material_type: "Activity",
  };

  addAnswersRequester
    .callApi({ progres: progres, enrolment_id: route.params.enrollmentId })
    .then((res) => {
      emit("next", true);
    });
}



const translationModuleRef = ref<any>(translationModule);
const fields = [
  "objectives",
  "terms_concepts",
  "materials",
  "instructions",
  "results",
  "conclusions",
];

function newWindow(source: string) {
  window.open(source);
}

</script>

<template>
  <main>
    <div class="container">
      <h1>
        {{ selectLang(activity?.title) }}
      </h1>
      <p v-if="activity?.description">
        {{ selectLang(activity?.description) }}
      </p>
      <div  v-if="activity?.content" v-html="selectLang(activity?.content)"></div>


      <div class="wrapper" v-else>
        <div class="images" v-if="activity?.start_images">
          <img v-for="image in activity?.start_images" :src="image" alt="" />
        </div>

        <div class="items" v-if="activity?.sources">
          <h3>{{ selectLang(translationModule.sources) }}</h3>
          <div class="item" v-for="(source, i) in activity?.sources">
            <p style="color: var(--secondary); cursor: pointer" @click="
              () => {
                newWindow(source);
              }
            ">
              {{ selectLang(translationModule.source) }} {{ i + 1 }}
            </p>
          </div>
        </div>

        <div class="allitems" v-for="field in fields">
          <div class="items" v-if="activity?.[field]">
            <div class="images" v-if="activity?.[field]?.start_images">
              <img v-for="image in activity?.[field]?.start_images" :src="image" alt="" />
            </div>
            <h3>{{ selectLang(translationModuleRef?.[field]) }}</h3>
            <div class="item" v-for="item in activity?.[field]?.items">
              <p>
                <span :class="{ terms: field == 'terms_concepts' }">
                  - {{ selectLang(item.text) }}</span>
                <span v-if="item.description">: {{ selectLang(item.description) }}</span>
              </p>
              <img v-if="item?.image" :src="item?.image" alt="" />
            </div>
            <div class="images" v-if="activity?.[field]?.end_images">
              <img v-for="image in activity?.[field]?.end_images" :src="image" alt="" />
            </div>
          </div>
        </div>

        <div class="images" v-if="activity?.end_images">
          <img v-for="image in activity?.end_images" :src="image" alt="" />
        </div>
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
  margin-top: 2rem;
  width: fit-content;
}

.wrapper {
  margin-top: 2rem;
  width: 95%;
  margin-inline: auto;
}

button {
  font-size: 0.75rem;
}

.images {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

img {
  width: 50%;
}

h3 {
  color: var(--accent1);
  font-size: 1.25rem;
  line-height: 1rem;
  width: fit-content;
  padding: 0;
  margin-block: 3rem 1rem;
}

p {
  color: var(--text);
  padding: 0;
  margin: 0;
  padding-left: 1rem;
}

button {
  margin-top: 3rem;
}

.terms {
  color: var(--header);
}
</style>
