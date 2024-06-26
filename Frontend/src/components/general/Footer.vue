<script lang="ts" setup>
import "primeicons/primeicons.css";
import { ref } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import { useRouter } from "vue-router";
const programRequester = new HttpRequester("get_all_program");

const programs = ref();

const router = useRouter();
const items = ref<any[]>([]);

programRequester.callApi().then((res) => {
  programs.value = res.data.program;
  if (programs.value) {
    for (let program of programs.value) {
      items.value.push({
        name: program.title,
        command: () => {
          router.push(`programs/${program.id}`);
        },
      });
    }
  }
});
const socialMediaIcons = [
  { class: "pi pi-facebook", to: "/" },
  { class: "pi pi-linkedin", to: "/" },
  { class: "pi pi-youtube", to: "/" },
  { class: "pi pi-instagram", to: "/" },
  { class: "pi pi-whatsapp", to: "/" },
];


const pages = [
  { name: "Home", to: "/#Home" },  
  { name: "About Us", to: "/#About" },
  { name: "Contact Us", to: "/#contact" },
  { name: "Schools", to: "/" },
  { name: "FQAs", to: "/" },
  { name: "Privacy Policy", to: "/" },
  { name: "Terms and Conditions", to: "/" },
];
</script>

<template>
  <main>
    <div class="wrapper">
      <img src="/images/logo3.png" alt="" />
      <div class="programs">
        <h4>Programs</h4>
        <p v-for="program in items" @click="program?.command">{{ program.name }}</p>
      </div>
      <div class="pages">
        <h4>Pages</h4>
        <p v-for="page in pages" @click="router.push(page.to)">{{ page.name }}</p>
      </div>
      <div class="socialMedia">
        <div>
          <i class="pi pi-envelope"></i> <span>help@armstrong.courses</span>
        </div>
        <div>
          <i
            v-for="socialMediaIcon in socialMediaIcons"
            :class="socialMediaIcon.class"
          >
          </i>
        </div>
      </div>
    </div>
    <div class="copyRight">
      <p>Copyright © 2024 Trace LLC</p>
      <p>All Rights Reserved - Proudly Created by MYS</p>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 1rem 5rem;
  background-color: var(--accent1);
  color: var(--primary);
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: start;
  gap: 5rem;
}
p {
  padding: 0;
  margin: 0;
  line-height: 1.5rem;
}
i {
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
@media screen and (max-width: 500px) {
  img {
    width: 75%;
  }
}
</style>
