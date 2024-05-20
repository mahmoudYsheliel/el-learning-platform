<script lang="ts" setup>
import "primeicons/primeicons.css";
import { useToken } from "../../stores/token";
import { usePersonalInfo } from "../../stores/token";
import { useRouter } from "vue-router";
import { ref } from "vue";
const token = useToken();
const info = usePersonalInfo();
const router = useRouter();
let logout = () => {
  token.logout();
  router.push("/");
};

const role = ref();
const name = ref();
const balacne = ref();

function personalInformation() {
  if (token.getIsAuthorized) {
    balacne.value = info.getBalance;
    role.value = info.getRole;
    name.value = info.getName;
  }
}

const viewLogout = ref(false);

personalInformation();
</script>

<template>
  <main>
    <div class="logo"><img src="/src/assets/logo.png" alt="" /></div>
    <div class="profile">
      <div class="profile">
        <i class="pi pi-user" @click="viewLogout = !viewLogout"></i>
        <div class="logout" v-if="viewLogout">
          <p @click="logout">Log Out</p>
        </div>
      </div>
      <div class="info">
        <p>{{ name }} | {{ role }}</p>
        <p>BALANCE: {{ balacne }} L.E</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 32px;
  z-index: 2;
  height: 5rem;
}
.profile {
  position: relative;
  color: var(--secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  display: flex;
  gap: 16px;
}
.logo {
  display: flex;
  align-items: center;
}
i {
  background-color: var(--secondary);
  color: var(--primary);
  border-radius: 100%;
  font-size: 36.5%;
  padding: 25%;
  cursor: pointer;
}
img {
  height: 38.75%;
}
p {
  font-size: 1rem;
  line-height: 1.5rem;
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
  padding: 0.5rem 2rem;
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
  border-bottom: 1px solid;
  cursor: pointer;
}
.logout > p:hover {
  opacity: 0.5;
}
</style>
