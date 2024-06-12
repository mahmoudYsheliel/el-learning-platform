<script lang="ts" setup>
import "primeicons/primeicons.css";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { HttpRequester } from "@/lib/APICaller";


const childrenRequester = new HttpRequester("personal_info");
const children = ref<any[]>([]);
childrenRequester.callApi().then((res) => {
  if (res.data.info.children) {
    for (let child of res.data.info.children) {
      const childRequester = new HttpRequester("personal_another_user_info");
      childRequester.callApi({ another_userId: child }).then((res) => {
        if (res.data.info) {
          children.value.push(res.data.info);
          for (let i = 0; i < children.value.length; i++) {
            const groupRequester = new HttpRequester("get_all_program");

            groupRequester.callApi().then((res) => {
              children.value[i].child_group = res.data.program.find(
                (r: any) => r.id == children.value[i]?.child_group
              )?.title;
            });
          }
        }
      });
    }
  }
});

const router =useRouter()
defineProps(["selected"]);
const sidebarPages = [
  {
    label: "Home",
    to: "parentProfile",
    icon: "pi pi-home",
  },
  {
    label: "Children",
    to: "children",
    icon: "pi pi-users",
  },
  {
    label: "Add Child",
    to: "addChild",
    icon: "pi pi-user-plus",
  },
  {
    label: "Subscription",
    to: "subscription",
    icon: "pi pi-arrow-right-arrow-left",
  },
  {
    label: "Settings",
    to: "parentSettings",
    icon: "pi pi-cog",
  },
  {
    label: "Payment Method",
    to: "payment",
    icon: "pi pi-wallet",
  },
];
</script>

<template>
  <main>
    <div
      v-for="(page) in sidebarPages"
      class="element"
      :class="{ selected: selected == page.label }"
      @click="router.push(`/${page.to}`)"
    >
      <i :class="page.icon"></i>
      <span> {{ page.label }}</span>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  background-color: var(--accent1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 2rem;
  border-bottom-right-radius: 1rem;
  border-top-right-radius: 1rem;
}
.element {
  display: flex;
  gap: 1rem;
  align-items: center;
  color: var(--primary);
  cursor: pointer;
  padding-block: 0.75rem;
  padding-left: 1rem;
}
span {
  line-height: 0rem;
  padding-top: 0.5rem;
}
.selected {
  background-color: var(--primary);
  border-top-right-radius: 3rem;
  border-bottom-right-radius: 3rem;
  color: var(--accent1);
}
</style>
