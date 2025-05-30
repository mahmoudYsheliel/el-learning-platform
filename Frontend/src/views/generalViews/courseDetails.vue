<script lang="ts" setup>
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import Information from "@/components/student/courseDetails/Information.vue";
import "primeicons/primeicons.css";
import { selectLang, translationModule } from "@/lib/Translate";
import { materialInfo } from "@/lib/Modules";
import { useRoute, useRouter } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";
import { useToken, usePersonalInfo } from "@/stores/token";
import AskParentDialog from "@/components/dialogs/AskParentDialog.vue";
import EnrolmentSuccedDialog from "@/components/dialogs/EnrolmentSuccedDialog.vue";
import GoToChildrenCoursesDialog from "@/components/dialogs/GoToChildrenCoursesDialog.vue";
import PromoCodeDialog from "@/components/dialogs/PromoCodeDialog.vue";
import CourseBelongsToPlanDialog from "@/components/dialogs/CourseBelongsToPlanDialog.vue";
import CourseDescribtion from "@/components/student/courseDetails/CourseDescribtion.vue";
import CourseMaterial from "@/components/student/courseDetails/CourseMaterial.vue";
import PrequisiteDialog from "@/components/dialogs/PrequisiteDialog.vue";
import { useOrder } from "@/stores/token";
import { ref } from "vue";

const token = useToken();
const personalInfo = usePersonalInfo();

const route = useRoute();
const router = useRouter();

const course = ref();
const first_lesson_video = ref<string|null>()
const courseRequester = new HttpRequester("get_course_free_lessons");

const chapters = ref<any[]>([]);
courseRequester.callApi({ course_id: route.params.courseId }).then((res) => {
  course.value = res?.data?.course;
  first_lesson_video.value = res?.data?.lesson?.source
  for (let chapter of course.value?.chapters) {
    let obj = {
      title: "",
      lessonCount: 0,
      quizCount: 0,
      activityCount: 0,
      materials: <any[]>[],
    };
    obj.title = chapter?.title;
    for (let mat of chapter?.materials) {
      for (let material of materialInfo) {
        if (mat?.type == material.name) {
          obj.materials.push({
            title: selectLang(mat.title),
            icon: material.icon,
          });
        }
      }
      if (mat?.type === "Lesson") {
        obj.lessonCount = obj.lessonCount + 1;
      }
      if (mat?.type === "Quiz") {
        obj.quizCount = obj.quizCount + 1;
      }
      if (mat?.type === "Activity" || mat?.type === "Project" || mat?.type === "Simulation") {
        obj.activityCount = obj.activityCount + 1;
      }
    }
    chapters.value.push(obj);
  }
});

const cost = ref();

const showAskParent = ref(false);
const showEnrollmentSuccess = ref(false);
const showBelongToPlan = ref(false);
const showSelectChild = ref(false);
const showPromoCode = ref(false);
const planId = ref();
const showPrequisiteDialog = ref(false);

function enroll() {
  if (!token.getIsAuthorized) {
    router.push("/login");
  }else if (true){
    const order = useOrder()
    order.setOrder({courseTitle:course.value?.title,coursePrice:course.value.price})
    router.push('/Checkout')
  }
   else if (personalInfo.getInfo?.userType == "Child") {
    const planCourseRequester = new HttpRequester("get_course_plan");
    planCourseRequester
      .callApi({ course_id: route.params?.courseId })
      .then((res) => {
        if (res?.success == false) {
          showPromoCode.value = true;
        } else if (res?.success == true) {
          showBelongToPlan.value = true;
          planId.value = res?.data?.plan?.id;
        }
      });
  } else if (personalInfo.getInfo?.userType == "Parent") {
    if (route.params?.childId == "0") {
      showSelectChild.value = true;
    } else {
      const planCourseRequester = new HttpRequester("get_course_plan");
      planCourseRequester
        .callApi({ course_id: route.params?.courseId })
        .then((res) => {
          if (res?.success == false) {
            showPromoCode.value = true;
          } else if (res?.success == true) {
            showBelongToPlan.value = true;
            planId.value = res?.data?.plan?.id;
          }
        });
    }
  }
}

