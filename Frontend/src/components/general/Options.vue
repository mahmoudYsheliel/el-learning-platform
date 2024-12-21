<script setup lang="ts">
import SplitButton from "primevue/splitbutton";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";
import { useLang } from "@/stores/token";
import { selectLang, translationModule } from "@/lib/Translate";
const lang = useLang();
const programRequester = new HttpRequester("get_all_program");

const programs = ref<any[]>([]);

const router = useRouter();

const items = ref<any[]>([]);

programRequester.callApi().then((res) => {
  programs.value = res?.data.program;
  if (programs.value) {
    for (let program of programs.value) {
      items.value.push({
        label: selectLang(program?.title),
        command: () => {
          router.push(`/programs/${program?.id}`);
        },
      });
    }
  }
});

function setLang(selectedLang: string | undefined) {
  if (selectedLang == "English") {
    lang.setLang("en");
  }
  if (selectedLang == "العربية") {
    lang.setLang("ar");
  }
}



</script>

<template>
  <main>
    

    <div class="options">
      <span @click="router.push('/tracePlans/0/0')" style="cursor: pointer">{{
        selectLang(translationModule.plans)
      }}</span>
        <SplitButton
         
          :model="items"
          @click="items[0]?.command"
          text
        >
      <span>{{ selectLang(translationModule.programs) }}</span>
      </SplitButton>
      <span
        style="cursor: pointer"
        @click="
          () => {
            setLang(selectLang(translationModule.language));
          }
        "
        >{{ selectLang(translationModule.language) }}</span
      >
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  width: 90%;
  margin-inline: auto;
  justify-content: end;
  align-items: start;
  margin-top: 1rem;
}
.image {
  position: relative;
}
.options {
  display: flex;
  gap: 1.5rem;
  color: var(--accent2);
  align-items: center;

}
span{
  font-weight:700;
}
img {
  height: 1.75rem;
  margin: 0;
}
</style>
