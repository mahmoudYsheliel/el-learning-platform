<script lang="ts" setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import "primeicons/primeicons.css";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import { usePersonalInfo, useToken } from "../../stores/token";
import { pagesToRoute, items } from '@/lib/Modules'
import { selectLang, translationModule } from "@/lib/Translate";
import { useLang } from "../../stores/token";
import Menu from "primevue/menu";


const lang = useLang()
const router = useRouter();
const items2 = ref(items(router))
watch((lang), () => {
  items2.value = items(router)
})


const analysisQuizNotificaiotn = ref(false);
const analysisQuizId = ref('')
const personalInfo = usePersonalInfo();
const personalInfoRequester = new HttpRequester("personal_info");
const token = useToken();
if (token.isAuthorized) {
  personalInfoRequester.callApi().then((res) => {
    if (res?.success) {
      let notification = res?.data?.info?.notifications?.find((not: any) => { return not?.status == 'waiting' && not?.type == 'analysis quiz' })
      if (notification) {
        analysisQuizNotificaiotn.value = true
        analysisQuizId.value = notification?.analysis_quiz_id
      }
      personalInfo.addInfo({
        userType: res?.data?.info?.user_type,
        notifications: res?.data?.info?.notifications,
        id: res?.data?.info?.id,
        firstName: res?.data?.info?.first_name,
        lastName: res?.data?.info?.last_name,
        email: res?.data?.info?.email,
        gender: res?.data?.info?.gender,
      });
    }
  });
}

const menu_button_pt = {
  root: { style: 'padding: 0px; background-color: transparent; border: none;' },
  icon: { style: 'font-size: 1.25rem; color: var(--accent1);padding: 0.5rem;border-radius: 100%;background-color: var(--primary);font-size: 1rem;cursor: pointer;' },
};

const menu = ref();
function show_account_menu(event: MouseEvent) {
  menu.value.toggle(event);
}

defineProps(["selected"]);
const showDialogLogOut = ref(false);

function setLang(selectedLang: string | undefined) {
  if (selectedLang == "English") {
    lang.setLang("en");
  }
  if (selectedLang == "العربية") {
    lang.setLang("ar");
  }
}
</script>
<template>
  <main>
    <Dialog v-model:visible="analysisQuizNotificaiotn" modal :pt="{
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
    }">
      <div style="display: flex;flex-direction: column; align-items: center; gap: 2rem; padding: 2rem;">


        <img style="width: 100%; height: 12rem; border-radius: 0.5rem;" src="/public/images/quizTime.jpeg" alt="" />
        <Button style="font-size: 1.25rem;" :label="selectLang(translationModule.startAnalysisQuiz)" @click="router.push(`/analysisQuiz/${analysisQuizId}`)" />
      </div>
    </Dialog>

    <Dialog v-model:visible="showDialogLogOut" style="width: 25rem; height: 15rem" modal :pt="{
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
    }">
      <i style="
          box-shadow: 0px 0px 4px 0px gray;
          border-radius: 50%;
          background-color: red;
          font-size: 5rem;
        " class="pi pi-exclamation-circle"></i>
      <p>{{ selectLang(translationModule.sureLogout) }}</p>
      <div style="display: flex; gap: 2rem">
        <Button @click="showDialogLogOut = false" style="
            width: 8rem;
            background-color: var(--accent1);
            color: var(--primary);
          " :label=selectLang(translationModule.back) />
        <Button @click="() => {
          showDialogLogOut = false;
          const requester = new HttpRequester('/');
          requester.logOut();
          router.push('/');
        }
          " style="width: 8rem; background-color: red; color: var(--primary)" :label=selectLang(translationModule.logout) />
      </div>
    </Dialog>

    <div class="logo" @click="router.push('/')">
      <img src="/images/log2.png" alt="" />
    </div>
    <div class="options">
      <p v-for="(page, i) in pagesToRoute" class="option" :class="{ selected: selected == i }" @click="router.push(page.to)">
        {{ selectLang(page.name) }}
      </p>
    </div>
    <div v-if="!token.getIsAuthorized" class="profile">
      <span style="cursor: pointer; color: var(--primary);" @click="() => {
        setLang(selectLang(translationModule.language));
      }
        ">{{ selectLang(translationModule.language) }}</span>
      <Button @click="router.push('/login')" :label=selectLang(translationModule.login) class="button" />
      <p class="register" @click="router.push('/signup')">{{ selectLang(translationModule.signup) }}</p>
    </div>
    <div v-if="token.getIsAuthorized" class="profile">
      <span style="cursor: pointer; color: var(--primary);" @click="() => {
        setLang(selectLang(translationModule.language));
      }
        ">{{ selectLang(translationModule.language) }}</span>
      <Button type="button" icon="pi pi-user" @click="show_account_menu" aria-haspopup="true" aria-controls="account_overlay_menu" :pt="menu_button_pt" />
      <Menu ref="menu" :model="items2" :popup="true" />
      <i @click="showDialogLogOut = true" class=" nav-icon pi pi-sign-out"></i>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--accent1);
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  grid-template-rows: 4rem;
  align-items: center;
  padding-inline: 2rem;
  z-index: 2;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-self: start;
  cursor: pointer;
}

.logo>img {
  height: 2.5rem;
}

.options {
  justify-self: center;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 0;
  line-height: 1.5rem;
  font-weight: 500;
  font-size: 1.25rem;
}

.option,
.register {
  color: var(--primary);
  cursor: pointer;
}

.logo-name {
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
  font-size: 1.25rem;
}

.nav-icon {
  color: var(--accent1);
  padding: 0.5rem;
  border-radius: 100%;
  background-color: var(--primary);
  font-size: 1rem;
  cursor: pointer;
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
