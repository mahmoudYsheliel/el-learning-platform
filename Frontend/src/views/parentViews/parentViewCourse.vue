<script lang="ts" setup>
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import "primeicons/primeicons.css";
import { useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import { HttpRequester } from "@/lib/APICaller";
import { useToken } from "@/stores/token";
import Dialog from "primevue/dialog";
const showDialog =ref(false)
const token = useToken()
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
        obj.materials.push({ title: mat.title, icon: "pi pi-book" });
      }
      if (mat?.type === "Quiz") {
        obj.quizCount = obj.quizCount + 1;
        obj.materials.push({ title: mat.title, icon: "pi pi-check-square" });
      }
    }
    chapters.value.push(obj);
  }
});

function requestEnroll() {
  if (!token.getIsAuthorized){
    router.push('/login')
  }
  const enrollRequester = new HttpRequester("request_enrollment");
  const enroll = {
    request: {
      course_id: route.params.courseId,
      created_at: new Date().toISOString(),
      student_id: route.params.studentId
    },
  };
  enrollRequester.callApi(enroll).then((res) => {
    if (res.data.requesrt_enrollment_id) {
      showDialog.value=true
    }
  });
}
 function childPage(){
    router.push('/children')
 }
</script>

<template>
  <Navbar />


  <div class="big-container">
    <Dialog v-model:visible="showDialog"  modal
    :pt="{
        root: 'border-none',
        mask: {
            style: 'backdrop-filter: blur(2px)'
        }
    }">
    <template #container="{ closeCallback }" >
        <div style="padding: 2em; display: flex; flex-direction: column; align-items: center; gap: 2rem;">

            <h2>Enrolment Request Sent Successfully</h2>
        <Button label="Go To Children Page" style="width: 20rem;" @click="childPage"/>
        </div>
    </template>
    </Dialog>
    <div class="course-description">
      <div class="head">
        <h1>{{ course?.title }}</h1>
      </div>

      <img :src="course?.image" alt="" />
      <div class="description">
        <div class="header">
          <h2>Course Description</h2>
          <Button label="Enroll Now" v-if="!(route.params.isEnrolled=='1')" @click="requestEnroll" />
        </div>
        <p>{{ course?.description }}</p>
      </div>
      <div class="objectives">
        <h2>Course Objectives</h2>
        <p v-for="objective in course?.objectives">- {{ objective }}</p>
      </div>
    </div>
    <div class="content">
      <div class="card">
        <h2>Course Content</h2>
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
                <h4>{{ chapter.title }}</h4>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    gap: 2rem;
                    padding-left: 2rem;
                  "
                >
                  <h5>{{ chapter.lessonCount }} Lessons</h5>
                  <h5>{{ chapter.quizCount }} Quizes</h5>
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
