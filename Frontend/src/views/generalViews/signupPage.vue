<script setup lang="ts">
import Navbar from "@/components/general/Navbar.vue";
import Options from "@/components/general/Options.vue";
import Footer from "@/components/general/Footer.vue";
import { decodeCredential } from "vue3-google-login";
import { usePersonalInfo } from "@/stores/token";
import "primeicons/primeicons.css";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

import { HttpRequester } from "@/lib/APICaller";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref();
const pass = ref();
const confirmedPass = ref();

const missingInfo = ref(false);
const differentPassword = ref(false);
const usernameEmailTaken = ref(false);
const signupRequester = new HttpRequester("signup");

function signup() {
  if (!email.value || !pass.value || !confirmedPass.value) {
    missingInfo.value = true;
  } else if (pass.value != confirmedPass.value) {
    differentPassword.value = true;
  } else {
    let data = {
      user: {
        email: email.value,
        hashed_pass: pass.value,
        user_type: "Parent",
      },
    };

    signupRequester.callApi(data).then((res) => {
      if (
        res.msg == "email is already used once" 
      ) {
        usernameEmailTaken.value = true;
      } else if (res.success == true) {
        router.push("/login");
      }
    });
  }
}

const callback = (response: any) => {
  // decodeCredential will retrive the JWT payload from the credential
  const userData = decodeCredential(response.credential);
  if ((userData as any).email_verified) {
    let data = {
      user: {
        email: (userData as any).email,
        hashed_pass: "mahmoud2000",
        user_type: "Parent",
      },
    };

    signupRequester.callApi(data).then((res) => {
      if (
        res.msg == "email is already used once" 
      ) {
        usernameEmailTaken.value = true;
      } else if (res.success == true) {
        const loginRequester = new HttpRequester("token");
        const personalInfo = usePersonalInfo();
        loginRequester.login( (userData as any).email , 'mahmoud2000').then((res) => {
         
          if (res.access_token) {
            const personalInfoRequester = new HttpRequester("personal_info");
            personalInfoRequester.callApi().then((res) => {
            
              if (res.success) {
                personalInfo.addInfo({ userType: res.data?.info?.user_type,notifications:[] });
                router.push("/");
              }
            });
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
      <div class="left">
        <img src="/images/login.png" alt="" />
      </div>
      <div class="right">
        <div class="welcome">
          <h1>Welcome back to the</h1>
          <h1>Trace Community</h1>
        </div>
        <div class="google-facebook-wrapper">
          <GoogleLogin :callback="callback" />
        </div>
        <h4 v-if="missingInfo">Some Data Is Missing</h4>
        <h4 v-if="differentPassword">Different Password</h4>
        <h4 v-if="usernameEmailTaken">Email is Taken</h4>
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
            id="input"
            v-model="confirmedPass"
            :feedback="false"
            toggleMask
            placeholder="Confirm Password"
          />
        </div>
        <div class="button">
          <Button @click="signup" label="Register" />
        </div>
        <p style="margin-left: 5rem">
          You have Account?<strong
            @click="router.push('/login')"
            style="cursor: pointer"
            >Login</strong
          >
        </p>
      </div>
    </div>
    <Footer />
  </main>
</template>

<style scoped>
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
  justify-content: space-between;
  align-items: center;
}

.welcome > h1 {
  line-height: 1.5rem;
  margin: 0;
  padding: 0;
  color: black;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-direction: column;
}
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
.google-facebook-wrapper,
.google-facebook-wrapper > * {
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
.google > i {
  color: var(--accent1);
}
.facebook {
  color: white;
  background-color: var(--accent1);
}
.google > p,
.facebook > p {
  line-height: 1rem;
  transform: translate(0, 0.2rem);
  padding: 0;
  margin: 0;
}
button {
  padding: 0.5rem 2rem;
  box-shadow: 0px 34px 40px -8px #7b76f13d;
}
.button {
  display: flex;
  justify-content: end;
  padding-right: 4rem;
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

@media screen and (max-width: 1000px) {
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
