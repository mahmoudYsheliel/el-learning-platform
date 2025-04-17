<script setup lang="ts">
import InputText from "primevue/inputtext";
import Editor from "primevue/editor";
import { ref, watch } from "vue";
import "primeicons/primeicons.css";
import { HttpRequester } from "@/lib/APICaller";
import { type TwoLang } from "@/lib/Interfaces";
import { selectLang } from "@/lib/Translate";
import Textarea from "primevue/textarea";

const title = ref<TwoLang>({ en: "", ar: "" });
const description = ref<TwoLang>({ en: "", ar: "" });

const content = ref<TwoLang>({ en: "", ar: "" });

const prop = defineProps(["addMaterial", "materialId"]);
const emit = defineEmits(["info"]);

if (prop.materialId) {
  new HttpRequester("get_activity")
    .callApi({ activity_id: prop.materialId })
    .then((res) => {
      if (res?.success) {
        title.value = res?.data?.activity?.title;
        description.value = res?.data?.activity?.description;
        content.value = res?.data?.activity?.content ?? { en: "", ar: "" };
      }
    });
}


watch(prop, () => {
  if (prop.addMaterial) {
    let mat = {
      title: title.value,
      description: description.value,
      content: content.value
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

      <div class="content">
        <div class="options-container">
          <h4>Content</h4>
          <div class="options">
            <div class="option">
              <p @click="lang='en'" :class="{ selected: (lang == 'en') }">En</p>
              <p @click="lang='ar'"  :class="{ selected: (lang == 'ar') }">Ar</p>
            </div>
            <div class="option">
              <p @click="mode='editor'" :class="{ selected: (mode == 'editor') }">Editor</p>
              <p @click="mode='html'" :class="{ selected: (mode == 'html') }">HTML</p>
            </div>

          </div>
        </div>
        <div class="editor-container">
          <div class="editor-mode">
            <Editor style="width: 100%; height: calc(100% - 4rem)" v-if="lang == 'en' && mode == 'editor'" v-model="content.en" />
            <Editor style="width: 100%; height: calc(100% - 4rem)" v-if="lang == 'ar' && mode == 'editor'" v-model="content.ar" />
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
.editor-container{
  width: 90%;
  margin-inline: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  grid-template-rows: 20rem;
}
.editor-container>*{
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
.selected{
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



p {
  display: flex;
  justify-content: space-between;
}

.pi-times-circle {
  color: red;
  cursor: pointer;
}
</style>
