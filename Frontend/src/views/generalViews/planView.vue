<script lang="ts" setup>
import Navbar from "@/components/general/Navbar.vue";
import Options from "@/components/general/Options.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import { selectLang, translationModule } from "@/lib/Translate";
import CourseCard from "@/components/general/CourseCard.vue";
import { useRouter, useRoute } from "vue-router";
import PlanDescribtion from "@/components/student/planDetails/PlanDescribtion.vue";
import AskParentDialog from "@/components/dialogs/AskParentDialog.vue";
import EnrolmentSuccedDialog from "@/components/dialogs/EnrolmentSuccedDialog.vue";
import GoToChildrenCoursesDialog from "@/components/dialogs/GoToChildrenCoursesDialog.vue";
import PromoCodeDialog from "@/components/dialogs/PromoCodeDialog.vue";
import { useToken, usePersonalInfo } from "@/stores/token";

import { ref } from "vue";
const route = useRoute();
const router = useRouter();
const token = useToken();
const personalInfo = usePersonalInfo();
const selectedPlan = ref();
const courses = ref<any[]>([]);
const planRequester = new HttpRequester("get_plan");
planRequester.callApi({ plan_id: route.params.planId }).then((res) => {
  if (res.success) {
    selectedPlan.value = res?.data?.plan;

    for (let course of res?.data?.plan?.courses) {
      new HttpRequester("get_course")
        .callApi({ course_id: course?.Id })
        .then((res) => {
          if (res?.success) {
            courses.value.push(res?.data?.course);
          }
        });
    }
  }
});

const cost = ref();
const showAskParent = ref(false);
const showEnrollmentSuccess = ref(false);
const showSelectChild = ref(false);
const showPromoCode = ref(false);
function enroll() {
  if (!token.getIsAuthorized) {
    router.push("/login");
  } else if (personalInfo.getInfo?.userType == "Child") {
    showAskParent.value = true;
  } else if (personalInfo.getInfo?.userType == "Parent") {
    if (route.params?.childId == "0") {
      showSelectChild.value = true;
    } else if (route.params?.childId != "0") {
      showPromoCode.value = true;
    }
  }
}
function requestEnrollmentWithPromoCode(promoCode: string) {
  showPromoCode.value = false;
  const requestEnrollment = new HttpRequester("request_enrollment");
  requestEnrollment
    .callApi({
      request: {
        student_id: route.params.childId,
        course_id: selectedPlan.value?.id,
        promo_code: promoCode,
        package_type:'plan'
      },
    })
    .then((res) => {
      if (res?.success) {
        cost.value = res?.data?.request?.price;
        showEnrollmentSuccess.value = true;
      }
    });
}
</script>

<template>
  <Navbar />
  <Options />

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
 
  <PromoCodeDialog
    :showDialog="showPromoCode"
    @promoCode="
      (promo_code) => {
        requestEnrollmentWithPromoCode(promo_code);
      }
    "
  />

  <div class="container">
    <PlanDescribtion :plan="selectedPlan" @enroll="enroll"/>
    <div class="courses">
      <h2>{{ selectLang(translationModule.planCourses) }}</h2>
      <div class="coursesContainer">
        <CourseCard v-for="course in courses" :course="course" search="" />
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
h2 {
  color: var(--accent1);
}
.courses {
  margin-top: 5rem;
}
.coursesContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}
.container {
  display: grid;
  padding-inline: 4rem;
  gap: 2rem;
  grid-template-columns: 3fr 2fr;
  margin-bottom: 4rem;
}
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
}

@media screen and (max-width: 1200px) {
  .container {
    display: flex;
    flex-direction: column;
    padding-inline: 5rem;
  }
}
</style>
