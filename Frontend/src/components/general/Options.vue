<script setup lang="ts">
import SplitButton from "primevue/splitbutton";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";
import { useLang } from "@/stores/token";
import { selectLang,translationModule } from "@/lib/Translate";
const lang = useLang();
const programRequester = new HttpRequester("get_all_program");

const programs = ref<any[]>([]);

const router = useRouter();

const items = ref<any[]>([]);

programRequester.callApi().then((res) => {
  programs.value = res.data.program;
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

function setLang(selectedLang: string) {
  if (selectedLang == 'English'){
    lang.setLang('en');
  }
  if (selectedLang == 'العربية'){
    lang.setLang('ar');
  }
 
  window.location.reload();
}
</script>

<template>
  <main>
    <div class="image">
      <img src="/images/logo.png" alt="" />
      <p>{{ selectLang(translationModule.entertainYourEdu) }}</p>
    </div>

    <div class="options">
      <span>{{ selectLang(translationModule.plans) }}</span>
      <div class="card flex justify-content-center">
        <SplitButton
          :label=selectLang(translationModule.programs)
          :model="items"
          @click="items[0]?.command"
          text
        />
      </div>
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
  justify-content: space-between;
  align-items: start;
  margin-top: 2rem;
}
.image {
  position: relative;
}
.options {
  display: flex;
  gap: 1rem;
  color: var(--accent2);
  align-items: center;
  font-weight: bold;
}
img {
  height: 2rem;
  margin: 0;
}
p {
  margin: 0;
  color: var(--accent2);
  margin-left: 1rem;
}
</style>
