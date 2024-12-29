<script setup lang="ts">
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import { ref, watch } from "vue";
import "primeicons/primeicons.css";
import { HttpRequester } from "@/lib/APICaller";
import { type TwoLang,type ItemsSet } from "@/lib/Interfaces";


const title = ref<TwoLang>({ en: "", ar: "" });
const description = ref<TwoLang>({ en: "", ar: "" });

const startImages = ref<string[]>([]);
const endImages = ref<string[]>([]);
const sources = ref<string[]>([]);

const objectives = ref<ItemsSet>({
  items: [],
  start_images: [],
  end_images: [],
});
const termsConcepts = ref<ItemsSet>({
  items: [],
  start_images: [],
  end_images: [],
});
const materials = ref<ItemsSet>({
  items: [],
  start_images: [],
  end_images: [],
});
const instructions = ref<ItemsSet>({
  items: [],
  start_images: [],
  end_images: [],
});
const results = ref<ItemsSet>({
  items: [],
  start_images: [],
  end_images: [],
});
const conclusions = ref<ItemsSet>({
  items: [],
  start_images: [],
  end_images: [],
});
const allItems = [
  { title: "Oblective", item: objectives.value },
  { title: "Terms and Concepts", item: termsConcepts.value },
  { title: "Materials", item: materials.value },
  { title: "Instructions", item: instructions.value },
  { title: "Results", item: results.value },
  { title: "Conclusions", item: conclusions.value },
];

function addItem(element: ItemsSet | null) {

  if (element == null) {
    element = { items: [], start_images: [], end_images: [] };
  }
  element.items.push({
    id: 0,
    text: { en: "", ar: "" },
    description: { en: "", ar: "" },
    image: "",
  });
}

const prop = defineProps(["addMaterial", "materialId"]);
const emit = defineEmits(["info"]);

if (prop.materialId) {
  new HttpRequester("get_activity")
    .callApi({ activity_id: prop.materialId })
    .then((res) => {
      if (res?.success) {
        title.value = res?.data?.activity?.title;
        description.value = res?.data?.activity?.description;
        startImages.value = res?.data?.activity?.start_images;
        endImages.value = res?.data?.activity?.end_images;
        sources.value = res?.data?.activity?.sources;

        res?.data?.activity?.objectives?.items ? objectives.value.items = res?.data?.activity?.objectives?.items : '';
        res?.data?.activity?.terms_concepts?.items ? termsConcepts.value.items = res?.data?.activity?.terms_concepts?.items : '';
        res?.data?.activity?.materials?.items ? materials.value.items = res?.data?.activity?.materials?.items : '';
        res?.data?.activity?.instructions?.items ? instructions.value.items = res?.data?.activity?.instructions?.items : '';
        res?.data?.activity?.results?.items ? results.value.items = res?.data?.activity?.results?.items : '';
        res?.data?.activity?.conclusions?.items ? conclusions.value.items = res?.data?.activity?.conclusions?.items : '';

      }
    });
}

watch(prop, () => {
  if (prop.addMaterial) {
    let mat = {
      title: title.value,
      description: description.value,
      start_images: startImages.value?.length ? startImages.value : null,
      end_images: endImages.value?.length ? endImages.value : null,
      sources: sources.value?.length ? sources.value : null,
      objectives: objectives.value?.items?.length
        ? objectives.value
        : null,
      terms_concepts: termsConcepts.value?.items?.length
        ? termsConcepts.value
        : null,
      materials: materials.value?.items?.length ? materials.value : null,
      instructions: instructions.value?.items?.length
        ? instructions.value
        : null,
      results: results.value?.items?.length ? results.value : null,
      conclusions: conclusions.value?.items?.length
        ? conclusions.value
        : null,
    };
    if (prop.materialId) {
      let data = {
        activity_id: prop.materialId,
        update: mat,
      };
      new HttpRequester("update_activity").callApi(data).then((res) => {
        if (res?.success) {
          emit("info", null);
        }
      });
    } else {
      let data = {
        new_activity: mat,
      };
      new HttpRequester("create_activity").callApi(data).then((res) => {
        if (res?.data?.activity_id) {
          let info = {
            Id: res?.data?.activity_id,
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

      <div class="images">
        <h4>Start Images</h4>
        <div class="image" v-for="(image, i) in startImages">
          <InputText v-model="startImages[i]" />
          <div style="display: flex; gap: 0.25rem">
            <img :src="image" />
            <i class="pi pi-times-circle" @click="startImages.splice(i, 1)"></i>
          </div>
        </div>
        <div class="btn-container">
          <Button label="Add Image" @click="()=>{startImages ?  startImages.push(''): startImages=[''] }" />
        </div>
      </div>

      <div class="images">
        <h4>Scources</h4>
        <div class="image" v-for="(source, i) in sources">
          <InputText v-model="sources[i]" />
          <div style="display: flex; gap: 0.25rem">
            <i class="pi pi-times-circle" @click="sources.splice(i, 1)"></i>
          </div>
        </div>
        <div class="btn-container">
          <Button label="Add Source"  @click="()=>{sources ?  sources.push(''): sources=[''] }"/>
        </div>
      </div>

      <div class="item-container" v-for="itemSet in allItems">
        <h4>{{ itemSet.title }}</h4>
        <div class="item" v-for="(item, i) in itemSet.item?.items">
          <i
            class="pi pi-times-circle"
            @click="itemSet.item?.items.splice(i, 1)"
          ></i>
          <div class="text">
            <div>
              <span>En Text</span>
              <InputText v-model="item.text.en" />
            </div>
            <div>
              <span>Ar Text</span>
              <InputText v-model="item.text.ar" />
            </div>
          </div>
          <div class="text" v-if="item.description">
            <div>
              <span>En Description</span>
              <InputText v-model="item.description.en" />
            </div>
            <div>
              <span>Ar Description</span>
              <InputText v-model="item.description.ar" />
            </div>
          </div>
          <h4>Image</h4>
          <div class="image">
            <InputText v-model="item.image" />
            <div style="display: flex; gap: 0.25rem">
              <img v-if="item.image" :src="item.image" />
            </div>
          </div>
        </div>
        <div class="btn-container">
          <Button
            label="Add Item"
            @click="
              () => {
                addItem(itemSet.item);
              }
            "
          />
        </div>
      </div>

      <div class="images">
        <h4>End Images</h4>
        <div class="image" v-for="(image, i) in endImages">
          <InputText v-model="endImages[i]" />
          <div style="display: flex; gap: 0.25rem">
            <img :src="image" />
            <i class="pi pi-times-circle" @click="endImages.splice(i, 1)"></i>
          </div>
        </div>
        <div class="btn-container">
          <Button label="Add Image" @click="()=>{endImages ?  endImages.push(''): endImages=[''] }" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  height: 100%;
  width: 90vw;
  overflow-y: scroll;
}

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
.text > div {
  display: grid;
  grid-template-columns: 10rem calc(100% - 15rem);
}
.text {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
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
.question {
  border: 2px solid var(--choiceBackgroundColor);
  border-radius: 0.5rem;
}
p {
  display: flex;
  justify-content: space-between;
}
.pi-times-circle {
  color: red;
  cursor: pointer;
}
.question {
  font-size: 0.75rem;
}
.question > p {
  padding: 0;
  margin: 0;
}
.element-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.image {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-block: 0.5rem;
}
img {
  height: 10rem;
  border-radius: 0.5rem;
}
</style>
