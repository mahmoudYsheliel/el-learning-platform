<script setup lang="ts">
import InputText from "primevue/inputtext";
import { ref,watch } from "vue";
import "primeicons/primeicons.css";
import { HttpRequester } from "@/lib/APICaller";

interface TwoLang {
  en: string;
  ar: string;
}
const title = ref<TwoLang>({ en: "", ar: "" });
const description = ref<TwoLang>({ en: "", ar: "" });
const source = ref('');
const source2 = ref('');


const prop = defineProps(['addMaterial','materialId'])
const emit = defineEmits(['info']);
if (prop.materialId) {
  new HttpRequester("get_project")
    .callApi({ project_id: prop.materialId })
    .then((res) => {
      if (res?.success) {
        title.value = res?.data?.project?.title;
        description.value = res?.data?.project?.description;
        source.value =res?.data?.project?.source;
        source2.value =res?.data?.project?.source2;
      }
    });
}


watch(prop, () => {
  if (prop.addMaterial) {
    let mat = {
      title:title.value,
        description:description.value,
        source:source.value,
        source2:source2.value
    };
    if (prop.materialId) {
      let data = {
        project_id: prop.materialId,
        update: mat,
      };
      new HttpRequester("update_project").callApi(data).then((res) => {
        if (res?.success) {
          emit("info", null);
        }
      });
    } else {
      let data = {
        new_project: mat,
      };
      new HttpRequester("create_project").callApi(data).then((res) => {
        if (res?.data?.project_id) {
          let info = {
            Id: res?.data?.project_id,
            title: { en: title.value.en, ar: title.value.ar },
          };
          emit("info", info);
        }
      });
    }
  }
});
</script>

<template>
  <div class="container">
    <div class="material-container">
      <div class="element">
        <h4>English Title</h4>
        <InputText v-model="title.en" />
      </div>
      <div class="element">
        <h4>Arabic Title</h4>
        <InputText v-model="title.ar" />
      </div>

      <div class="element">
        <h4>English Description</h4>
        <InputText v-model="description.en" />
      </div>
      <div class="element">
        <h4>Arabic Description</h4>
        <InputText v-model="description.ar" />
      </div>

      <div class="element">
        <h4>English Source</h4>
        <InputText v-model="source" />
      </div>
      <div class="element">
        <h4>Arabic Source</h4>
        <InputText v-model="source2" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.material-container {
  width: 100%;
}
.element {
  display: grid;
  grid-template-columns: 15rem calc(100% - 15rem);
  margin-bottom: 1rem;
}
.element-container > .element {
  margin-bottom: 0.25rem;
  grid-template-columns: 2rem calc(100% - 5rem);
}
h4,
p,
span {
  color: var(--accent1);
  margin-block: 0.5rem;
}
h2 {
  color: var(--accent1);
  margin: 0;
  padding: 0;
}
.btn-container {
  display: flex;
  justify-content: end;
  width: 100%;
}

.material-btns {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.question,
.choices {
  margin: 0.5rem;
  padding: 0.5rem;
}
</style>
