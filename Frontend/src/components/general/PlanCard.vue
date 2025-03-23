<script lang="ts" setup>
import { selectLang, translationModule } from "@/lib/Translate";
const props = defineProps(["plan"]);
import Button from "primevue/button";
import { useRoute, useRouter } from "vue-router";
import { useToken } from "@/stores/token";
import { ref } from "vue";
import Dialog from "primevue/dialog";

const showDialog = ref(false);
const route = useRoute();
const router = useRouter();
const token = useToken();

function enrollPlan() {
  if (!token.getIsAuthorized) {
    router.push("/login");
  } else if (
    route.params.childId == "0" &&
    route.params.selectedPlanId == "0"
  ) {
    showDialog.value = true;
  }
}
</script>

<template>
  <Dialog
    v-model:visible="showDialog"
    modal
    :pt="{
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
      header: {
        style: 'display:none',
      },
 
    }"
  >
    <div class="dialog">
      <h1>{{ selectLang(translationModule.pleaseGoToChildrenCourse) }}</h1>
      <h1>{{ selectLang(translationModule.selectChildEnroll) }}</h1>

      <Button
        :label="selectLang(translationModule.childCourses)"
        @click="router.push(`/childrenCourses`)"
      />
    </div>


  </Dialog>

  <div class="container"  @click="router.push(`/plan/${plan?.id}/${route.params?.childId}`)">
    <h3>{{ selectLang(plan?.title) }}</h3>

    <img :src="plan?.image" alt="" />
    <p>{{ selectLang(plan?.description) }}</p>
    <div class="button-container">
     
      <Button
        :label="selectLang(translationModule.learnMore)"
       
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 20rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0.25rem 0.25rem 1rem;
  cursor: pointer;
}
.container:hover {
  scale: 1.05;
  transition-duration: 0.5s;
}
img {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 0.5rem;
}
h3 {
  color: var(--accent1);
}
p {
  color: var(--text);
  font-size: 0.75rem;
}
.button-container {
  display: flex;
  justify-content: space-between;
}
.dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
 
  
  width: 80vw;

}
.courses{
    display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  height: 70vh;
  padding-top: 5rem;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.courses::-webkit-scrollbar{
  display: none;
}
h1{
    color: var(--accent1);
}
</style>
