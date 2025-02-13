<script setup lang="ts">
import Dialog from "primevue/dialog";
import { selectLang, translationModule } from "@/lib/Translate";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { usePersonalInfo } from "@/stores/token";

const info = usePersonalInfo()
const router = useRouter();
const prop = defineProps(["showDialog", "cost"]);


function go_to_enrollments_page(){
  if (info.getInfo?.userType =='Child')
    router.push('/enrollmentRequests')
  if (info.getInfo?.userType =='Parent')
    router.push('/parentHome')
}
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
        <h2>{{ selectLang(translationModule.sentSuccessfully) }}</h2>
        <h2>
          {{ selectLang(translationModule.pleaseSendInvoice) }} {{ cost }}
          {{ selectLang(translationModule.egyptianPound) }}
        </h2>
        <h2>{{ selectLang(translationModule.attatchTheInvoice) }}</h2>
        <Button
          :label="selectLang(translationModule.enrollmentRequests)"
          style="width: 20rem"
          @click="go_to_enrollments_page"
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
