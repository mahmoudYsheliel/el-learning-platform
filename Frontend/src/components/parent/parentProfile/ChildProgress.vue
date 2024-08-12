<script setup lang="ts">
import { ref, computed } from "vue";
import { HttpRequester } from "@/lib/APICaller";
const prop = defineProps(["selectedChildId"]);
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { selectLang,translationModule } from "@/lib/Translate";



const progress = ref<any[]>([]);
const enrollments = ref();
const object = computed(() => {
  enrollments.value=[]
  progress.value=[]
  let enrollmentobj = [];
  const childEnrollmentsRequester = new HttpRequester("get_child_enrollments");
  if (prop.selectedChildId) {
    childEnrollmentsRequester
      .callApi({ child_id: prop.selectedChildId })
      .then((res) => {
        if (res.data.enrollments) {
          enrollmentobj = res.data.enrollments;
          enrollments.value = enrollmentobj;
          for (let enrollment of enrollmentobj) {
            let courseId = enrollment?.course_id;
            const courseRequester = new HttpRequester("get_course");
            courseRequester.callApi({ course_id: courseId }).then((res) => {
              if (res.success) {
                let courseProgress = {
                  courseTitle: res?.data?.course?.title,
                  chapters: <any[]>[],
                  percentage: <number>0,
                };
                for (let chapter of res?.data?.course.chapters) {
                  let chapterOnj = {
                    title: chapter?.title,
                    material: <any[]>[],
                    progress: 0,
                  };
                  for (let mat of chapter?.materials) {
                    let materialObj = {
                      title: mat?.title,
                      progress: <any[]>[],
                      type: mat?.type,
                    };
                    
                      if (mat.type == "Lesson") {
                        if(enrollment?.progress?.lessons_completed){
                      for (let matProgress of enrollment?.progress
                        ?.lessons_completed) {
                        if (matProgress?.lesson_id == mat.Id) {
                          materialObj.progress.push(matProgress);
                        }
                      }}
                    } else if (mat.type == "Quiz") {
                      if(enrollment?.progress?.quizes_completed){
                      for (let matProgress of enrollment?.progress
                        ?.quizes_completed) {
                        if (matProgress?.quiz_id == mat.Id) {
                          materialObj.progress.push(matProgress);
                        }
                      }
                      }
                    }
                    

                    chapterOnj.material.push(materialObj);
                  }
                  let done = chapterOnj.material.reduce(
                    (materialLessons: any, material: any) => {
                      if (material?.progress?.length) {
                        return materialLessons + 1;
                      }
                      return materialLessons;
                    },
                    0
                  );

                  let total = chapterOnj.material.length;
                  chapterOnj.progress = Math.floor((100 * done) / total);
                  courseProgress.chapters.push(chapterOnj);
                }

                let done = courseProgress.chapters.reduce(
                  (totalLessons, chapter) => {
                    const chapterLessonCount = chapter.material.reduce(
                      (materialLessons: any, material: any) => {
                        if (material?.progress?.length) {
                          return materialLessons + 1;
                        }
                        return materialLessons;
                      },
                      0
                    );
                    return totalLessons + chapterLessonCount;
                  },
                  0
                );

                let total = courseProgress.chapters.reduce(
                  (totalLessons, chapter) => {
                    const chapterLessonCount = chapter.material?.length;
                    return totalLessons + chapterLessonCount;
                  },
                  0
                );
                courseProgress.percentage = Math.floor((done * 100) / total);
                progress.value.push(courseProgress);
              }
            });
          }
        }
      });
    return null;
  }
});

function extractDate(dateTimeString: string) {
  const date = new Date(dateTimeString);

  // Extract date components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function extractTime(dateTimeString: string) {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
</script>

<template>
  <main>
    <Accordion>
    <AccordionTab
      v-for="courseProgress in progress"
      :key="courseProgress.courseTitle"
    >
      <template #header>
        <div class="header">
          <h2>
            {{selectLang(courseProgress.courseTitle) }}
          </h2>
          <h2 style="color: var(--accent2)">
            {{ selectLang(translationModule.completed) }} {{ courseProgress.percentage }} %
          </h2>
        </div>
      </template>
      <div class="content">
        <div class="chapters">
          <Accordion>
            <AccordionTab
              v-for="chapter in courseProgress.chapters"
              :key="chapter.title"
            >
              <template #header>
                <div class="header">
                  <h3 style="color: var(--accent1)">
                    {{selectLang(chapter.title) }}
                  </h3>
                  <h3 style="color: var(--accent2)">
                    
                    {{ selectLang(translationModule.completed) }}  {{ chapter.progress }} %
                  </h3>
                </div>
              </template>
              <div class="material-content">
                <div class="material" v-for="mat in chapter.material">
                  <div class="lesson" v-if="mat?.type == 'Lesson'" >
                    <h4 style="color: var(--text);">
                      {{ selectLang(mat.title) }}
                    </h4>
                    <div
                      class="completed"
                      v-if="mat?.progress[0]?.completed_at"
                      style="color: var(--accent2)"
                    >
                      <span style="color: var(--text);">{{ selectLang(translationModule.completedAt) }}</span>
                      {{ extractDate(mat?.progress[0]?.completed_at) }}
                    </div>
                  </div>

                  <div class="quiz" v-if="mat.type == 'Quiz'">
                    <Accordion>
                      <AccordionTab>
                        <template #header>
                          <div class="quiz-header">
                            <h4 style="color: var(--text);">
                              {{selectLang(mat?.title) }}
                            </h4>
                            <h4>
                              <span style="color: var(--text);">{{ selectLang(translationModule.heighest) }}</span>
                              
                              {{
                                mat?.progress?.reduce(
                                  (max: number, item: any) =>
                                    item?.score_prcentage > max
                                      ? item?.score_prcentage
                                      : max,
                                  0
                                )
                              }}
                              %
                            </h4>

                            <h4>
                              <span style="color: var(--text);"> {{ selectLang(translationModule.nomOfAtts) }}</span>
                              {{ mat?.progress?.length }}
                            </h4>
                          </div>
                        </template>
                        <div class="quiz-content">
                          <div class="row names">
                            <h5 style="color: var(--text);">{{ selectLang(translationModule.att) }}</h5>
                            <h5 style="color: var(--text);">{{ selectLang(translationModule.score) }}</h5>
                            <h5 style="color: var(--text);">{{ selectLang(translationModule.timeToAns) }}</h5>
                            <h5 style="color: var(--text);">{{ selectLang(translationModule.date) }}</h5>
                          </div>
                          <div class="row" v-for="(p, i) in mat?.progress">
                            <h5>{{ i +1}}</h5>
                            <h5>{{ p?.score_prcentage }}%</h5>
                            <h5>{{ p?.time_taken }} sec</h5>
                            <h5>{{ extractDate(p?.created_at) }}</h5>
                           
                           
                          </div>
                        </div>
                      </AccordionTab>
                    </Accordion>
                  </div>
                </div>
              </div>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
    </AccordionTab>
  </Accordion>
  </main>
  
  {{ object }}
</template>

<style scoped>
main{
  margin-top: 3rem;
}
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.quiz,.lesson{
  border-bottom: 1px solid #ddd;
  margin-block: 0.25rem;

}
.lesson {
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right:2rem;
  padding-block: 1.5rem;
}
.quiz-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
}
.row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  color: var(--accent1);
}
.names{
  color: var(--accent2);
}
h3,h4,h2,h1{
  color: var(--accent1);
}
h3,h4,h5{
   margin: 0
}
</style>
