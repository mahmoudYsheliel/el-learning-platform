<script setup lang="ts">
import SplitButton from "primevue/splitbutton";
import Button from "primevue/button";
import Menu from "primevue/menu";
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



const menu = ref();
function show_account_menu(event: MouseEvent) {
  menu.value.toggle(event);
}

</script>

<template>
  <main>


    <div class="options">
      <span @click="router.push('/tracePlans/0/0')" style="cursor: pointer">{{
        selectLang(translationModule.plans)
      }}</span>

      <span class="split_button" @click="items[0]?.command">
        <div>{{ selectLang(translationModule.programs) }}</div>
        <i class="pi pi-angle-down" @click.stop="show_account_menu"></i>
      </span>
      <Menu ref="menu" :model="items" :popup="true" style="margin-top: 0.5rem;" />


    </div>
  </main>
</template>

<style scoped>
.split_button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

main {
  display: flex;
  width: 90%;
  margin-inline: auto;
  justify-content: end;
  align-items: start;
  padding-top: 1rem;
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

span {
  font-weight: 600;
  cursor: pointer;
}
</style>
