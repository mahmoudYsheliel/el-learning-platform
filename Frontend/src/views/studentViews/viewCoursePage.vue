<script lang="ts" setup>
import Navbar from "../../components/general/Navbar.vue";
import SideBar from "../../components/student/coursePage/SideBar.vue";
import Lesson from "../../components/student/coursePage/Lesson.vue";
import Simulation from "../../components/student/coursePage/Simulation.vue";
import Project from "../../components/student/coursePage/Project.vue";
import Activity from "../../components/student/coursePage/Activity.vue";
import Quiz2 from "../../components/student/coursePage/Quiz2.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";
import Button from "primevue/button";
import { selectLang, translationModule } from "@/lib/Translate";
import { courseObject, materialInfo } from "@/lib/Modules";
import { usePersonalInfo } from "@/stores/token";

import ChatBot from "@/components/general/ChatBot.vue";

const chapters = ref();
const title = ref();
const image = ref()
const route = useRoute();
const router = useRouter();
const personalInfo = usePersonalInfo();

const enrollmentRequester = new HttpRequester("get_enrollment");
if (personalInfo.getInfo?.userType !='Admin'){
  enrollmentRequester
  .callApi({ course_id: route.params.courseId })
  .then((res) => {
    if (res?.success == false) {
      router.push("/");
    }
  })
}


const getCourse = async () => {
  const courseRequester = new HttpRequester("get_course");
  courseRequester.callApi({ course_id: route.params.courseId }).then((res) => {
    if (res?.success) {
      chapters.value = res?.data?.course?.chapters;
      title.value = res?.data?.course?.title;
      image.value = res?.data?.course?.image;
      for (let material of chapters.value) {
        for (let i = 0; i < material.materials.length; i++) {
          for (let mat of materialInfo) {
            if (material.materials[i].type === mat.name) {
              material.materials[i].matIcon = mat.icon;
            }
          }
        }
      }
    }
  });
};

getCourse();

const materialComponnent = computed(() => {
  const progres = ref();
  const courseRequester = new HttpRequester("get_enrollment");
  courseRequester.callApi({ course_id: route.params.courseId }).then((res) => {
    if (res?.success) {
      progres.value = res?.data?.enrollment?.progress;
      for (let chapter of chapters.value) {
        for (let mat of chapter?.materials) {
          if (
            progres.value?.lessons_completed?.some((les: any) => {
              return les?.lesson_id == mat?.Id;
            })
          ) {
            mat.status = "Done";
          } else if (
            progres.value?.quizes_completed?.some((les: any) => {
              return les?.quiz_id == mat?.Id;
            })
          ) {
            mat.status = "Done";
          } else if (
            progres.value?.activities_completed?.some((les: any) => {
              return les?.activity_id == mat?.Id;
            })
          ) {
            mat.status = "Done";
          } else if (
            progres.value?.simulations_completed?.some((les: any) => {
              return les?.simulation_id == mat?.Id;
            })
          ) {
            mat.status = "Done";
          } else if (
            progres.value?.projects_completed?.some((les: any) => {
              return les?.project_id == mat?.Id;
            })
          ) {
            mat.status = "Done";
          } else {
            mat.status = "Unselected";
          }
        }
      }
    }
  });
  let materialId = route.params.materialId;
  for (
    let chapterIndex = 0;
    chapterIndex < chapters.value?.length;
    chapterIndex++
  ) {
    const chapter = chapters.value[chapterIndex];
    for (
      let materialIndex = 0;
      materialIndex < chapter.materials.length;
      materialIndex++
    ) {
      const material = chapter.materials[materialIndex];
      if (material.Id === materialId) {
        let prevMaterialId = null;
        let nextMaterialId = null;

        // Determine previous material ID
        if (materialIndex > 0) {
          prevMaterialId = chapter.materials[materialIndex - 1].Id;
        } else if (chapterIndex > 0) {
          const prevChapter = chapters.value[chapterIndex - 1];
          prevMaterialId =
            prevChapter.materials[prevChapter.materials.length - 1].Id;
        }

        // Determine next material ID
        if (materialIndex < chapter.materials.length - 1) {
          nextMaterialId = chapter.materials[materialIndex + 1].Id;
        } else if (chapterIndex < chapters.value.length - 1) {
          const nextChapter = chapters.value[chapterIndex + 1];
          if (nextChapter.materials.length > 0) {
            nextMaterialId = nextChapter.materials[0].Id;
          }
        }
        let type;
        let completed = false;
        if (material.type === "Lesson") {
          type = Lesson;
        }
        if (material.type === "Simulation") {
          type = Simulation;
        }
        if (material.type === "Project") {
          type = Project;
        }
        if (material.type === "Activity") {
          type = Activity;
        }
        if (material.status == "Done") {
          completed = true;
        }

        if (material.type === "Quiz") {
          type = Quiz2;
        }
        return {
          type: type,
          prevMaterialId: prevMaterialId,
          nextMaterialId: nextMaterialId,
          isCompleted: completed,
        };
      }
    }
  }
  return null;
});
function previous() {
  if (materialComponnent.value && materialComponnent.value.prevMaterialId) {
    router.push(
      `/viewCoursePage/${route.params.courseId}/${route.params.enrollmentId}/${materialComponnent.value.prevMaterialId}`
    );
  }
}
function next() {
  if (materialComponnent.value && materialComponnent.value.nextMaterialId) {
    router.push(
      `/viewCoursePage/${route.params.courseId}/${route.params.enrollmentId}/${materialComponnent.value.nextMaterialId}`
    );
  }
}

function createChat() {
  let data = {
    new_chat: {
      course_title: title.value?.en,
      course_id:route.params.courseId ,
      student_name:
        personalInfo.getInfo?.firstName + " " + personalInfo.getInfo?.lastName,
      avatar: image.value,
      participants: [
        {
          id: personalInfo.getInfo?.id,
          username: personalInfo.getInfo?.email,
        },
      ],
    },
  };
  new HttpRequester('create_chat').callApi(data).then(res=>{
    if(res?.success){
      router.push(`/childChats/${res?.data?.chat_id}`)
    }
  })
}
</script>

<template>
  <main>
    <ChatBot />
    <Button
      :label="selectLang(translationModule.chats)"
      icon="pi pi-user"
      icon-pos="right"
      style="
        font-size: 0.6rem;
        position: absolute;
        left: 1rem;
        bottom: 1rem;
        z-index: 2;
        background-color: var(--accent2);
      "
      @click="createChat"
    />
    <Navbar />
    <div class="container">
      <div class="sidebar">
        <SideBar :chapters="chapters" :course-title="title" />
      </div>
      <div class="wrapper">
        <component
          :is="materialComponnent?.type"
          @next="next"
          :completed="materialComponnent?.isCompleted"
        />
        <div class="Button-Wrapper">
          <Button
            :label="selectLang(translationModule.prev)"
            :class="{ hide: !materialComponnent?.prevMaterialId }"
            @click="previous"
          />
          <Button
            :label="selectLang(translationModule.next)"
            :class="{ hide: !materialComponnent?.nextMaterialId }"
            @click="next"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: max-content 1fr;
}
.hide {
  visibility: hidden;
}
.wrapper {
  overflow-y: scroll;
  height: calc(100vh - 5rem);
  padding-bottom: 5rem;
}
.wrapper::-webkit-scrollbar {
  display: none;
}
Button {
  font-size: 1.25rem;
  width: 8rem;
}
.Button-Wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-top: 5rem;
  margin-inline: auto;
}
</style>
