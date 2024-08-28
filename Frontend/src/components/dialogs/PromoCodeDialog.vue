<script setup lang="ts">
import Dialog from "primevue/dialog";
import { selectLang, translationModule } from "@/lib/Translate";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import InputText from "primevue/inputtext"
import { ref } from "vue";

const router = useRouter();
const prop = defineProps(["showDialog"]);
defineEmits(['promoCode'])
const promoCode = ref('')
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
        <h2>{{ selectLang(translationModule.havePromoCode) }}</h2>
       
        <InputText :placeholder="selectLang(translationModule.promoCode)" v-model="promoCode" />
        <Button
          :label="selectLang(translationModule.next)"
          style="width: 10rem"
          @click="()=>{$emit('promoCode',promoCode)}"
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
