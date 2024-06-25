<script lang="ts" setup>
import ParentSidebar from "../../components/general/ParentSidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import Chart from "primevue/chart";
import { ref } from "vue";

const groupRequester = new HttpRequester("get_all_program");
const children = ref<any[]>([]);
groupRequester.callApi().then((res) => {
  const programs = res.data.program;
  const childrenRequester = new HttpRequester("personal_info");
  childrenRequester.callApi().then((res) => {
    if (res.data.info.children) {
      for (let child of res.data.info.children) {
        const childRequester = new HttpRequester("personal_another_user_info");
        childRequester.callApi({ another_userId: child }).then((res) => {
          if (res.data.info) {
            let childObj = res.data.info;
            childObj.id = child;
            childObj.image = programs.find(
              (r: any) => r.id == childObj.child_group
            )?.image;
            childObj.child_group = programs.find(
              (r: any) => r.id == childObj.child_group
            )?.title;

            const childEnrollmentsRequester = new HttpRequester(
              "get_child_enrollments"
            );
            childEnrollmentsRequester
              .callApi({ child_id: child })
              .then((res) => {
                if (res.data.enrollments) {
                  childObj.enrollments = res.data.enrollments;
                }
                children.value.push(childObj);
              });
          }
        });
      }
    }
  });
});

const coursesRequester = new HttpRequester("get_courses");
const courses = ref<any[]>([]);
coursesRequester.callApi().then((res) => {
  if (res.data.courses) {
    courses.value = res.data.courses;
  }
});

</script>

<template>
  <Navbar />
  <div class="container">
    <ParentSidebar selected="Home" />
    <div class="wrapper">
      <div class="child-progress" v-for="child in children">
        <div class="child-info">
          <img :src="child.image" alt="" />
          <div class="info">
            <h3>{{ child?.first_name }} {{ child?.last_name }}</h3>
            <p style="color: var(--text);">{{ child.child_group }}</p>
          </div>
        </div>
        <div class="progress">
          <div class="completed">
            <p>Courses Enrolled</p>
            <p>{{ child?.enrollments?.length }}</p>
          </div>
          <div class="in-progress">
            <p>Courses in Progress</p>
            <p>{{ child?.enrollments?.length }}</p>
          </div>
        </div>
      </div>
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
.child-info {
  height: 4rem;
  display: flex;
  gap: 2rem;
}
.wrapper{
    margin-top: 3rem;
}
h3 {
  color: var(--accent1);
  line-height: 2rem;
  margin: 0;
}
p {
  margin: 0;
  line-height: 1rem;
}
.child-progress {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 5rem;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
img {
  height: 100%;
  border-radius: 8px;
}
.completed,.in-progress{
border-radius: 0.5rem;
padding: 1rem 3rem;
display: flex;
gap: 1rem;
flex-direction: column;
align-items: center;
color: white;
}
.completed{
   background-color: var(--accent1); 
}
.in-progress{
   background-color: var(--accent2); 
}
.progress{
    display: flex;
    gap: 2rem;
    padding-left: 5rem;
}
</style>
