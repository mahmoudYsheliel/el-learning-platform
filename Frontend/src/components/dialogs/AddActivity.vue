<script setup lang="ts">
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";

import Editor from "primevue/editor";
import { computed, ref, watch,onMounted } from "vue";
import "primeicons/primeicons.css";
import { HttpRequester } from "@/lib/APICaller";
import { type TwoLang, type ItemsSet } from "@/lib/Interfaces";
import { QuillEditor } from '@vueup/vue-quill';
import Textarea from "primevue/textarea";


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

const content = ref<TwoLang>({ en: "", ar: "" });

const prop = defineProps(["addMaterial", "materialId"]);
const emit = defineEmits(["info"]);

if (prop.materialId) {
  new HttpRequester("get_activity")
    .callApi({ activity_id: prop.materialId })
    .then((res) => {
      if (res?.success) {
        const activity = res?.data?.activity
        title.value = activity?.title;
        description.value = activity?.description ;
        content.value = activity?.content ?? { en: "", ar: "" };
        startImages.value = activity?.start_images;
        endImages.value = activity?.end_images;
        sources.value = activity?.sources;
        objectives.value.items = activity?.objectives?.items ?? [];
        termsConcepts.value.items = activity?.terms_concepts?.items ?? [];
        materials.value.items = activity?.materials?.items ?? [];
        instructions.value.items = activity?.instructions?.items ?? [];
        results.value.items = activity?.results?.items ?? [];
        conclusions.value.items = activity?.conclusions?.items ?? [];
        setTimeout(resizeAll,50)
      }
    });
}


watch(prop, () => {
  if (prop.addMaterial) {
    let mat = {
      title: title.value,
      description: description.value,
      content: content.value,
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


const lang = ref('en')
const mode = ref('editor')


const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['link', 'image', 'video'],

  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];




function resizeAll() {
  const textareas = document.querySelectorAll('textarea')
  textareas.forEach(el => {
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  })
}
function resize(e:Event) {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto' // Reset height
  el.style.height = el.scrollHeight + 'px' // Set to content height
}

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
        <InputText dir="rtl" v-model="title.ar" />
      </div>

      <div class="element">
        <h4>English Description</h4>
        <Textarea  @input="resize" rows="1" v-model="description.en" />
        <p style="width: 300%;white-space: pre-wrap;">{{ description.en }}</p>
      </div>
      <div class="element">
        <h4>Arabic Description</h4>
        <Textarea dir="rtl" v-model="description.ar" />
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
          <Button label="Add Image" @click="() => { startImages ? startImages.push('') : startImages = [''] }" />
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
          <Button label="Add Source" @click="() => { sources ? sources.push('') : sources = [''] }" />
        </div>
      </div>






      <div class="item-container" v-for="itemSet in allItems">
        <h4>{{ itemSet.title }}</h4>
        <div class="item" v-for="(item, i) in itemSet.item?.items">
          <div class="icon_con">
            <p style="color: var(--accent4);">{{ itemSet.title  }} {{ i+1 }}</p>
            <i class="pi pi-times-circle" @click="itemSet.item?.items.splice(i, 1)"></i>
          </div>
          <div class="text">
            <div>
              <span>En Headding</span>
              <Textarea  @input="resize" rows="1" v-model="item.text.en" />
            </div>
            <div v-if="item.description">
              <span>En Text</span>
              <Textarea  @input="resize" rows="1"  v-model="item.description.en" />
            </div>
           
            <div>
              <span>Ar Headding</span>
              <Textarea  @input="resize" rows="1" dir="rtl" v-model="item.text.ar" />
            </div>
            <div v-if="item.description">
              <span>Ar Text</span>
              <Textarea  @input="resize" rows="1" dir="rtl" v-if="item.description" v-model="item.description.ar" />
            </div>
            <div>
              <span>Image</span>
              <InputText v-model="item.image" />
            </div>
            <div style="display: flex; margin-top: 0.5rem;justify-content: center;">
              <img v-if="item.image" :src="item.image" width="20%" />
            </div>
          </div>
      
        </div>
        <div class="btn-container">
          <Button label="Add Item" @click="
            () => {
              addItem(itemSet.item);
            }
          " />
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
          <Button label="Add Image" @click="() => { endImages ? endImages.push('') : endImages = [''] }" />
        </div>
      </div>



      <div class="content">
        <div class="options-container">
          <h4>Content</h4>
          <div class="options">
            <div class="option">
              <p @click="lang = 'en'" :class="{ selected: (lang == 'en') }">En</p>
              <p @click="lang = 'ar'" :class="{ selected: (lang == 'ar') }">Ar</p>
            </div>
            <div class="option">
              <p @click="mode = 'editor'" :class="{ selected: (mode == 'editor') }">Editor</p>
              <p @click="mode = 'html'" :class="{ selected: (mode == 'html') }">HTML</p>
            </div>

          </div>
        </div>
        <div class="editor-container">
          <div class="editor-mode">
            <QuillEditor :toolbar="toolbarOptions" content-type="html" style="width: 100%; height: calc(100% - 4rem)" v-if="lang == 'en' && mode == 'editor'" v-model:content="content.en" />
            <QuillEditor :toolbar="toolbarOptions" content-type="html" style=" width: 100%; height: calc(100% - 4rem)" v-if="lang == 'ar' && mode == 'editor'" v-model:content="content.ar" />
            <Textarea style="width: 100%; height: 100%;" v-if="lang == 'en' && mode == 'html'" v-model="content.en" />
            <Textarea style="width: 100%; height: 100%;" v-if="lang == 'ar' && mode == 'html'" v-model="content.ar" />
          </div>
          <div>
            <div style="max-width: 100% ;height: 100%; overflow-y: scroll;" v-if="lang == 'en'" v-html="content.en"></div>
            <div style="max-width: 100% ;height: 100%; overflow-y: scroll;" v-if="lang == 'ar'" v-html="content.ar" dir="rtl"></div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none; /* disables manual resizing */
  overflow: hidden; /* hides scrollbars */
  width: 100%;
  line-height: 1.5;
  font-size: 1rem;
  padding: 8px;
  box-sizing: border-box;
}
.icon_con{
  display: flex;
  justify-content: space-between;
}
.item-container {
  padding: 0.5rem;
  margin-block: 1rem;
  box-shadow: 0px 0px 4px 0px gray;
}

.editor-container {
  width: 90%;
  margin-inline: auto;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  grid-template-rows: 20rem;
}

.editor-container>* {
  width: 100%;
  height: 100%;
}

.option>* {
  width: 4rem;
  background-color: grey;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

.option {
  display: flex;
  gap: 8px;
}

.options-container {
  display: flex;
  justify-content: space-between;
}

.selected {
  background-color: var(--accent1);
}

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

.editor_element {
  min-height: 400px;
}


.element-container>.element {
  margin-bottom: 0.25rem;
  grid-template-columns: 2rem calc(100% - 5rem);
}

h4,
p,
span {
  color: var(--accent1);
  margin-block: 0.5rem;
}

h4 {
  font-size: 1.125rem;
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

.text>div {
  display: grid;
  grid-template-columns: 10rem calc(100% - 15rem);
}

.item{
  margin-block: 1rem;
}

.material-btns {
  display: flex;
  justify-content: space-around;
  width: 100%;
}



p {
  display: flex;
  justify-content: space-between;
}

.pi-times-circle {
  color: red;
  cursor: pointer;
}
</style>
