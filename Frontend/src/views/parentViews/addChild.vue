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
const message = ref("");
const showDialog = ref(false);
const groups = ref<any[]>([]);

const grades = [
  {
    label: "Kindergarten (KG)",
    items: [
      { label: 1, value: "Kindergarten 1" },
      { label: 2, value: "Kindergarten 2" },
    ],
  },
  {
    label: "Primary Education",
    items: [
      { label: 1, value: "Primary 1" },
      { label: 2, value: "Primary 2" },
      { label: 3, value: "Primary 3" },
      { label: 4, value: "Primary 4" },
      { label: 5, value: "Primary 5" },
      { label: 6, value: "Primary 6" },
    ],
  },
  {
    label: "Preparatory Education",
    items: [
      { label: 1, value: "Preparatory 1" },
      { label: 2, value: "Preparatory 2" },
      { label: 3, value: "Preparatory 3" },
    ],
  },
  {
    label: "Secondary Education",
    items: [
      { label: 1, value: "Secondary 1" },
      { label: 2, value: "Secondary 2" },
      { label: 3, value: "Secondary 3" },
    ],
  },
  {
    label: "Others",
    items: [{ label: "Others", value: "Others" }],
  },
];
const genders = ["Male", "Female"];
const educationSystems = [
  "National (Public) Education System",
  "Private Schools",
  "International Schools",
  "Other",
];

const groupsRequester = new HttpRequester("get_all_program");
groupsRequester.callApi().then((res) => {
  if (res.success) {
    for (let program of res?.data?.program) {
      groups.value.push({
        label: program?.title + " " + program?.age_group,
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
    !childGroup.value ||
    !educationSystem.value
  ) {
    message.value = "Some Fields Are Missing";
  } else if (pass.value !== confirmPass.value) {
    message.value = "Passwords Are Diffferent";
  } else {
    const addChildRequester = new HttpRequester("add_child");
    let date = {
      user: {
        email: email.value,
        hashed_pass: pass.value,
        user_type: "Child",
        first_name: firstName.value,
        last_name: lastName.value,
        gender: gender.value,
        birth_day: birtDate.value,
      },
      child: {
        user_id: "",
        grade: grade.value?.value,
        child_group: childGroup.value?.code,
        education_system: educationSystem.value,
      },
    };
    addChildRequester.callApi(date).then((res) => {
      if (res.success) {
        showDialog.value=true
      } else {
        message.value = res.msg;
      }
    });
  }
}
</script>

<template>
  <Navbar />
  <div class="container">

    <Dialog modal v-model:visible="showDialog"  :pt="{
        root: 'border-none',
        mask: {
            style: 'backdrop-filter: blur(2px)'
        },
        header:{style:'display:none'}
    }">
    <div class="dialog-container">
        <h1>Child Added Successfully</h1>
        <Button label='View Child' @click="router.push('/childrenCourses')"/>
    </div>
     
      
    </Dialog>



    <ParentSidebar selected="Add Child" />
    <div class="big-wrapper">
      <h2>{{ message }}</h2>
      <div class="wrapper">
        <div class="element">
          <p>First Name</p>
          <InputText v-model="firstName" />
        </div>
        <div class="element">
          <p>Last Name</p>
          <InputText v-model="lastName" />
        </div>

        <div class="element">
          <p>Email</p>
          <InputText v-model="email" />
        </div>
        <div class="element">
          <p>Password</p>
          <InputText v-model="pass" />
        </div>
        <div class="element">
          <p>Confirm Password</p>
          <InputText v-model="confirmPass" />
        </div>
        <div class="element">
          <p>Gender</p>
          <Dropdown v-model="gender" :options="genders" />
        </div>
        <div class="element">
          <p>Birth Date</p>
          <Calendar v-model="birtDate" showIcon iconDisplay="input" />
        </div>

        <div class="element">
          <p>Grade</p>
          <Dropdown
            v-model="grade"
            :options="grades"
            option-label="label"
            option-group-label="label"
            optionGroupChildren="items"
          />
        </div>

        <div class="element">
          <p>Child Group</p>
          <Dropdown
            v-model="childGroup"
            :options="groups"
            option-label="label"
          />
        </div>

        <div class="element">
          <p>Education System</p>
          <Dropdown v-model="educationSystem" :options="educationSystems" />
        </div>
      </div>

      <Button label="Add Child" @click="addChildFunc" />
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
.big-wrapper{
    padding-inline: 5rem;
}
button {
  padding: 0.75rem 5rem;
}
.dialog-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    gap: 2rem;
}
@media screen and (max-width: 1000px) {
  .wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 750px) {
  .wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