function requestEnrollmentWithPromoCode(promoCode: string) {
  showPromoCode.value = false;
  let childId
  if (personalInfo.getInfo?.userType == 'Parent') {
    childId = route.params.childId ?? ''
  }
  else if (personalInfo.getInfo?.userType == 'Child') {
    childId = personalInfo.getInfo.id
  }
  const requestEnrollment = new HttpRequester("request_enrollment");
  requestEnrollment
    .callApi({
      request: {
        student_id: childId,
        course_id: course.value?.id,
        promo_code: promoCode,
      },
    })
    .then((res) => {
      if (res?.success) {
        cost.value = res?.data?.request?.price;
        showEnrollmentSuccess.value = true;
      }
    });
}

const isEnrolled = ref(false);
const enrollmentId = ref();

const enrollmentRequester = new HttpRequester("get_enrollment");
enrollmentRequester
  .callApi({ course_id: route.params.courseId })
  .then((res) => {
    if (res?.data?.enrollment) {
      isEnrolled.value = true;
      enrollmentId.value = res?.data?.enrollment?.id;
    }
  });

const prequisiteId = ref("");
const prequisiteTitle = ref("");
const planRequester = new HttpRequester("get_course_plan");

function viewMaterial() {
  planRequester.callApi({ course_id: route.params.courseId }).then((res) => {
    let courses = res?.data?.plan?.courses;
    prequisiteId.value = courses?.find((course: any) => {
      return course?.Id == route.params.courseId;
    })?.ristriction_on_course;

    new HttpRequester("get_course")
      .callApi({ course_id: prequisiteId.value || "" })
      .then((res) => {
        prequisiteTitle.value = selectLang(res?.data?.course?.title) || "";
      });

    new HttpRequester("get_enrollment")
      .callApi({ course_id: prequisiteId.value || "" })
      .then((res) => {
        if (res?.data?.enrollment?.is_completed == false) {
          showPrequisiteDialog.value = true;


        } else {
          
          router.push(
            `/viewCoursePage/${route.params.courseId}/${enrollmentId.value}/${course.value?.chapters[0]?.materials[0]?.Id}`
          );
        }
      });
  });
}
</script>

<template>
  <Navbar />
  <div class="big-container">
    <AskParentDialog :showDialog="showAskParent" @removeDialog="
      (res) => {
        showAskParent = false;
      }
    " />

    <PrequisiteDialog :course="prequisiteTitle" :show-dialog="showPrequisiteDialog" @remove-dialog="showPrequisiteDialog = false" />
    <EnrolmentSuccedDialog :showDialog="showEnrollmentSuccess" :cost="cost" />
    <GoToChildrenCoursesDialog :showDialog="showSelectChild" />
    <CourseBelongsToPlanDialog :showDialog="showBelongToPlan" :planId="planId" :childId="route.params?.childId" />
    <PromoCodeDialog :showDialog="showPromoCode" @promoCode="
      (promo_code) => {
        requestEnrollmentWithPromoCode(promo_code);
      }
    " />
    <CourseDescribtion :first_lesson_video="first_lesson_video" :course="course" :isEnrolled="isEnrolled" :userType=personalInfo.getInfo?.userType :notShowButton="personalInfo.getInfo?.userType == 'Parent' &&
      route.params.isEnrolled == '1'
      " @enroll="enroll" @viewMaterial="viewMaterial" />

    <div class="content">
      <CourseMaterial :chapters="chapters" v-if="chapters?.length > 0" />

      <Information :categories="course?.categories" :title="selectLang(course?.title)" :price="course?.price" :duration="course?.duration" :min_age="course?.min_age" :max_age="course?.max_age" />
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.big-container {
  display: grid;
  width: 90%;
  margin-inline: auto;
  grid-template-columns: 3fr 2fr;
  margin-bottom: 4rem;
  gap: 2rem;
}

.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 10.5rem;
}

@media screen and (max-width: 1200px) {
  .big-container {
    display: flex;
    flex-direction: column;
  }

  .content {
    margin-top: 3rem;
  }
}
</style>
