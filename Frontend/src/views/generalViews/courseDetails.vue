<script lang="ts" setup>
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import Information from "@/components/student/courseDetails/Information.vue";
import "primeicons/primeicons.css";
import { selectLang, translationModule } from "@/lib/Translate";
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

import { ref } from "vue";

const token = useToken();
const personalInfo = usePersonalInfo();

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

const cost = ref();

const showAskParent = ref(false);
const showEnrollmentSuccess = ref(false);
const showBelongToPlan = ref(false);
const showSelectChild = ref(false);
const showPromoCode = ref(false);
const planId = ref()

function enroll() {
  if (!token.getIsAuthorized) {
    router.push("/login");
  } else if (personalInfo.getInfo?.userType == "Child") {
    showAskParent.value = true;
  } else if (personalInfo.getInfo?.userType == "Parent") {
    const planCourseRequester = new HttpRequester("get_course_plan");
    planCourseRequester
      .callApi({ course_id: route.params?.courseId })
      .then((res) => {
        console.log(res)
        if (res.success == false) {
          showPromoCode.value = true;
        } else if (res?.success == true) {
          if (route.params?.childId == "0") {
            showSelectChild.value = true;
          } else if (route.params?.childId != "0")
            showBelongToPlan.value = true;
            planId.value = res?.data?.plan?.id
        }
      });
  }
}

function requestEnrollmentWithPromoCode(promoCode: string) {
  showPromoCode.value = false;
  const requestEnrollment = new HttpRequester("request_enrollment");
  requestEnrollment
    .callApi({
      request: {
        student_id: route.params.childId,
        course_id: course.value?.id,
        promo_code: promoCode,
      },
    })
    .then((res) => {
      if (res?.success) {
        cost.value = res?.data?.request?.price;
        console.log(cost.value);
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
    if (res.data.enrollment) {
      isEnrolled.value = true;
      enrollmentId.value = res.data.enrollment?.id;
    }
  });

function viewMaterial() {
  router.push(
    `/viewCoursePage/${route.params.courseId}/${enrollmentId.value}/${course.value?.chapters[0]?.materials[0]?.Id}`
  );
}
</script>

<template>
  <Navbar />
  <div class="big-container">
    <AskParentDialog
      :showDialog="showAskParent"
      @removeDialog="
        (res) => {
          showAskParent = false;
        }
      "
    />
    <EnrolmentSuccedDialog :showDialog="showEnrollmentSuccess" :cost="cost" />
    <GoToChildrenCoursesDialog :showDialog="showSelectChild" />
    <CourseBelongsToPlanDialog :showDialog="showBelongToPlan" :planId="planId" :childId="route.params?.childId"/>
    <PromoCodeDialog
      :showDialog="showPromoCode"
      @promoCode="
        (promo_code) => {
          requestEnrollmentWithPromoCode(promo_code);
        }
      "
    />
    <CourseDescribtion
      :course="course"
      :isEnrolled="isEnrolled"
      :notShowButton="
        personalInfo.getInfo?.userType == 'Parent' &&
        route.params.isEnrolled == '1'
      "
      @enroll="enroll"
      @viewMaterial="viewMaterial"
    />

    <div class="content">
      <CourseMaterial :chapters="chapters" />

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
.big-container {
  display: grid;
  padding-inline: 5rem;
  grid-template-columns: 3fr 2fr;
  margin-bottom: 4rem;
}
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 12rem;
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
}
</style>
