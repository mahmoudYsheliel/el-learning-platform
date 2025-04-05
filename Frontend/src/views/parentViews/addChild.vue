<script lang="ts" setup>
import ParentSidebar from "../../components/parent/general/ParentSidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { ref } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import router from "@/router";
import { selectLang, translationModule } from "@/lib/Translate";
import { grades, genders, educationSystems } from "@/lib/Modules";
import { usePersonalInfo,useToken } from "@/stores/token";
const firstName = ref();
const lastName = ref();
const email = ref();
const pass = ref();
const confirmPass = ref();
const gender = ref();
const birtDate = ref();
const childGroup = ref();
const educationSystem = ref();
const grade = ref();
const message = ref();
const showDialog = ref(false);
const groups = ref<any[]>([]);
let childId = ''

const groupsRequester = new HttpRequester("get_all_program");
groupsRequester.callApi().then((res) => {
  if (res?.success) {
    for (let program of res?.data?.program) {
      groups.value.push({
        label: selectLang(program?.title),
        code: program?.id,
      });
    }
  }
});

function addChildFunc() {
  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !pass.value ||
    !confirmPass.value ||
    !gender.value ||
    !birtDate.value ||
    !grade.value ||
    !educationSystem.value
  ) {
    message.value = selectLang(translationModule.dataMissing);
  } else if (pass.value !== confirmPass.value) {
    message.value = selectLang(translationModule.diffPass);
  } else {
    const addChildRequester = new HttpRequester("add_child");
    let date = {
      user: {
        email: email.value,
        hashed_pass: pass.value,
        user_type: "Child",
        first_name: firstName.value,
        last_name: lastName.value,
        gender: gender.value?.value,
        birth_day: birtDate.value,
      },
      child: {
        user_id: "",
        grade: grade.value?.value,
        child_group: childGroup.value?.code,
        education_system: educationSystem.value?.value,
      },
    };
    addChildRequester.callApi(date).then((res) => {
      if (res?.success) {
        showDialog.value = true;
        childId = res?.data?.child_user_id
      } else if (res.msg == "email is already used once") {
        message.value = selectLang(translationModule.emailTaken);
      }
    });
  }
}


function switchChild(id: string) {

  const token = useToken();
  const switchRequester = new HttpRequester("switch_to_child");
  switchRequester.callApi({ child_id: id }).then((res) => {
    if (res?.success) {
      token.logout();
      token.addToken(res?.data?.access_token);
      const personalInfoRequester = new HttpRequester("personal_info");
      const personalInfo = usePersonalInfo();
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
  <Navbar />
  <div class="container">
    <Dialog
      modal
      v-model:visible="showDialog"
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(2px)',
        },
        header: { style: 'display:none' },
      }"
    >
      <div class="dialog-container">
        <h3>{{ selectLang(translationModule.childAdded) }}</h3>
        <h3>{{ selectLang(translationModule.loginWith) }}</h3>
        <h3 style="color: var(--secondary)">{{ email }} Account</h3>
        <h3>{{ selectLang(translationModule.toStartJourney) }}</h3>
        <Button
          :label="selectLang(translationModule.switchToChild)"
          @click="()=>{switchChild(childId)}"
        />
      </div>
    </Dialog>

    <ParentSidebar class="sidebar" selected="addChild" />
    <div class="big-wrapper">
      <h2>{{ message }}</h2>
      <div class="wrapper">
        <div class="element">
          <p>{{ selectLang(translationModule.firstName) }}</p>
          <InputText v-model="firstName" />
        </div>
        <div class="element">
          <p>{{ selectLang(translationModule.lastName) }}</p>
          <InputText v-model="lastName" />
        </div>

        <div class="element">
          <p>{{ selectLang(translationModule.email) }} / {{ selectLang(translationModule.username) }}</p>
          <InputText v-model="email" />
        </div>
        <div class="element">
          <p>{{ selectLang(translationModule.pass) }}</p>
          <InputText v-model="pass" />
        </div>
        <div class="element">
          <p>{{ selectLang(translationModule.confirmPass) }}</p>
          <InputText v-model="confirmPass" />
        </div>
        <div class="element">
          <p>{{ selectLang(translationModule.gender) }}</p>
          <Dropdown v-model="gender" :options="genders" option-label="label" />
        </div>
        <div class="element">
          <p>{{ selectLang(translationModule.birthDate) }}</p>
          <Calendar v-model="birtDate" showIcon iconDisplay="input" />
        </div>

        <div class="element">
          <p>{{ selectLang(translationModule.grade) }}</p>
          <Dropdown
            v-model="grade"
            :options="grades"
            option-label="label"
            option-group-label="label"
            optionGroupChildren="items"
          />
        </div>

        <!-- <div class="element">
          <p>{{ selectLang(translationModule.programs) }}</p>
          <Dropdown
            v-model="childGroup"
            :options="groups"
            option-label="label"
          />
        </div> -->

        <div class="element">
          <p>{{ selectLang(translationModule.educationSystem) }}</p>
          <Dropdown
            v-model="educationSystem"
            :options="educationSystems"
            option-label="label"
          />
        </div>
      </div>

      <Button
        :label="selectLang(translationModule.addChild)"
        @click="addChildFunc"
        style="margin-bottom: 5rem;"
      />
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 12rem 1fr;
  min-height: 100vh;
}
.wrapper {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr;
  padding-bottom: 2rem;
}
p {
  padding: 0;
  margin: 0;
  line-height: 1rem;
}
h2 {
  color: red;
  text-align: center;
  margin: 0;
  padding-top: 5rem;
}
.element > * {
  width: 100%;
}
.big-wrapper {
  padding-inline: 5rem;
}
button {
  padding: 0.75rem 5rem;
}
.dialog-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
}
h3 {
  color: var(--accent1);
  margin: 0;
  line-height: 0rem;
}
@media screen and (max-width: 1000px) {
  .wrapper {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 1000px) {
  .container {
    grid-template-columns: 90vw;
    min-height: 100vh;
  }
  .sidebar {
    display: none;
  }
}
@media screen and (max-width: 750px) {
  .wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
