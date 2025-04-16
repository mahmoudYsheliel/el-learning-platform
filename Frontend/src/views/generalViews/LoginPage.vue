<script setup lang="ts">
import Navbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { usePersonalInfo } from "@/stores/token";
import { decodeCredential } from "vue3-google-login";
import { selectLang, translationModule } from "@/lib/Translate";
import { useLang } from "@/stores/token";
const lang = useLang();

import "primeicons/primeicons.css";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

import { HttpRequester } from "@/lib/APICaller";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const personalInfo = usePersonalInfo();
const email = ref();
const pass = ref();

const missingInfo = ref(false);
const NoSuchUser = ref(false);
const loginRequester = new HttpRequester("token");

function login() {
  if (!email.value || !pass.value) {
    missingInfo.value = true;
  } else {
    loginRequester.login(email.value, pass.value).then((res) => {

      if (res?.msg == "no such user") {
        NoSuchUser.value = true;
      } else if (res?.access_token) {
        const personalInfoRequester = new HttpRequester("personal_info");
        personalInfoRequester.callApi().then((res) => {
          if (res?.success) {
            personalInfo.addInfo({
              userType: res?.data?.info?.user_type,
              notifications: res?.data?.info?.notifications,
              id: res?.data?.info?.id,
              firstName: res?.data?.info?.first_name,
              lastName: res?.data?.info?.last_name,
              email: res?.data?.info?.email,
              gender: res?.data?.info?.gender,
            });
            router.push("/");
          }
        });
      }
    });
  }
}

const callback = (response: any) => {
  // decodeCredential will retrive the JWT payload from the credential
  const userData = decodeCredential(response.credential);
  const emailVerified = (userData as any).email_verified;
  if ((userData as any).email_verified) {
    const loginRequester = new HttpRequester("token");
    const personalInfo = usePersonalInfo();
    loginRequester.login((userData as any).email, "mahmoud2000").then((res) => {
      if (res.msg == "no such user") {
        NoSuchUser.value = true;
      } else if (res.access_token) {
        const personalInfoRequester = new HttpRequester("personal_info");
        personalInfoRequester.callApi().then((res) => {
          if (res?.success) {
            personalInfo.addInfo({
              userType: res?.data?.info?.user_type,
              notifications: res?.data?.info?.notifications,
              id: res?.data?.info?.id,
              firstName: res?.data?.info?.first_name,
              lastName: res?.data?.info?.last_name,
              email: res?.data?.info?.email,
              gender: res?.data?.info?.gender
            });
            router.push("/");
          }
        });
      }
    });
  }
};
</script>

<template>
  <main>
    <Navbar />
    <Options />
    <div class="container">
      <div class="left borderRigth">
        <img src="/images/login.png" alt="" />
      </div>
      <div class="right">
        <div class="welcome">
          <h1>{{ selectLang(translationModule.welcomeBack) }}</h1>
          <h1>{{ selectLang(translationModule.traceCommunity) }}</h1>
        </div>
        <div class="google-facebook-wrapper">
          <GoogleLogin :callback="callback" />
        </div>
        <h4 v-if="missingInfo">
          {{ selectLang(translationModule.dataMissing) }}
        </h4>
        <h4 v-if="NoSuchUser">
          {{ selectLang(translationModule.userNotExist) }}
        </h4>
        <div class="wrapper">
          <InputText style="width: 100%;" type="email" class="input" v-model="email" :placeholder="selectLang(translationModule.email)" />
          <Password class="input" v-model="pass" :feedback="false" toggleMask :placeholder="selectLang(translationModule.pass)" />
          <!-- <div class="forgotPassCon">
            <p @click="router.push('forgotPassword')">{{ selectLang(translationModule.forgeotPass) }}</p>
          </div> -->
        </div>
        <div class="button">
          <Button @click="login" :label="selectLang(translationModule.login)" />
        </div>
        <p>
          {{ selectLang(translationModule.noAccount) }}
          <strong @click="router.push('/signup')" style="cursor: pointer;text-decoration: underline;color: var(--accent1);">
            {{ selectLang(translationModule.signup) }}</strong>
        </p>
      </div>
    </div>
    <Footer />
  </main>
</template>

<style scoped>
.forgotPassCon>p{
  margin: 0;
  color: var(--accent1);
  font-weight: 700;
  text-decoration: underline;
  font-size: 0.875rem;
  cursor: pointer;
}
.forgotPassCon{
  width: 100%;
}
main {
  min-height: 100%;
}

.container {
  margin-inline: auto;
  width: 75%;
  color: var(--text);
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-block: 5rem;
}

.left {
  display: flex;
  align-items: start;
  justify-content: start;
  border-right: 0.25rem solid rgba(0, 0, 0, 0.2);
}

.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin-inline: auto;
  gap: 3rem;
}

.welcome>h1 {
  line-height: 2rem;
  margin: 0;
  padding: 0;
  color: var(--header);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-direction: column;
  width: fit-content;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.google-facebook-wrapper,
.google-facebook-wrapper>* {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.google,
.facebook {
  border-radius: 8px;
  padding: 0.5rem;
  border: 2px solid var(--accent1);
  cursor: pointer;
}

.google>i {
  color: var(--accent1);
}

.facebook {
  color: white;
  background-color: var(--accent1);
}

.google>p,
.facebook>p {
  line-height: 1rem;
  transform: translate(0, 0.2rem);
  padding: 0;
  margin: 0;
}

button {
  width: 100%;
  box-shadow: 0px 10px 20px -8px #7b76f13d;
  font-size: 1.25rem;
  padding: 0;
}


.button {
  display: flex;
  justify-content: end;
  width: 100%;
}

h4 {
  text-align: center;
  color: red;
  margin: 0;
}

input {
  width: 100%;
}

@media screen and (max-width: 1250px) {
  .container {
    width: 80%;
    height: fit-content;
    grid-template-columns: 1fr;
    grid-template-rows: 40rem;
  }

  .left {
    display: none;
  }

  .button {
    margin-bottom: 2rem;
  }
}
</style>
