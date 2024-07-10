import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/generalViews/LandingPage.vue";

import LoginPage from "../views/generalViews/LoginPage.vue";
import ViewCourseDetails from "../views/studentViews/ViewCourseDetails.vue";
import viewCoursePage from "../views/studentViews/viewCoursePage.vue";
import instructorHome from "../views/adminViews/instructorHome.vue";
import addCourse from "@/views/adminViews/addCourse.vue";
import addCourseMaterial from "@/views/adminViews/addCourseMaterial.vue";
import signupPage from "@/views/generalViews/signupPage.vue";
import viewProgram from "@/views/studentViews/viewProgram.vue";
import parentHome from "@/views/parentViews/parentHome.vue";
import childrenCourses from "@/views/parentViews/childrenCourses.vue";
import childrenProgress from "@/views/parentViews/childrenProgress.vue";
import childrenAnalysis from "@/views/parentViews/childrenAnalysis.vue";

import subscription from "@/views/parentViews/subscription.vue";
import parentSettings from "@/views/parentViews/parentSettings.vue";
import addChild from "@/views/parentViews/addChild.vue";
import parentViewCourse from "@/views/parentViews/parentViewCourse.vue";
import childCourses from "@/views/studentViews/childCourses.vue";
import manageRequests from "@/views/adminViews/manageRequests.vue"
import { useToken, usePersonalInfo } from "../stores/token";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/",
      name: "home",
      component: LandingPage,
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/viewCourseDetails/:courseId",
      name: "viewCourseDetails",
      component: ViewCourseDetails,
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/viewCoursePage/:courseId/:enrollmentId/:materialId",
      name: "viewCoursePage",
      component: viewCoursePage,
      meta: { requredAuth: true, userType: "Child" },
    },
    {
      path: "/instructorHome",
      name: "instructorHome",
      component: instructorHome,
      meta: { requredAuth: true, userType: "Instructor" },
    },
    {
      path: "/addCourse",
      name: "addCourse",
      component: addCourse,
      meta: { requredAuth: true, userType: "Instructor" },
    },
    {
      path: "/addCourseMaterial/:courseId",
      name: "addCourseMaterial",
      component: addCourseMaterial,
      meta: { requredAuth: true, userType: "Instructor" },
    },
    {
      path: "/signup",
      name: "signup",
      component: signupPage,
      meta: { requredAuth: false, userType: "Any" },
    },
    {
      path: "/programs/:programId",
      name: "programs",
      component: viewProgram,
      meta: { requredAuth: false, userType: "Any" },
    },


    {
      path: "/parentHome",
      name: "parentHome",
      component: parentHome,
      meta: { requredAuth: true, userType: "Parent" },
    },
    {
      path: "/childrenProgress",
      name: "childrenProgress",
      component: childrenProgress,
      meta: { requredAuth: true, userType: "Parent" },
    },
    {
      path: "/childrenCourses",
      name: "childrenCourses",
      component: childrenCourses,
      meta: { requredAuth: true, userType: "Parent" },
    },
    {
      path: "/childrenAnalysis",
      name: "childrenAnalysis",
      component: childrenAnalysis,
      meta: { requredAuth: true, userType: "Parent" },
    },
    {
      path: "/parentViewCourse/:courseId/:studentId/:isEnrolled",
      name: "parentViewCourse",
      component: parentViewCourse,
      meta: { requredAuth: true, userType: "Parent" },
    },
    {
      path: "/addChild",
      name: "addChild",
      component: addChild,
      meta: { requredAuth: true, userType: "Parent" },
    },
    {
      path: "/parentSettings",
      name: "parentSettings",
      component: parentSettings,
      meta: { requredAuth: true, userType: "Parent" },
    },
    {
      path: "/subscription",
      name: "subscription",
      component: subscription,
      meta: { requredAuth: true, userType: "Parent" },
    },

    
    {
      path: "/childCourses",
      name: "childCourses",
      component: childCourses,
      meta: { requredAuth: true, userType: "Child" },
    },
    {
      path: "/manageRequests",
      name: "manageRequests",
      component: manageRequests,
      meta: { requredAuth: true, userType: "Admin" },
    },
    { path: "/:pathMatch(.*)", name: "notFound", component: LandingPage },
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
    if (userType?.userType != to.meta.userType && to.meta.userType != 'Any') {
      next({ name: "home" });
    } else {
      next();
    }
  }
});

export default router;
