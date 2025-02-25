<script lang="ts" setup>
import "primeicons/primeicons.css";
import { ref } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import { useRouter } from "vue-router";
import { selectLang,translationModule } from "@/lib/Translate";
import { socialMediaIcons,pages } from "@/lib/Modules";
const programRequester = new HttpRequester("get_all_program");

const programs = ref<any[]>([]);
const router = useRouter();
const items = ref<any[]>([]);

programRequester.callApi().then((res) => {
  programs.value = res?.data?.program;
  if (programs.value) {
    for (let program of programs.value) {
      items.value.push({
        name: program?.title,
        command: () => {
          router.push(`/programs/${program?.id}`);
        },
      });
    }
  }
});



</script>

<template>
  <main>
    <div class="wrapper">
      <img class="logo" src="/images/logo3.png" alt="" />
      <div class="programs">
        <h4>{{ selectLang(translationModule.programs) }}</h4>
        <p v-for="program in items" @click="program?.command">
          {{ selectLang(program.name)}}
        </p>
      </div>
      <div class="pages">
        <h4>{{ selectLang(translationModule.pages) }}</h4>
        <p v-for="page in pages" @click="router.push(page.to)">
          {{ selectLang(page.name) }}
        </p>
      </div>
      <div class="socialMedia">
        <div style="cursor: pointer">
          <a  style="color: var(--primary); text-decoration: none;" href="mailto:Info@traceedtech.com?subject=Trace Platform&body=I hope this email finds you well:">
            <i class="pi pi-envelope"></i>
            <span >Info@traceedtech.com</span></a
          >
        </div>
        <div>
          <a
            v-for="socialMediaIcon in socialMediaIcons"
            :href="socialMediaIcon.to"
          >
            <i :class="socialMediaIcon.class" style="cursor: pointer"> </i>
          </a>
          <a href="https://www.tiktok.com/@traceeducation?_t=8m2j5N7d7Jt&_r=1">
            <img class="icon" src="/public/images/tiktok.png" alt=""
          /></a>
        </div>
      </div>
     
    </div>
    <div style="display: flex; justify-content: space-between; gap: 5rem;margin-top: 2rem;">{{ selectLang(translationModule.copyRight) }}
        <div  style="display: flex; gap: 2rem;">
           <span style="cursor: pointer;" @click="router.push('PrivacyPolicy')"> {{ selectLang(translationModule.privacy) }}</span> 
           <span style="cursor: pointer;" @click="router.push('TermConditions')"> {{ selectLang(translationModule.terms) }}</span> 
        </div>
      </div>
    <!-- <div class="copyRight">
      <p>Copyright © 2024 Trace LLC</p>
      <p>All Rights Reserved - Proudly Created by MYS</p>
    </div> -->
  </main>
</template>

<style scoped>
main {
  padding: 1rem 2rem;
  background-color: var(--accent1);
  color: var(--primary);
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: start;
  gap: 2rem;
}
p {
  padding: 0;
  margin: 0;
  line-height: 1.5rem;
}
i,
.icon {
  color: var(--secondary);
  padding: 0.5rem;
  background-color: var(--primary);
  border-radius: 100%;
  margin: 0.5rem;
}
.programs > p,
.pages > p {
  cursor: pointer;
}
.copyRight {
  margin-top: 2rem;
}
.icon {
  color: var(--secondary);
  padding: 0.5rem;
  background-color: var(--primary);
  border-radius: 100%;
  transform: translateY(1rem);
}
@media screen and (max-width: 500px) {
  .logo {
    width: 75%;
  }
}
</style>
