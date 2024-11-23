<script setup lang="ts">
import Dialog from "primevue/dialog";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Button from "primevue/button";
import { HttpRequester } from "@/lib/APICaller";
const router = useRouter();
const prop = defineProps(["showDialog"]);
const emit = defineEmits(["cancel"]);
import InputText from "primevue/inputtext";
import Password from "primevue/password";

const email = ref();
const pass = ref();
const confirmPass = ref();
const msg = ref("");

function cancel() {
  emit("cancel");
}
function addInstructor() {
  if (!email.value || !confirmPass.value || !pass.value) {
    msg.value = "Some Fields are Missing";
    setTimeout(() => {
      msg.value = "";
    }, 5000);
  } else if (confirmPass.value != pass.value) {
    msg.value = "Passwords are Different";
    setTimeout(() => {
      msg.value = "";
    }, 5000);
  } else {
    let data = {
      user: {
        email: email.value,
        hashed_pass: pass.value,
        user_type: "Instructor",
      },
    };
    new HttpRequester("signup").callApi(data).then((res) => {
        if (res?.success==false){
            msg.value = res?.msg;
        }
        if(res?.success){
            router.push(`/editInstructor/${res?.data?.user_id}`)
        }
     
    });
  }
}
</script>

<template>
  <Dialog
    v-model:visible="prop.showDialog"
    modal
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
  >
    <template #container="{ closeCallback }">
      <div class="dialog">
        <h3 v-if="msg" style="color: red">{{ msg }}</h3>
        <div class="wrapper">
          <div class="wrapper">
            <InputText
              type="email"
              class="input"
              v-model="email"
              placeholder="Email"
            />
            <Password
              class="input"
              v-model="pass"
              :feedback="false"
              toggleMask
              placeholder="Password"
            />
            <Password
              class="input"
              v-model="confirmPass"
              :feedback="false"
              toggleMask
              placeholder="Consirm Password"
            />
          </div>
        </div>

        <div class="btn-container">
          <Button
            label="Add Instructor"
            style="width: 10rem"
            @click="addInstructor"
          />
          <Button
            label="Cancel"
            style="width: 10rem; background-color: red"
            @click="cancel"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
.dialog {
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.btn-container {
  display: flex;
  gap: 2rem;
}
</style>
