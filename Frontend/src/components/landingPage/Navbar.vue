<script lang="ts" setup>
import Button from "primevue/button";
import "primeicons/primeicons.css";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { useToken } from "../../stores/token";

const token = useToken();
defineProps(["selected"]);
const router = useRouter();

const socialMediaIcons = [
  { class: "pi pi-facebook", to: "/" },
  { class: "pi pi-linkedin", to: "/" },
  { class: "pi pi-youtube", to: "/" },
  { class: "pi pi-instagram", to: "/" },
];
const pagesToRoute = [
  { name: "Home", to: "/" },
  { name: "About", to: "/" },
  { name: "Courses", to: "/" },
  { name: "Contact", to: "/" },
];
</script>
<template>
  <main>
    <div class="socialMediaIcons">
      <i v-for="icon in socialMediaIcons" :class="icon.class"></i>
    </div>
    <div class="options">
      <span
        v-for="(page, i) in pagesToRoute"
        class="option"
        :class="{ selected: selected == i }"
        @click="router.push(page.to)"
        >{{ page.name }}</span
      >
    </div>
    <div class="profile">
      <Button @click="router.push('/login')" label="Login"/>
      <span @click="router.push('/signup')">Register</span>
      <i class="pi pi-shopping-cart"></i>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--accent1);
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1.5fr;
  grid-template-rows: 5.5rem;
  align-items: center;
  padding-inline: 5rem;
  z-index: 2;
}
.options {
  display: flex;
  flex-direction: row;
  gap: 32px;
  padding: 0;
  line-height: 1.25rem;
  font-weight: 500;
}
span {
  font-size: 1.25rem;
  color: var(--primary);
  cursor: pointer;
}
.profile {
  justify-self: end;
  position: relative;
  color: var(--secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 1.25rem;
  height: 100%;
}
.socialMediaIcons{
  display: flex;
  gap: 1rem;

}
.logo {
  display: flex;
  align-items: center;
}
p {
  line-height: 0.5rem;
}
i {
  color: var(--primary);
  font-size: 1.5rem;
  cursor: pointer;
}
.selected {
  border-bottom: 2px solid var(--accent3);
}
.logout {
  position: absolute;
  top: 100%;
  left: 0;
  border-radius: 8px;
  background-color: var(--secondary);
  color: var(--text);
  width: max-content;
  margin-top: 0.5rem;
  padding: 0rem 2rem;
  z-index: 2;
}
.logout::before {
  content: "";
  width: 1rem;
  height: 1rem;
  background-color: var(--secondary);
  position: absolute;
  top: 0;
  left: 0.5rem;
  transform: rotate(45deg);
}
.logout > p {
  cursor: pointer;
}
.logout > p:hover {
  opacity: 0.5;
}
button{
  background-color: var(--primary);
  color: var(--accent1);
}
</style>
