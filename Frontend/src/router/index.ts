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
import viewProgram from '@/views/studentViews/viewProgram.vue';
import parentProfile from '@/views/parentViews/parentProfile.vue';
import children from '@/views/parentViews/children.vue';
import payment from '@/views/parentViews/payment.vue';
import subscription from '@/views/parentViews/subscription.vue';
import parentSettings from '@/views/parentViews/parentSettings.vue';
import addChild from '@/views/parentViews/addChild.vue'; 
import parentViewCourse from '@/views/parentViews/parentViewCourse.vue';
import childCourses from '@/views/studentViews/childCourses.vue';
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
      path: '/viewCourseDetails/:courseId',
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
    {
      path: '/programs/:programId',
      name: 'programs',
      component: viewProgram,
      meta: { requredAuth: false },
    },


    {
      path: '/parentProfile',
      name: 'parentProfile',
      component: parentProfile,
      meta: { requredAuth: true },
    },
    {
      path: '/children',
      name: 'children',
      component: children,
      meta: { requredAuth: true },
    },
    {
      path: '/parentViewCourse/:courseId/:studentId/:isEnrolled',
      name: 'parentViewCourse',
      component: parentViewCourse,
      meta: { requredAuth: true },
    },
    {
      path: '/addChild',
      name: 'addChild',
      component: addChild,
      meta: { requredAuth: true },
    },
    {
      path: '/parentSettings',
      name: 'parentSettings',
      component: parentSettings,
      meta: { requredAuth: true },
    },
    {
      path: '/payment',
      name: 'payment',
      component: payment,
      meta: { requredAuth: true },
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: subscription,
      meta: { requredAuth: true },
    },
    {
      path: '/childCourses',
      name: 'childCourses',
      component: childCourses,
      meta: { requredAuth: true },
    },
    { path: "/:pathMatch(.*)", name:'notFound',component: LandingPage },
  ]
})

router.beforeResolve(async(to, from, next) => {

  if (to.name=='notFound'){
    next({})
  }
  const token = useToken();
  let authorized = token.getIsAuthorized;
  if (to.meta.requredAuth && !authorized) {
    next({ name: "login" });
  } else if ((to.name=='login' || to.name=='signup') && authorized) {
    next({name:'home'})
  } else {
    next();
  }
});


export default router
