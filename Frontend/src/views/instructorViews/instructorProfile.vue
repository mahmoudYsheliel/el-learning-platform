<script setup lang="ts">
import InstructorSideBar from "@/components/instructor/general/InstructorSideBar.vue";
import Nanbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

import { HttpRequester } from "@/lib/APICaller";
import { ref } from "vue";

const profile = ref();
const courses = ref();

const profileRequester = new HttpRequester("personal_info");
const coursesRequester = new HttpRequester("get_courses");

coursesRequester.callApi().then((res) => {
  if (res?.success) {
    courses.value = res?.data?.courses;
  }
});
profileRequester.callApi().then((res) => {
  if (res?.success) {
    profile.value = res?.data?.info;
  }
});
</script>

<template>
  <Nanbar />
  <div class="container">
    <InstructorSideBar selected="Profile" class="sidebar" />
    <div class="wrapper">
      <div class="emil-image">
        <img v-if="profile?.image" :src="profile.image" alt="" />
        <div class="info">
          <h2>{{ profile?.first_name }} {{ profile?.last_name }}</h2>
          <p><i class="pi pi-briefcase" /> {{ profile?.title }}</p>
          <p><i class="pi pi-envelope" /> {{ profile?.email }}</p>

          <p><i class="pi pi-phone" /> {{ profile?.phone_number }}</p>
        </div>
      </div>

      <TabView>
        <TabPanel header="Courses">
          <p v-for="course in profile?.courses">
            -
            {{
              courses.find((c: any) => {
                return c.id == course;
              })?.title?.en
            }}
          </p>
        </TabPanel>
        <TabPanel header="Biography">
          <p>{{ profile?.philisophy }}</p>
        </TabPanel>

        <TabPanel header="Specializations">
          <p v-for="ex in profile?.specializations">- {{ ex }}</p>
        </TabPanel>

        <TabPanel header="Education Background">
          <p v-for="ex in profile?.education_background">- {{ ex }}</p>
        </TabPanel>

        <TabPanel header="Experience">
          <p v-for="ex in profile?.experience">- {{ ex }}</p>
        </TabPanel>
        <TabPanel header="Philisophy">
          <p>{{ profile?.philisophy }}</p>
        </TabPanel>
      </TabView>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 12rem calc(100vw - 12rem);
  min-height: 100vh;
}
.wrapper {
  padding: 2rem;
}
.emil-image {
  display: flex;
  gap: 1rem;
  border-bottom: 2px var(--choiceBackgroundColor) solid;
  padding-bottom: 1rem;
}
h2 {
  color: var(--accent2);
}
img {
  height: 10rem;
  border-radius: 1rem;
}
.info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info > * {
  padding: 0;
  margin: 0;
}
.info > p {
  color: var(--text);
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 0;
  padding: 0;
}
@media screen and (max-width: 1000px) {
  .container {
    grid-template-columns: 100vw;
    min-height: 100vh;
  }
  .sidebar {
    display: none;
  }
}
</style>
