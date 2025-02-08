<script setup lang="ts">
import Navbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { decodeCredential } from "vue3-google-login";
import { usePersonalInfo } from "@/stores/token";
import { selectLang, translationModule } from "@/lib/Translate";
import "primeicons/primeicons.css";
import Student from '../../icons/Student.vue'
import Parent from '../../icons/Parent.vue'
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Calendar from "primevue/calendar";
import { HttpRequester } from "@/lib/APICaller";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const personalInfo = usePersonalInfo()

const email = ref();
const pass = ref();
const confirmedPass = ref();
const role = ref('')
const birthDate = ref()
const phone =ref('')

const worningMessage = ref('')
const signupRequester = new HttpRequester("signup");

function signup() {
  if (!email.value || !pass.value || !confirmedPass.value || !birthDate.value || !phone.value) {
    worningMessage.value = selectLang(translationModule.dataMissing) ?? '';
  } else if (pass.value != confirmedPass.value) {
    worningMessage.value = selectLang(translationModule.diffPass) ?? '';
  }
  else if (!testValidPass(pass.value)) {
    worningMessage.value = selectLang(translationModule.weakPass) ?? '';
  }
  else if (!isValidEmail(email.value)) {
    worningMessage.value = selectLang(translationModule.notValidEmail) ?? '';
  }
  else if (role.value != 'Child' && role.value != 'Parent') {
    worningMessage.value = selectLang(translationModule.noRoleSelected) ?? '';
  }
  else {
    let data = {
      user: {
        email: email.value,
        hashed_pass: pass.value,
        user_type: role.value,
        birth_day:birthDate.value,
        phone_number:phone.value
      },
    };

    signupRequester.callApi(data).then((res) => {
      if (res.msg == "email is already used once") {
        worningMessage.value = selectLang(translationModule.emailTaken) ?? '';
      } else if (res?.success == true) {
        login();
      }
    });
  }
}

const callback = (response: any) => {
  // decodeCredential will retrive the JWT payload from the credential
  if (role.value != 'Child' && role.value != 'Parent') {
    worningMessage.value = selectLang(translationModule.noRoleSelected) ?? '';
    return
  }
  const userData = decodeCredential(response.credential);
  if ((userData as any).email_verified) {
    let data = {
      user: {
        email: (userData as any).email,
        hashed_pass: "mahmoud2000",
        user_type: role.value,
      },
    };

    signupRequester.callApi(data).then((res) => {
      if (res.msg == "email is already used once") {
        worningMessage.value = selectLang(translationModule.emailTaken) ?? '';
      } else if (res?.success == true) {
        const loginRequester = new HttpRequester("token");
        const personalInfo = usePersonalInfo();
        loginRequester
          .login((userData as any).email, "mahmoud2000")
          .then((res) => {
            if (res.access_token) {
              const personalInfoRequester = new HttpRequester("personal_info");
              personalInfoRequester.callApi().then((res) => {
                if (res?.success) {
                  personalInfo.addInfo({
                    userType: res?.data?.info?.user_type,
                    notifications: [],
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
    });
  }
};
function testValidPass(password: string) {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const isLongEnough = password.length >= 8;

  return hasUpper && hasLower && hasDigit && isLongEnough;
}
function isValidEmail(email: string) {
  // Regular expression for validating an email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}




function login() {
  const loginRequester = new HttpRequester("token");
  loginRequester.login(email.value, pass.value).then((res) => {
    if (res?.access_token) {
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

</script>

<template>
  <main>
    <Navbar />
    <Options />
    <div class="container">
      <div class="left borderRigth">
        <!-- <img src="/images/login.png" alt="" /> -->

        <h1 style="color: var(--header);">{{ selectLang(translationModule.selectRole) }}</h1>
        <div class="roles">
          <div class="role" :class="{ selected: (role == 'Parent') }" @click="role = 'Parent'">
            <div class="role_name">
              <h2 style="color: var(--accent2);">{{ selectLang(translationModule.parent) }}</h2>
              <Parent style="width: 100%;height: 100%;" color="var(--accent1)" />
            </div>
            <div class="features">
              <p>{{ selectLang(translationModule.parentRole) }} </p>
            </div>
          </div>

          <div class="role" :class="{ selected: (role == 'Child') }" @click="role = 'Child'">
            <div class="role_name">
              <h2 style="color: var(--accent2);">{{ selectLang(translationModule.student) }}</h2>
              <Student style="width: 100%;height: 100%;" color="var(--accent1)" />
            </div>
            <div class="features">
              <p>{{ selectLang(translationModule.studentRole) }}</p>
            </div>
          </div>
        </div>

      </div>
      <div class="right">
        <div class="welcome">
          <h1>{{ selectLang(translationModule.welcome) }}</h1>
          <h1>{{ selectLang(translationModule.traceCommunity) }}</h1>
        </div>
        <div class="google-facebook-wrapper">
          <GoogleLogin :callback="callback" />
        </div>
        <h4 v-if="worningMessage">
          {{ worningMessage }}
        </h4>

        <div class="wrapper">
          <InputText style="width: 100%;" type="email" class="input" v-model="email" :placeholder="selectLang(translationModule.email)" />
          <Password toggleMask v-model="pass" :placeholder="selectLang(translationModule.pass)" @change="worningMessage = ''">
            <template #header>
              <h6>Pick a password</h6>
            </template>
            <template #footer>
              <Divider />
              <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
              </ul>
            </template>
          </Password>
          <Password class="input" v-model="confirmedPass" :feedback="false" toggleMask :placeholder="selectLang(translationModule.confirmPass)" @change="worningMessage = ''" />
          <Calendar style="width: 100%;" v-model="birthDate" :placeholder="selectLang(translationModule.birthDate)" />
          <InputText style="width: 100%;" type="email" class="input" v-model="phone" :placeholder="selectLang(translationModule.phone)" />
        </div>
        <div class="button">
          <Button @click="signup" :label="selectLang(translationModule.signup)" />
        </div>
        <p>
          {{ selectLang(translationModule.haveAccount) }}
          <strong @click="router.push('/login')" style="cursor: pointer;text-decoration: underline;color: var(--accent1);">
            {{ selectLang(translationModule.login) }}
          </strong>
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
  width: 85%;
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
  flex-direction: column;
}

h1,
h2 {
  margin: 0;
}

h2 {
  color: var(--accent1);
}

.role_name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32%;
}

.role {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  /* Shadow for the raised effect */
  transition: transform 0.2s, box-shadow 0.2s;
  /* Smooth interaction effect */
  padding: 1rem;
  margin-bottom: 1rem;
  margin-inline: 1rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.selected {
  border: none;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25), 0 10px 16px rgba(0, 0, 0, 0.08);
  /* Enhance shadow on hover */
  transition: transform 1s, box-shadow 0.2s;
  /* Smooth interaction effect */
  scale: 1.02;
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
  padding: 0.5rem 2rem;
  box-shadow: 0px 10px 20px -8px #7b76f13d;
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

.role {
  font-size: 0.875rem;
}

.role p {
  margin: 0;
  padding: 0;
}

@media screen and (max-width: 1250px) {
  .container {
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-top: 2rem;
  }

  .left,
  .borderRigth {
    border: none;
  }

  .roles {
    margin-bottom: 2rem;
    display: flex;

  }

  .role {
    display: flex;
    flex-direction: column;
    margin: 0.5rem;

  }

  .welcome {
    display: none;
  }

  .button {
    margin-bottom: 2rem;
  }

}
</style>
