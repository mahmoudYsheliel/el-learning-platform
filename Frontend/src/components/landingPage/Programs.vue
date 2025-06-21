<script lang="ts" setup>
import "primeicons/primeicons.css";
import { ref } from "vue";
import { selectLang,translationModule } from "@/lib/Translate";

import { useRouter } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";



const programRequester = new HttpRequester("get_all_program");

const programs = ref();

const router = useRouter();
const items = ref<{image:string,command:()=>void}[]>([]);

programRequester.callApi().then((res) => {
  const colors =['var(--accent1)','var(--accent3)','var(--accent2)']
  programs.value = res?.data.program;
  if (programs.value) {
    for (let i=0; i<programs.value.length;i++) {
      items.value.push({
       image:programs.value[i]?.image,
        command: () => {
          router.push(`programs/${programs.value[i].id}`);
        },
      });
    }
  }
});

</script>

<template>
  <main>
    <h1 class="header">{{ selectLang(translationModule.traceTracks) }}</h1>
    <p class="header">{{ selectLang(translationModule.traceProgramsDescription) }}</p>
    <div class="wrapper">
      <div class="card" v-for="card in items">
        <img :src="selectLang(card.image)" @click="card.command" alt="" style="width: 100%;height: 100%;" >
      </div>
    </div>

  </main>
</template>

<style scoped>
main {
  margin-block: 4rem;
}
.header {
  text-align: center;
  color: var(--accent1);
  margin: 0;
  padding: 0;
}
h1 {
  line-height: 3rem;
}
.wrapper {
  width: 90%;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 3rem;
  flex-wrap: wrap;
  gap: 2rem;
}
p.header {
  color: var(--text);
}

.card {
  width: 24rem;
  border-radius: 2rem;
  overflow: hidden;
  cursor: pointer;
  display: inline-block;
  transition: transform 1s ease;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.125);
}
</style>
