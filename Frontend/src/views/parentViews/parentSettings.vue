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
const gender = ref();
const birtDate = ref();
const phoneNumber = ref("");
const address = ref("");
const job = ref("");

const message = ref("");
const showDialog = ref(false);

const genders = ["Male", "Female"];

const userInfoRequester = new HttpRequester("personal_info");
userInfoRequester.callApi().then(res=>
{

  if(res.success){
    firstName.value= res.data.info.first_name
    lastName.value =res.data.info.last_name
    gender.value =res.data.info.gender
    phoneNumber.value =res.data.info.phone_number
    birtDate.value =res.data.info.birth_day
    job.value =res.data.info.job
    address.value =res.data.info.location
  }
})

function change() {
  const updateUserInfoRequester = new HttpRequester("update_user_info");
  let date = {
    update: {
      first_name: firstName.value,
      last_name: lastName.value,
      gender: gender.value,
      birth_day: birtDate.value,
      phone_number:phoneNumber.value
    },
    user_type_specific_info: {
      location: address.value,
      job:job.value
    },
  };
  updateUserInfoRequester.callApi(date).then((res) => {
    if (res.success) {
      showDialog.value = true;
    } else {
      message.value = 'No Edited Information';
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
        <h1>Edited Successfully</h1>
        <Button label="View Child" @click="router.push('/parentProfile')" />
      </div>
    </Dialog>

    <ParentSidebar selected="Settings" />
    <div class="big-wrapper">
      <h1>{{ message }}</h1>
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
          <p>Phone Number</p>
          <InputText v-model="phoneNumber" />
        </div>

        <div class="element">
          <p>Address</p>
          <InputText v-model="address" />
        </div>
        <div class="element">
          <p>Job</p>
          <InputText v-model="job" />
        </div>
        <div class="element">
          <p>Gender</p>
          <Dropdown v-model="gender" :options="genders" />
        </div>
        <div class="element">
          <p>Birth Date</p>
          <Calendar v-model="birtDate" dateFormat="yy-mm-dd" showIcon iconDisplay="input" />
        </div>
      </div>

      <Button label="Save Changes" @click="change" />
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
h1 {
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
