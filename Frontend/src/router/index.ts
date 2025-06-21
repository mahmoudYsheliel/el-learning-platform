import { createRouter, createWebHashHistory } from "vue-router";
import { useToken, usePersonalInfo } from "../stores/token";

import LandingPage from "../views/generalViews/LandingPage.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/generalViews/LoginPage.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/PrivacyPolicy",
      name: "PrivacyPolicy",
      component: () => import("../views/generalViews/PrivacyPolicy.vue"),
      meta: { requredAuth: false, userType: "Any" },

    },
    {
      path: "/EmailVerified/:token",
      name: "EmailVerified",
      component: () => import("../views/generalViews/EmailVerified.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/VerifyEmail/:email",
      name: "VerifyEmail",
      component: () => import("../views/generalViews/VerifyEmail.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/SubscriptionPlans",
      name: "SubscriptionPlans",
      component: () => import("../views/generalViews/SubscriptionPlans.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/TermConditions",
      name: "TermConditions",
      component: () => import("../views/generalViews/TermConditions.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/RefundPolicy",
      name: "RefundPolicy",
      component: () => import("../views/generalViews/RefundPolicy.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/forgotPassword/:token?",
      name: "forgotPassword",
      component: () => import("../views/generalViews/forgotPassword.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/",
      name: "home",
      component: LandingPage,
      meta: { requredAuth: false, userType: "Any" },
    },

    {
      path: "/freeCourses",
      name: "freeCourses",
      component: () => import("../views/generalViews/freeCourses.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/freeLesson/:courseId/:lessonId",
      name: "freeLesson",
      component: () => import("../views/generalViews/freeLesson.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/plan/:planId/:childId",
      name: "plan",
      component: () => import("../views/generalViews/planView.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },

    {
      path: "/tracePlans/:selectedPlanId/:childId",
      name: "tracePlans",
      component: () => import("../views/generalViews/tracePlans.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },


    {
      path: "/PaymobSuccess",
      name: "PaymobSuccess",
      component: () => import("../views/generalViews/PaymobSuccess.vue"),
      meta: { requredAuth: true, userType: "Any" },
    },
    {
      path: "/PaymobFailure",
      name: "PaymobFailure",
      component: () => import("../views/generalViews/PaymobFailure.vue"),
      meta: { requredAuth: true, userType: "Any" },
    },
    {
      path: "/PaymobCallBack",
      name: "PaymobCallBack",
      component: () => import("../views/generalViews/PaymobCallBack.vue"),
      meta: { requredAuth: true, userType: "Any" },
    },




    {
      path: "/Checkout",
      name: "Checkout",
      component: () => import("../views/generalViews/Checkout.vue"),
      meta: { requredAuth: true, userType: "Any" },
    },
    {
      path: "/courseDetails/:courseId/:childId/:isEnrolled",
      name: "courseDetails",
      component: () => import("@/views/generalViews/courseDetails.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/viewCoursePage/:courseId/:enrollmentId/:materialId",
      name: "viewCoursePage",
      component: () => import("../views/studentViews/viewCoursePage.vue"),
      meta: { requredAuth: true, userType: "Child" },
    },
    {
      path: "/signup/:role?",
      name: "signup",
      component: () => import("@/views/generalViews/signupPage.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/programs/:programId/:subscriptionPlanId?",
      name: "programs",
      component: () => import("@/views/studentViews/viewProgram.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/tracks/:programId/:trackId",
      name: "tracks",
      component: () => import("@/views/studentViews/viewTrack.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },

    {
      path: "/parentHome",
      name: "parentHome",
      component: () => import("@/views/parentViews/parentHome.vue"),
      meta: { requredAuth: true, userType: "Parent" },
    },
    {
      path: "/childrenProgress",
      name: "childrenProgress",
      component: () => import("@/views/parentViews/childrenProgress.vue"),
      meta: { requredAuth: true, userType: "Parent" },
    },
    {
      path: "/childrenCourses",
      name: "childrenCourses",
      component: () => import("@/views/parentViews/childrenCourses.vue"),
      meta: { requredAuth: true, userType: "Parent" },
    },
    {
      path: "/childrenAnalysis",
      name: "childrenAnalysis",
      component: () => import("@/views/parentViews/childrenAnalysis.vue"),
      meta: { requredAuth: true, userType: "Parent" },
    },

    {
      path: "/viewChildAnalysis",
      name: "viewChildAnalysis",
      component: () => import("@/views/studentViews/viewChildAnalysis.vue"),
      meta: { requredAuth: true, userType: "Child" },
    },
    {
      path: "/addChild",
      name: "addChild",
      component: () => import("@/views/parentViews/addChild.vue"),
      meta: { requredAuth: true, userType: "Parent" },
    },
    {
      path: "/parentSettings",
      name: "parentSettings",
      component: () => import("@/views/parentViews/parentSettings.vue"),
      meta: { requredAuth: true, userType: "Parent" },
    },
    {
      path: "/subscription",
      name: "subscription",
      component: () => import("@/views/parentViews/subscription.vue"),
      meta: { requredAuth: true, userType: "Parent" },
    },

    {
      path: "/childCourses",
      name: "childCourses",
      component: () => import("@/views/studentViews/childCourses.vue"),
      meta: { requredAuth: true, userType: "Child" },
    },

    {
      path: "/enrollmentRequests",
      name: "enrollmentRequests",
      component: () => import("@/views/studentViews/viewStudentEnrollmentRequests.vue"),
      meta: { requredAuth: true, userType: "Child" },
    },
    {
      path: "/studentProgress",
      name: "studentProgress",
      component: () => import("@/views/studentViews/viewStudentProgress.vue"),
      meta: { requredAuth: true, userType: "Child" },
    },

    {
      path: "/studentAnalysis",
      name: "studentAnalysis",
      component: () => import("@/views/studentViews/viewStudentAnalysis.vue"),
      meta: { requredAuth: true, userType: "Child" },
    },

    {
      path: "/childNotifications",
      name: "childNotifications",
      component: () => import("@/views/studentViews/childNotifications.vue"),
      meta: { requredAuth: true, userType: "Child" },
    },

    {
      path: "/analysisQuiz/:quizId",
      name: "analysisQuiz",
      component: () => import("@/views/studentViews/analysisQuiz.vue"),
      meta: { requredAuth: true, userType: "Child" },
    },
    {
      path: "/manageRequests",
      name: "manageRequests",
      component: () => import("@/views/adminViews/manageRequests.vue"),
      meta: { requredAuth: true, userType: "Admin" },
    },
    {
      path: "/manageCourses",
      name: "manageCourses",
      component: () => import("@/views/adminViews/manageCourses.vue"),
      meta: { requredAuth: true, userType: "Admin" },
    },
    {
      path: "/manageInstructors",
      name: "manageInstructors",
      component: () => import("@/views/adminViews/manageInstructors.vue"),
      meta: { requredAuth: true, userType: "Admin" },
    },
    {
      path: "/manageLogs",
      name: "manageLogs",
      component: () => import("@/views/adminViews/manageLogs.vue"),
      meta: { requredAuth: true, userType: "Admin" },
    },
    {
      path: "/editCourse/:courseId",
      name: "editCourse",
      component: () => import("@/views/adminViews/editCourse.vue"),
      meta: { requredAuth: true, userType: "Admin" },
    },
    {
      path: "/editPlan/:planId",
      name: "editPlan",
      component: () => import("@/views/adminViews/editPlan.vue"),
      meta: { requredAuth: true, userType: "Admin" },
    },
    {
      path: "/editProgram/:programId",
      name: "editProgram",
      component: () => import("@/views/adminViews/editProgram.vue"),
      meta: { requredAuth: true, userType: "Admin" },
    },
    {
      path: "/editCategory/:categoryId",
      name: "editCategory",
      component: () => import("@/views/adminViews/editCategory.vue"),
      meta: { requredAuth: true, userType: "Admin" },
    },
    {
      path: "/manageUsers",
      name: "manageUsers",
      component: () => import("@/views/adminViews/manageUsers.vue"),
      meta: { requredAuth: true, userType: "Admin" },
    },
    {
      path: "/editInstructor/:instructorId",
      name: "editInstructor",
      component: () => import("@/views/adminViews/editInstructor.vue"),
      meta: { requredAuth: true, userType: "Admin" },
    },
    {
      path: "/instructorProfile",
      name: "instructorProfile",
      component: () => import("@/views/instructorViews/instructorProfile.vue"),
      meta: { requredAuth: true, userType: "Instructor" },
    },
    {
      path: "/instructorChats/:id",
      name: "instructorChats",
      component: () => import("@/views/instructorViews/instructorChats.vue"),
      meta: { requredAuth: true, userType: "Instructor" },
    },
    {
      path: "/childChats/:id",
      name: "childChats",
      component: () => import("@/views/studentViews/childChats.vue"),
      meta: { requredAuth: true, userType: "Child" },
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      if (to.hash) {
        resolve({
          el: to.hash,
          behavior: "smooth",
        });
      } else {
        resolve({ left: 0, top: 0 });
      }
    });
  },
});

router.beforeResolve(async (to, from, next) => {
  if (to.name == "notFound") {
    next({});
  }
  const token = useToken();
  let authorized = token.getIsAuthorized;
  if (to.meta.requredAuth && !authorized) {
    next({ name: "login" });
  } else if ((to.name == "login" || to.name == "signup" || to.name == "VerifyEmail" || to.name == "EmailVerified") && authorized) {
    next({ name: "home" });
  } else {
    const personalInfo = usePersonalInfo();
    let userType = personalInfo.getInfo;
    if (userType?.userType != to.meta.userType && to.meta.userType != "Any" && userType?.userType != "Admin") {
      next({ name: "home" });
    } else {
      next();
    }
  }
});

export default router;
