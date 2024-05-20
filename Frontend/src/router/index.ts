import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/studentViews/LandingPage.vue'
import LoginPage from '../views/studentViews/LoginPage.vue'
import ViewCourses from '../views/studentViews/ViewCourses.vue';
import ViewCourseDetails from '../views/studentViews/ViewCourseDetails.vue';
import viewCoursePage from '../views/studentViews/viewCoursePage.vue';
import instructorHome from '../views/instructorViews/instructorHome.vue';
import addCourse from '@/views/instructorViews/addCourse.vue';
import addCourseMaterial from '@/views/instructorViews/addCourseMaterial.vue';
import signupPage from '@/views/studentViews/signupPage.vue';
import { useToken } from "../stores/token";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { requredAuth: false },
    },
    {
      path: '/',
      name: 'home',
      component: LandingPage,
      meta: { requredAuth: false },
    },
    {
      path: '/viewCourses',
      name: 'viewCourses',
      component: ViewCourses,
      meta: { requredAuth: false },
    },
    {
      path: '/viewCourseDetails/:id',
      name: 'viewCourseDetails',
      component: ViewCourseDetails,
      meta: { requredAuth: false },
    },
    {
      path: '/viewCoursePage/:courseId/:enrollmentId/:materialId',
      name: 'viewCoursePage',
      component: viewCoursePage,
      meta: { requredAuth: true },
    },
    {
      path: '/instructorHome',
      name: 'instructorHome',
      component: instructorHome,
      meta: { requredAuth: true },
    },
    {
      path: '/addCourse',
      name: 'addCourse',
      component: addCourse,
      meta: { requredAuth: true },
    },
      {
      path: '/addCourseMaterial/:courseId',
      name: 'addCourseMaterial',
      component: addCourseMaterial,
      meta: { requredAuth: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: signupPage,
      meta: { requredAuth: false },
    },
  ]
})
/*
router.beforeResolve((to, from, next) => {
  if(to.name=='notFound'){
    next()
  }

  const token = useToken();
  let authorized = token.getIsAuthorized;
  console.log(authorized)
  if (to.meta.requredAuth && !authorized) {
    next({ name: "lofin_signup" });
  } else if (!to.meta.requredAuth && authorized) {
    next({ name: "user" });
  } else {
    next();
  }
});*/
export default router
