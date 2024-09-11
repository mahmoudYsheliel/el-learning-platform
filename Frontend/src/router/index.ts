import { createRouter, createWebHistory } from "vue-router";
import { useToken, usePersonalInfo } from "../stores/token";

import LandingPage from "../views/generalViews/LandingPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/generalViews/LoginPage.vue"),
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
      path: "/signup",
      name: "signup",
      component: () => import("@/views/generalViews/signupPage.vue"),
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/programs/:programId",
      name: "programs",
      component: () => import("@/views/studentViews/viewProgram.vue"),
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
      path: "/AdminProgram/:programId",
      name: "AdminProgram",
      component: () => import("@/views/adminViews/AdminProgram.vue"),
      meta: { requredAuth: true, userType: "Admin" },
    },
    {
      path: "/manageUsers",
      name: "manageUsers",
      component: () => import("@/views/adminViews/manageUsers.vue"),
      meta: { requredAuth: true, userType: "Admin" },
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
  } else if ((to.name == "login" || to.name == "signup") && authorized) {
    next({ name: "home" });
  } else {
    const personalInfo = usePersonalInfo();
    let userType = personalInfo.getInfo;
    if (userType?.userType != to.meta.userType && to.meta.userType != "Any") {
      next({ name: "home" });
    } else {
      next();
    }
  }
});

export default router;
