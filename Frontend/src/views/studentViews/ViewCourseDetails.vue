<script lang="ts" setup>
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Button from "primevue/button";
import Information from "@/components/student/courseDetails/Information.vue";
import "primeicons/primeicons.css";
import { selectLang, translationModule } from "@/lib/Translate";
import { useRoute, useRouter } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";
import { useToken, usePersonalInfo } from "@/stores/token";

import Dialog from "primevue/dialog";
const showDialog = ref(false);
const token = useToken();
const personalInfo = usePersonalInfo();
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const course = ref();
const courseRequester = new HttpRequester("get_course");

const chapters = ref<any[]>([]);
courseRequester.callApi({ course_id: route.params.courseId }).then((res) => {
  course.value = res?.data?.course;
  for (let chapter of course.value?.chapters) {
    let obj = {
      title: "",
      lessonCount: 0,
      quizCount: 0,
      materials: <any[]>[],
    };
    obj.title = chapter?.title;
    for (let mat of chapter?.materials) {
      if (mat?.type === "Lesson") {
        obj.lessonCount = obj.lessonCount + 1;
        obj.materials.push({
          title: selectLang(mat.title),
          icon: "pi pi-book",
        });
      }
      if (mat?.type === "Quiz") {
        obj.quizCount = obj.quizCount + 1;
        obj.materials.push({
          title: selectLang(mat.title),
          icon: "pi pi-check-square",
        });
      }
    }
    chapters.value.push(obj);
  }
});

function enroll() {
  if (!token.getIsAuthorized) {
    router.push("/login");
  }

  if (
    personalInfo.getInfo?.userType == "Parent" ||
    personalInfo.getInfo?.userType == "Child"
  ) {
    showDialog.value = true;
  }
}
const isEnrolled = ref(false);
const enrollmentId = ref();

const enrollmentRequester = new HttpRequester("get_enrollment");
enrollmentRequester
  .callApi({ course_id: route.params.courseId })
  .then((res) => {
    if (res.data.enrollment) {
      isEnrolled.value = true;
      enrollmentId.value = res.data.enrollment?.id;
    }
  });

function childPage() {
  router.push("/childrenCourses");
}
function viewMaterial() {
  router.push(
    `/viewCoursePage/${route.params.courseId}/${enrollmentId.value}/${course.value?.chapters[0]?.materials[0]?.Id}`
  );
}
</script>

<template>
  <Navbar />
  <div class="big-container">
    <Dialog
      v-model:visible="showDialog"
      modal
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(2px)',
        },
      }"
    >
      <template #container="{ closeCallback }">
        <div class="dialog" v-if="personalInfo.getInfo?.userType == 'Parent'">
          <h2>{{ selectLang(translationModule.pleaseGoToChildrenCourse) }}</h2>
          <h2>{{ selectLang(translationModule.selectChildEnroll) }}</h2>
          <h2>{{ selectLang(translationModule.selectCourse) }}</h2>
          <Button
            :label="selectLang(translationModule.gotoChildCourses)"
            style="width: 20rem"
            @click="childPage"
          />
        </div>
        <div class="dialog" v-if="personalInfo.getInfo?.userType == 'Child'">
          <h2>{{ selectLang(translationModule.askParent) }}</h2>
          <Button
            :label="selectLang(translationModule.cancell)"
            @click="showDialog = false"
          />
        </div>
      </template>
    </Dialog>
    <div class="course-description">
      <div class="head">
        <h1>{{ selectLang(course?.title) }}</h1>
      </div>

      <img :src="course?.image" alt="" />
      <div class="description">
        <div class="header">
          <h2>{{ selectLang(translationModule.courseDescription) }}</h2>
          <Button v-if="!isEnrolled" :label=selectLang(translationModule.enrollNow) @click="enroll" />
          <Button
            v-if="isEnrolled"
            :label=selectLang(translationModule.viewMat)
            @click="viewMaterial"
          />
        </div>
        <p>{{ selectLang(course?.description) }}</p>
      </div>
      <div class="objectives">
        <h2>{{ selectLang(translationModule.courseObjectives) }}</h2>
        <p v-for="objective in course?.objectives">
          - {{ selectLang(objective) }}
        </p>
      </div>
    </div>
    <div class="content">
      <div class="card">
        <h2>{{ selectLang(translationModule.courseContent) }}</h2>
        <Accordion :multiple="true" :activeIndex="[]">
          <AccordionTab
            v-for="(chapter, i) in chapters"
            :key="chapter.title"
            :pt="{
              root: {
                style:
                  'margin-block:0.5rem; border:solid 2px var(--accent1); border-radius:1rem; padding:0.25rem',
              },
            }"
          >
            <template #header style="display: flex; flex-direction: column">
              <div>
                <h4>{{ selectLang(chapter.title) }}</h4>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    gap: 2rem;
                    padding-left: 2rem;
                  "
                >
                  <h5>{{ chapter.lessonCount }} {{ selectLang(translationModule.lessons) }}</h5>
                  <h5>{{ chapter.quizCount }} {{ selectLang(translationModule.quiz) }}</h5>
                </div>
              </div>
            </template>

            <p
              style="padding: 0; margin: 0; color: var(--accent1)"
              class="m-0"
              v-for="mat in chapter.materials"
            >
              <i :class="mat.icon"></i> {{ mat.title }}
            </p>
          </AccordionTab>
        </Accordion>
      </div>
      <Information
        :categories="course?.categories"
        :title="selectLang(course?.title)"
        :price="course?.price"
        :duration="course?.duration"
        :min_age="course?.min_age"
        :max_age="course?.max_age"
      />
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.head {
  display: flex;
  margin-top: 5rem;
  flex-direction: column;
  align-items: start;
}
.big-container {
  display: grid;
  padding-inline: 5rem;
  grid-template-columns: 3fr 2fr;
  margin-bottom: 4rem;
}
.course-description {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}
h1 {
  color: var(--header);
  margin-left: 2rem;

  width: fit-content;
  border-bottom: 0.25rem solid var(--accent3);
  line-height: 3rem;
}
.dialog {
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
img {
  width: 100%;
  border-radius: 8px;
}
h4,
h5 {
  margin: 0;
}
h2 {
  color: var(--accent1);
  margin: 0;
  padding: 0;
}
p {
  margin-left: 1rem;
  line-height: 1.25rem;
  color: var(--text);
}
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 12rem;
}
.card {
  width: 75%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  width: 30%;
}
@media screen and (max-width: 1200px) {
  .big-container {
    display: flex;
    flex-direction: column;
    padding-inline: 5rem;
  }
  .content {
    margin-top: 3rem;
  }
  .card {
    width: 75%;
  }
}
</style>
