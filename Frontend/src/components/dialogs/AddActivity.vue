<script setup lang="ts">
import InputText from "primevue/inputtext";
import Editor from "primevue/editor";
import { ref, watch } from "vue";
import "primeicons/primeicons.css";
import { HttpRequester } from "@/lib/APICaller";
import { type TwoLang } from "@/lib/Interfaces";


const title = ref<TwoLang>({ en: "", ar: "" });
const description = ref<TwoLang>({ en: "", ar: "" });
const contentEn = ref('<p> rb </p>');
const contentAr = ref("");

const prop = defineProps(["addMaterial", "materialId"]);
const emit = defineEmits(["info"]);

if (prop.materialId) {
  new HttpRequester("get_activity")
    .callApi({ activity_id: prop.materialId })
    .then((res) => {
      if (res?.success) {
        title.value = res?.data?.activity?.title;
        description.value = res?.data?.activity?.description;
        contentEn.value = res?.data?.activity?.content.en;
        contentAr.value = res?.data?.activity?.content.ar;
      }
    });
}


watch(prop, () => {
  if (prop.addMaterial) {
    let mat = {
      title: title.value,
      description: description.value,
      content: {
        en:contentEn.value,
        ar:contentAr.value
      }
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

      <div class="editor_element">
        <h4>English Content</h4>
        <Editor v-model="contentEn" style="height: 300px;"/>
      </div>
      <div class="editor_element">
        <h4>Arabic Content</h4>
        <Editor v-model="contentAr" style="height: 300px;"/>
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
.editor_element{
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
