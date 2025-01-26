<script setup lang="ts">
import Dialog from "primevue/dialog";
import { selectLang, translationModule } from "@/lib/Translate";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import router from "@/router";
const prop = defineProps(["showDialog"]);
const emit = defineEmits(["removeDialog"]);
</script>

<template>
  <Dialog
  style="max-width: 75%;"
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
        <h2>{{ selectLang(translationModule.noChildren) }}</h2>
        <div class="btn-container">
          <Button :label="selectLang(translationModule.addChild)" @click="(router.push('/addChild'))" />
          <Button
            style="background: red"
            :label="selectLang(translationModule.later)"
            @click="
              () => {
                $emit('removeDialog', true);
              }
            "
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
  text-align: center;
}
.btn-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
}
</style>
