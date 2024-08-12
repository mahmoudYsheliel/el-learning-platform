<script lang="ts" setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import "primeicons/primeicons.css";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import SplitButton from "primevue/splitbutton";
import { ref } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import { usePersonalInfo, useToken } from "../../stores/token";
import {pagesToRoute,items} from '@/lib/Modules'
import { selectLang,translationModule } from "@/lib/Translate";


const analysisQuizNotificaiotn = ref(false);
const analysisQuizId = ref('')
const personalInfo = usePersonalInfo();
const personalInfoRequester = new HttpRequester("personal_info");
const token = useToken();
if (token.isAuthorized) {
  personalInfoRequester.callApi().then((res) => {
    if (res?.success) {
      let notification=res.data?.info?.notifications?.find((not:any)=>{return not?.status=='waiting' && not?.type=='analysis quiz'})
      if (notification){
        analysisQuizNotificaiotn.value=true
        analysisQuizId.value=notification?.analysis_quiz_id
      }
      personalInfo.addInfo({
        userType: res.data?.info?.user_type,
        notifications: res.data?.info?.notifications,
      });
    }
  });
}

defineProps(["selected"]);
const showDialogLogOut = ref(false);
const router = useRouter();




</script>
<template>
  <main>
    <Dialog
      v-model:visible="analysisQuizNotificaiotn"
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
      <div style="display: flex;flex-direction: column; align-items: center; gap: 2rem; padding-inline: 5rem;">
        <h1>{{ selectLang(translationModule.startAnalysisQuiz) }}</h1>

        <img
          style="width: 10rem; height: 10rem; border-radius: 2rem"
          src="/public/images/quizTime.png"
          alt=""
        />
        <Button :label="selectLang(translationModule.startAnalysisQuiz)" @click="router.push(`/analysisQuiz/${analysisQuizId}`)"/>
      </div>
    </Dialog>

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
      <p>{{ selectLang(translationModule.sureLogout) }}</p>
      <div style="display: flex; gap: 2rem">
        <Button
          @click="showDialogLogOut = false"
          style="
            width: 8rem;
            background-color: var(--accent1);
            color: var(--primary);
          "
          :label=selectLang(translationModule.back)
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
          :label=selectLang(translationModule.logout)
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
        {{selectLang(page.name) }}
      </p>
    </div>
    <div v-if="!token.getIsAuthorized" class="profile">
      <Button @click="router.push('/login')" :label=selectLang(translationModule.login) class="button" />
      <p class="register" @click="router.push('/signup')">{{ selectLang(translationModule.signup) }}</p>
    </div>
    <div v-if="token.getIsAuthorized" class="profile">
      <SplitButton
      style="direction: ltr;"
        severity="secondary"
        :model="items"
        @click="items[0]?.command()"
        :label=selectLang(translationModule.myAccount)
        :class="{
          splitButton: personalInfo?.info?.notifications?.some((n) => {
            return n.status == 'waiting';
          }),
        }"
      />
      <Button @click="showDialogLogOut=true" :label=selectLang(translationModule.logout) />
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
h1 {
  color: var(--accent1);
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

.button {
  background-color: var(--primary);
  color: var(--accent1);
}
.splitButton::after {
  content: "";
  width: 1rem;
  height: 1rem;
  background-color: var(--wrongAnswer);
  border-radius: 100%;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
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
