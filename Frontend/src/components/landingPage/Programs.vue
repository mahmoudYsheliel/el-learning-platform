<script lang="ts" setup>
import "primeicons/primeicons.css";
import { ref } from "vue";
import { selectLang,translationModule } from "@/lib/Translate";

import { useRouter } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";



const programRequester = new HttpRequester("get_all_program");

const programs = ref();

const router = useRouter();
const items = ref<any[]>([]);

programRequester.callApi().then((res) => {
  const colors =['var(--accent1)','var(--accent3)','var(--accent2)']
  programs.value = res.data.program;
  if (programs.value) {
    for (let i=0; i<programs.value.length;i++) {
      items.value.push({
        name: programs.value[i].title,
        age:programs.value[i].age_group,
        description: programs.value[i].description,
        color: colors[i%3],
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
    <h1 class="header">{{ selectLang(translationModule.tracePrograms) }}</h1>
    <p class="header">{{ selectLang(translationModule.traceProgramsDescription) }}</p>
    <div class="wrapper">
      <div class="left">
        <img src="/images/circleSparkleGroup.svg" alt="" />
      </div>
      <div class="content">
        <div
          class="card"
          v-for="program in items"
          @click="program.command"
          :style="{ backgroundColor: program.color }"
        >
          <div class="top">
            <img src="/images/openBook.svg" style="width: 3rem" alt="" />
            <div class="name-age">
              <p>{{ selectLang(program.name) }}</p>
              <p>{{ program.age }}</p>
            </div>
          </div>
          <p>{{ selectLang(program.description)?.substring(0,50) +'...'}}</p>
          <p style="margin: 0">{{ selectLang(translationModule.learnMore) }} <i class="pi pi-angle-right"></i></p>
        </div>
      </div>
      <div class="right">
        <img src="/images/Arrow 07.svg" alt="" />
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
  line-height: 2rem;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
}
p.header {
  color: var(--text);
}
.content {
  width: 62.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
}
.card {
  width: 18rem;
  color: var(--primary);
  border-radius: 8px;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
}
.top {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.name-age > * {
  margin: 0;
  padding: 0;
  line-height: 1rem;
}
.name-age {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
p {
  margin: 0;
  padding: 0;
  line-height: 1.5rem;
}
@media screen and (max-width: 1300px) {
  .left {
    display: none;
  }
  .right {
    display: none;
  }
}
</style>
