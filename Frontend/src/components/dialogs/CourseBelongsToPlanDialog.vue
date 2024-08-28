<script setup lang="ts">
import Dialog from "primevue/dialog";
import { selectLang, translationModule } from "@/lib/Translate";
import { useRouter } from "vue-router";
import Button from "primevue/button";

const router = useRouter();
const prop = defineProps(["showDialog", "planId","childId"]);
</script>

<template>
  <Dialog
    v-model:visible="prop.showDialog"
    modal
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
  >
    <template #container="{ closeCallback }">
      <div class="dialog">
        <h2>{{ selectLang(translationModule.courseBelongsToPlan) }}</h2>
        <Button
          :label="selectLang(translationModule.viewPlans)"
          style="width: 10rem"
          @click="router.push(`/plan/${planId}/${childId}`)"
        />
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
.dialog {
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
h2 {
  color: var(--accent1);
  margin: 0;
  padding: 0;
}
</style>
