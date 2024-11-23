<script setup lang="ts">
import AdminSidebar from "@/components/admin/general/AdminSidebar.vue";
import Nanbar from "@/components/general/Navbar.vue";
import Button from "primevue/button";
import { ref } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import { useRouter } from "vue-router";
import Footer from "@/components/general/Footer.vue";
import AddInstructorDialog from '@/components/dialogs/AddInstructorDialog.vue'

const router = useRouter();

const instructors = ref<any[]>([])

const instructorsRequester = new HttpRequester('get_instructors')
instructorsRequester.callApi({}).then(res=>{
  if(res.success){
    for(let i=0 ; i< res?.data?.instructors?.length ;i++){
      let user = res?.data?.users?.find((user:any)=>{return user?.id ==res?.data?.instructors[i]?.user_id})
      let instructor = res?.data?.instructors[i]
      instructors.value.push({...user,...instructor})
     }
  }
})

const showAddInstructorDialog =ref(false)

function addInstructor(){

}
</script>

<template>
  <AddInstructorDialog :show-dialog="showAddInstructorDialog" @cancel="showAddInstructorDialog=false"/>
  <Nanbar />
  <div class="container">
    <AdminSidebar class="sidebar" selected="Manage Instructors" />
    <div class="wrapper">
        <div class="top-option">
          <h2>Instructors</h2>
          <Button
          label="Add Instructor"
            icon="pi pi-plus-circle"
            icon-pos="right"
            @click="showAddInstructorDialog=true"
          />
        </div>

        <div class="table">
          <div class="row">
            <h3 class="element">Email</h3>
            <h3 class="element">Options</h3>
          </div>
          <div class="row" v-for="instructor in instructors">
            <p class="element">
              {{ instructor.email }}
            </p>
            <div class="element btnContainer">
              <Button label="View" @click="router.push(`/editInstructor/${instructor.id}`)" />
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
  grid-template-columns: 12rem calc(100vw - 12rem);
  min-height: 100vh;
  max-width: 100%;
}
.table-container {
  margin-bottom: 5rem;
}
.wrapper {
  width: 90%;
  margin-inline: auto;
  margin-top: 2rem;
}
h2 {
  color: var(--accent1);
  width: fit-content;
  line-height: 1rem;
  border-bottom: 0.25rem solid var(--accent3);
}
.table {
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.table::-webkit-scrollbar {
  display: none;
}
.row {
  display: grid;
  grid-template-columns: 3fr 2fr;
  min-width: 30rem;
}
p {
  color: var(--accent2);
  margin: 0;
}
.element {
  display: flex;
  align-items: center;
  padding-inline: 0.5rem;
  border: 2px solid var(--choiceBackgroundColor);
}
h3 {
  color: var(--text);
  cursor: pointer;
  margin: 0;
}
button {
  padding-inline: 1rem;
  font-size: 0.75rem;
}
.top-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-option > :last-child {
  width: fit-content;
  padding-inline: 3rem;
}
.btnContainer {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
