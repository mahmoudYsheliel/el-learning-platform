<script lang="ts" setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import "primeicons/primeicons.css";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { useToken } from "../../stores/token";
import SplitButton from "primevue/splitbutton";
import { ref, computed } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import { usePersonalInfo } from "../../stores/token";

const personalInfo = usePersonalInfo();

const token = useToken();
defineProps(["selected"]);
const showDialogLogOut = ref(false);
const router = useRouter();

const pagesToRoute = [
  { name: "Home", to: "/#Home" },
  { name: "Courses", to: "/#Courses" },
  { name: "About", to: "/#About" },
  { name: "Contact", to: "/#Contact" },
];
const items = computed(() => {
  if(personalInfo.getInfo?.userType == "Admin"){
    return [
      {
        label: "Manage Requests",
        command: () => {
          router.push("/manageRequests");
        },
      },
      {
        label: "Log out",
        command: () => {
          showDialogLogOut.value = true;
        },
      }]
  }
  else if (personalInfo.getInfo?.userType == "Parent") {
    return [
      {
        label: "Home",

        command: () => {
          router.push("/parentHome");
        },
      },
      {
        label: "Children Progress",
        command: () => {
          router.push("/childrenProgress");
        },
      },
      {
        label: "Children Courses",
        command: () => {
          router.push("/childrenCourses");
        },
      },
      {
        label: "Add Child",
        command: () => {
          router.push("/addChild");
        },
      },
      {
        label: "My Subscriptions",
        command: () => {
          router.push("/subscription");
        },
      },
      {
        label: "My Settings",
        command: () => {
          router.push("/parentSettings");
        },
      },
      {
        label: "Log out",
        command: () => {
          showDialogLogOut.value = true;
        },
      },
    ];
  } else if (personalInfo.getInfo?.userType == "Child") {
    return [
      {
        label: "My Courses",
        command: () => {
          router.push("/childCourses");
        },
      },
      {
        label: "Log out",
        command: () => {
          showDialogLogOut.value = true;
        },
      },
    ];
  }
  return [{
        label: "Log out",
        command: () => {
          showDialogLogOut.value = true;
        },
      }]
});
</script>
<template>
  <main>
    <Dialog
      v-model:visible="showDialogLogOut"
      style="width: 500px; height: 300px"
      modal
      :pt="{
        mask: {
          style: 'backdrop-filter: blur(2px)',
        },
        header: {
          style: 'display:none',
        },
        content: {
          style:
            'margin-block:auto; display: flex; flex-direction: column; align-items: center; justify-content: center;',
        },
      }"
    >
      <i
        style="
          box-shadow: 0px 0px 4px 0px gray;
          border-radius: 50%;
          background-color: red;
          font-size: 5rem;
        "
        class="pi pi-exclamation-circle"
      ></i>
      <p>Are you sure to log out</p>
      <div style="display: flex; gap: 2rem">
        <Button
          @click="showDialogLogOut = false"
          style="
            width: 8rem;
            background-color: var(--accent1);
            color: var(--primary);
          "
          label="Back"
        />
        <Button
          @click="
            () => {
              showDialogLogOut = false;
              const requester = new HttpRequester('/');
              requester.logOut();
              router.push('/');
            }
          "
          style="width: 8rem; background-color: red; color: var(--primary)"
          label="Log out"
        />
      </div>
    </Dialog>

    <div class="logo" @click="router.push('/')">
      <img src="/images/log2.png" alt="" />
      <p class="logo-name">Trace Education</p>
    </div>
    <div class="options">
      <p
        v-for="(page, i) in pagesToRoute"
        class="option"
        :class="{ selected: selected == i }"
        @click="router.push(page.to)"
      >
        {{ page.name }}
      </p>
    </div>
    <div v-if="!token.getIsAuthorized" class="profile">
      <Button @click="router.push('/login')" label="Login" />
      <p class="register" @click="router.push('/signup')">Register</p>
    </div>
    <div v-if="token.getIsAuthorized" class="profile">
      <SplitButton severity="secondary" :model="items" @click="items[0]?.command" label="My Account" />
      <i style="cursor: pointer" class="pi pi-shopping-cart"></i>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--accent1);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 5rem;
  align-items: center;
  padding-inline: 4rem;
  z-index: 2;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-self: start;
  cursor: pointer;
}
.logo > img {
  height: 2.5rem;
}
.options {
  justify-self: center;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 0;
  line-height: 1rem;
  font-weight: 500;
}
.option,
.register {
  font-size: 1.25rem;
  color: var(--primary);
  cursor: pointer;
}
.logo-name {
  font-size: 1.25rem;
  color: var(--primary);
}
.profile {
  justify-self: end;
  color: var(--secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 1.25rem;
}

i {
  color: var(--primary);
  font-size: 1.5rem;
}
.selected {
  border-bottom: 2px solid var(--accent3);
}

button {
  background-color: var(--primary);
  color: var(--accent1);
}
@media screen and (max-width: 1000px) {
  .options {
    display: none;
  }
  main {
    display: flex;
    justify-content: space-between;
    padding-inline: 2rem;
  }
}

@media screen and (max-width: 500px) {
  .logo-name {
    display: none;
  }
}
</style>
