<script setup lang="ts">
import Dialog from "primevue/dialog";
import { selectLang, translationModule } from "@/lib/Translate";

import Button from "primevue/button";


const prop = defineProps(["showDialog", "cost"]);
const emits = defineEmits(['hideDialog', 'confirm'])


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
        <h2>Confirm Deletion</h2>
        
        <div class="buttons">
          <Button
          label="Confirm"
          @click="()=>{$emit('confirm')}"
        />
        <Button
          label="Cancel"
          style="background-color: red;"
          @click="()=>{$emit('hideDialog')}"
        />
        </div>
        
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
.buttons{
  width: 50vw;
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
}
</style>
