<script lang="ts" setup>
import Button from "primevue/button";
import { ref } from "vue";
import { usePersonalInfo } from "@/stores/token";
import { useToken } from "@/stores/token";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
const prop = defineProps(["image", "title", "price", "firstLesson"]);
const notEnoughMoney = ref(false);
const info = usePersonalInfo();
const token = useToken();
const router = useRouter();
const route = useRoute();
function enroll() {
  if (!token.getIsAuthorized) {
    router.push("/login");
  } else if (info.getBalance < prop.price) {
    notEnoughMoney.value = true;
  } else {
    const date = new Date();
    axios
      .post(
        "http://127.0.0.1:8000/create_enrollment",
        {
          new_enrollment: {
            course_id: route.params.id,
            created_at: date.toISOString(),
            progress: {},
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token.getToken}`,
          },
        }
      )
      .then((res: any) => {
        if (res.data.success) {
          let id = res.data.data.enrollment_id;
          router.push(
            `/viewCoursePage/${route.params.id}/${id}/${prop.firstLesson}`
          );
        }
      });
  }
  axios
    .post(
      "http://127.0.0.1:8000/personal_info",
      {},
      {
        headers: {
          Authorization: `Bearer ${token.getToken}`,
        },
      }
    )
    .then((res: any) => {
      let data = res.data.data.info;
      if (data) {
        info.addInfo(data["balance"], data["username"], data["role"]);
        info.saveToLocalStorage();
      }
    });
}
</script>

<template>
  <main>
    <div
      v-bind:style="{ 'background-image': 'url(' + image + ')' }"
      class="container"
    >
      <div class="small-container">
        <h1>{{ title }}</h1>
        <img :src="image" alt="" />
      </div>
      <Button label="Enroll Now" @click="enroll" />
      <h2 v-if="notEnoughMoney">Not Enough Money</h2>
    </div>
  </main>
</template>

<style scoped>
.container {
  padding: 55px 0;
  position: relative;
  background: #3f4f54;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: multiply;
}
.small-container {
  width: 80%;
  height: 61.75%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h1 {
  color: var(--secondary);
  font-size: 2rem;
}
img {
  width: 20%;
  border-radius: 8px;
}
h2 {
  color: #b881b8;
}
button {
  font-size: 1.5rem;
  padding-inline: 4rem;
}
</style>
