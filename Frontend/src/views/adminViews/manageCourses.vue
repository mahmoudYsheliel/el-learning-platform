<script setup lang="ts">
import AdminSidebar from "@/components/admin/general/AdminSidebar.vue";
import Nanbar from "@/components/general/Navbar.vue";
import Button from "primevue/button";
import { HttpRequester } from "@/lib/APICaller";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import { useRouter } from "vue-router";

const router = useRouter()


const title = ref();
const description = ref();
const imageURL = ref();
const minAge = ref();
const maxAge = ref();

const showDialog = ref(false);
const programsRequester = new HttpRequester("get_all_program");
const programs = ref();
programsRequester.callApi().then((res) => {
  programs.value = res?.data?.program;
});
const missing = ref(false);

function addProgram() {
  if (
    !title.value ||
    !description.value ||
    !imageURL.value ||
    !minAge.value ||
    !maxAge.value
  ) {
    missing.value = true;
  } else {
    const createProgramRequester = new HttpRequester("create_program");
    let data = {
      new_program: {
        title: title.value,
        description: description.value,
        age_group: `Ages ${minAge.value} - ${maxAge.value}`,
        image: imageURL.value,
      },
    };
    createProgramRequester.callApi(data).then((res) => {
      if (res.success) {
        showDialog.value = false;
        programsRequester.callApi().then((res) => {
          programs.value = res?.data?.program;
        });

      }
    });
  }
}
</script>

<template>
  <Nanbar />
  <Dialog v-model:visible="showDialog" modal header="Add Program">
    <p v-if="missing" style="text-align: center; color: red; font-weight: 700">
      Some Fields Are Missing
    </p>
    <div class="dialog">
      <div class="element">
        <h4>Title</h4>
        <InputText v-model="title" />
      </div>
      <div class="element">
        <h4>Description</h4>
        <Textarea v-model="description" />
      </div>

      <div class="element">
        <h4>Image Url</h4>
        <InputText v-model="imageURL" />
      </div>
      <div class="element">
        <h4>Min Age</h4>
        <InputNumber class="num" v-model="minAge" />
      </div>
      <div class="element">
        <h4>Max Age</h4>
        <InputNumber class="num" v-model="maxAge" />
      </div>
    </div>
    <Button
      label="Add Program"
      style="font-size: 1rem; margin-top: 2rem"
      @click="addProgram"
    />
  </Dialog>
  <div class="container">
    <AdminSidebar selected="Manage Courses" />
    <div class="wrapper">
      <div class="program-wrapper">
        <div class="program-card" v-for="program in programs">
          <img :src="program?.image" alt="" />
          <div class="title">
            <h3>{{ program?.title }}</h3>
            <Button label="View Program" @click="router.push(`/AdminProgram/${program?.id}`)"/>
          </div>
        </div>
      </div>
      <div class="button-container" style="display: flex; justify-content: end">
        <Button
          label="Add Program"
          style="font-size: 1rem; margin-top: 2rem"
          @click="showDialog = true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 12rem 1fr;
  min-height: 100vh;
}
.wrapper {
  width: 90%;
  margin-inline: auto;
  margin-top: 2rem;
}

.program-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
img {
  width: 20rem;
  aspect-ratio: 1.6/1;
  border-radius: 1rem;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h3 {
  color: var(--accent1);
  margin: 0;
  font-size: 1.75rem;
}
button {
  font-size: 0.75rem;
}
h4 {
  margin: 0;
  color: var(--text);
}
.element {
  display: grid;
  grid-template-columns: 8rem 20rem;
}
.dialog {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.ages {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.num {
  width: 40%;
}
</style>
