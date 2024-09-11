<script setup lang="ts">
import AdminSidebar from "@/components/admin/general/AdminSidebar.vue";
import Nanbar from "@/components/general/Navbar.vue";
import Button from "primevue/button";
import { ref, computed } from "vue";
import { selectLang } from "@/lib/Translate";
import { HttpRequester } from "@/lib/APICaller";
import { useRouter } from "vue-router";
import Footer from "@/components/general/Footer.vue";
import AdminAddTypeDialog from "@/components/dialogs/AdminAddTypeDialog.vue";
import ConfirmDelete from "@/components/dialogs/ConfirmDelete.vue";

const router = useRouter();
const showDialog = ref(false);
const selectedType = ref("");
const selectedLabel = ref("");

const programsRequester = new HttpRequester("get_all_program");
const programs = ref();
programsRequester.callApi().then((res) => {
  programs.value = res?.data?.program;
});

const categoriesRequester = new HttpRequester("get_categories");
const categories = ref();
categoriesRequester.callApi().then((res) => {
  categories.value = res?.data?.categories;
});

const plansRequester = new HttpRequester("get_all_plans");
const plans = ref();
plansRequester.callApi().then((res) => {
  plans.value = res?.data?.plans;
});

const coursesRequester = new HttpRequester("get_courses");
const courses = ref();
coursesRequester.callApi().then((res) => {
  courses.value = res?.data?.courses;
});

const materialsObjects = computed(() => {
  return [
    {
      label: "Programs",
      btn: "Add Program",
      value: programs.value,
    },
    {
      label: "Plans",
      btn: "Add Plan",
      value: plans.value,
    },
    {
      label: "Categories",
      btn: "Add Category",
      value: categories.value,
    },
    {
      label: "Courses",
      btn: "Add Course",
      value: courses.value,
    },
  ];
});
function showDialogFunc(materialType: any, materialLabel: any) {
  selectedType.value = materialType;
  selectedLabel.value = materialLabel;
  showDialog.value = true;
}

const selectedMat = ref();
const showDeletMatDialog = ref(false);
const matType = ref();
function editMat(typeContent: any,matTypeVar: any) {

if (matTypeVar=='Programs'){
  router.push(`/editProgram/${typeContent?.id}`)}
  if (matTypeVar=='Plans'){
  router.push(`/editPlan/${typeContent?.id}`)}
  if (matTypeVar=='Categories'){
  router.push(`/editCategory/${typeContent?.id}`)}
  if (matTypeVar=='courses'){
  router.push(`/editCourse/${typeContent?.id}`)}

}
function deleteMat(typeContent: any, matTypeVar: any) {
  selectedMat.value = typeContent;
  console.log(matTypeVar);
  matType.value = matTypeVar;
  showDeletMatDialog.value = true;
}
function deletionCompleted() {
  showDeletMatDialog.value = false;
  if (matType.value == "Programs") {
    programsRequester.callApi().then((res) => {
      programs.value = res?.data?.program;
    });
  } else if (matType.value == "Categories") {
    categoriesRequester.callApi().then((res) => {
      categories.value = res?.data?.categories;
    });
  } else if (matType.value == "Plans") {
    plansRequester.callApi().then((res) => {
      plans.value = res?.data?.plans;
    });
  } else if (matType.value == "Courses") {
    coursesRequester.callApi().then((res) => {
      courses.value = res?.data?.courses;
    });
  }
}
</script>

<template>
  <Nanbar />
  <AdminAddTypeDialog
    :show-dialog="showDialog"
    :materialType="selectedType"
    :bteLabel="selectedLabel"
    @remove-dialog="showDialog = false"
  />
  <ConfirmDelete
    :show-dialog="showDeletMatDialog"
    :mat="selectedMat"
    @remove-dialog="deletionCompleted"
    :matType="matType"
  />

  <div class="container">
    <AdminSidebar class="sidebar" selected="Manage Courses" />
    <div class="wrapper">
      <div v-for="materialType in materialsObjects" class="table-container">
        <div class="top-option">
          <h2>{{ materialType.label }}</h2>
          <Button
            :label="materialType.btn"
            icon="pi pi-plus-circle"
            icon-pos="right"
            @click="
              () => {
                showDialogFunc(materialType.label, materialType.btn);
              }
            "
          />
        </div>

        <div class="table">
          <div class="row">
            <h3 class="element">Title</h3>
            <h3 class="element">Options</h3>
          </div>
          <div class="row" v-for="typeContent in materialType.value">
            <p class="element">
              {{
                materialType.label == "Categories"
                  ? selectLang(typeContent?.category)
                  : selectLang(typeContent?.title)
              }}
            </p>
            <div class="element btnContainer">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                icon-pos="right"
                style="background-color: blue"
                @click="
                  () => {
                    editMat(typeContent, materialType.label);
                  }
                "
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                icon-pos="right"
                style="background-color: red"
                @click="
                  () => {
                    deleteMat(typeContent, materialType.label);
                  }
                "
              />
            </div>
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
