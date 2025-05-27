import { translationModule } from "@/lib/Translate";
import { usePersonalInfo } from "@/stores/token";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { selectLang } from "@/lib/Translate";
import { shallowRef, ref } from "vue";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import { post_event } from "./mediator";

export const pagesToRoute = [
  { name: translationModule.home, to: "/#Home" },
  { name: translationModule.courses, to: "/#Courses" },
  { name: translationModule.about, to: "/#About" },
  { name: translationModule.contact, to: "/#Contact" },
];


export const items = ((router: any) => {

  const personalInfo = usePersonalInfo();
  let items: any

  if (personalInfo.getInfo?.userType == "Admin") {
    items = [
      {
        label: selectLang(translationModule.maangeRequests),
        command: () => {
          router.push("/manageRequests");
        },
      },
      {
        label: selectLang(translationModule.manageUsers),
        command: () => {
          router.push("/manageUsers");
        },
      },
      {
        label: selectLang(translationModule.manageCourses),
        command: () => {
          router.push("/manageCourses");
        },
      },
      {
        label: selectLang(translationModule.manageInstructors),
        command: () => {
          router.push("/manageInstructors");
        },
      },
      {
        label: selectLang(translationModule.manageLogs),
        command: () => {
          router.push("/manageLogs");
        },
      },
    ];
  } else if (personalInfo.getInfo?.userType == "Parent") {
    items = [
      {
        label: selectLang(translationModule.addChild),
        icon: "pi pi-user-plus",
        command: () => {
          router.push("/addChild");
        },
      },
      {
        label: selectLang(translationModule.childCourses),
        icon: "pi pi-shopping-bag",
        command: () => {
          router.push("/childrenCourses");
        },
      },
      {
        label: selectLang(translationModule.childProgress),
        icon: "pi pi-chart-line",
        command: () => {
          router.push("/childrenProgress");
        },
      },
      {
        label: selectLang(translationModule.childAnalysis),
        icon: "pi pi-id-card",
        command: () => {
          router.push("/childrenAnalysis");
        },
      },

      {
        label: selectLang(translationModule.enrollmentRequests),
        icon: "pi pi-check-circle",
        command: () => {
          router.push("/parentHome");
        },
      },

      // {
      //   label: selectLang(translationModule.sub),
      //   command: () => {
      //     router.push("/subscription");
      //   },
      // },
      {
        label: selectLang(translationModule.personalInfo),
        icon: "pi pi-user",
        command: () => {
          router.push("/parentSettings");
        },
      },
    ];
  } else if (personalInfo.getInfo?.userType == "Child") {
    items = [
      {
        label: selectLang(translationModule.myCourses),
        icon:'pi pi-shopping-bag',
        command: () => {
          router.push("/childCourses");
        },
      },
      {
        label: selectLang(translationModule.studentProgress),
        icon: "pi pi-chart-line",
        command: () => {
          router.push("/studentProgress");
        },
      },
      {
        label: selectLang(translationModule.studentAnalusis),
        icon: "pi pi-id-card",
        command: () => {
          router.push("/studentAnalysis");
        },
      },

      {
        label: selectLang(translationModule.enrollmentRequests),
        icon: "pi pi-check-circle",
        command: () => {
          router.push("/enrollmentRequests");
        },
      },


      {
        label: selectLang(translationModule.notifications),
        icon: "pi pi-bell",
        command: () => {
          router.push("/childNotifications");
        },
      },
      {
        label: selectLang(translationModule.chats),
        icon:'pi pi-question-circle',
        command: () => {
          router.push("/childChats/0");
        },
      },
    ];
  }
  else if (personalInfo.getInfo?.userType == "Instructor") {
    items = [
      {
        label: "Profile",
        command: () => {
          router.push("/instructorProfile");
        },
      },
      {
        label: "Chats",
        command: () => {
          router.push("/instructorChats/0");
        },
      },
    ];
  }
  else {
    items = [
      {
        label: selectLang(translationModule.logout),
        command: () => {
          return true;
        },
      },
    ];
  }
  post_event('nav_items', items)
  return items
});

export const achievments = [
  {
    image: "/images/CommunicationMinistry.png.png",
    text: {
      en: "Trace is currently being incubated by the official incubator of the Egyptian Ministry of Communications and Information Technology. This support provides Trace with valuable resources and mentorship, accelerating its growth and development in the tech industry and enhancing its potential for success.",
      ar: "تتلقى Trace حاليًا الدعم من الحاضنة الرسمية لوزارة الاتصالات وتكنولوجيا المعلومات المصرية. يوفر هذا الدعم لـ Trace موارد قيمة وإرشادًا، مما يسرع نموها وتطورها في صناعة التكنولوجيا ويعزز إمكانياتها للنجاح.",
    },
    header: {
      en: "Trace Incubated by the Official Incubator of the Egyptian Ministry of Communications and Information Technology",
      ar: " Trace تحت احتضان الحاضنة الرسمية لوزارة الاتصالات وتكنولوجيا المعلومات المصرية",
    },
  },
  {
    image: "/images/KAUST.png",
    header: {
      en: "One Year of Inspiration and Growth with KAUST!",
      ar: "سنة من الإلهام والنمو مع جامعة كاوست",
    },
    text: {
      en: "It's been a thrilling year since our Founder and CEO, Eng. Basma Ibrahim, attended the Entrepreneurship Adventure Camp at KAUST. This experience inspired us to launch our platform, helping K-12 students through personalized learning paths. We’re excited about our progress and look forward to more achievements in the future.",
      ar: "لقد مرت سنة مثيرة منذ حضور مؤسستنا والمديرة التنفيذية، المهندسة بسمة إبراهيم، لمخيم مغامرات ريادة الأعمال في جامعة الملك عبدالله للعلوم والتقنية (كاوست). هذه التجربة ألهمتنا لإطلاق منصتنا، لمساعدة طلاب التعليم الأساسي من خلال مسارات تعلم مخصصة. نحن متحمسون لما حققناه ونتطلع إلى مزيد من الإنجازات في المستقبل.",
    },
  },
  {
    image: "/images/TechWomen.png",
    header: {
      en: "Trace Among TechWomen Program 2023",
      ar: "Trace ضمن برنامج TechWomen 2023",
    },
    text: {
      en: "Trace has been proudly selected as part of the prestigious TechWomen Program 2023, an initiative of the U.S. Department of State's Bureau of Educational and Cultural Affairs. This achievement highlights Trace's commitment to innovation and leadership in technology, providing a platform to collaborate, learn, and grow alongside leading women in STEM from around the world.",
      ar: "تم اختيار Trace بفخر كجزء من برنامج TechWomen 2023 المرموق، وهو مبادرة من مكتب الشؤون التعليمية والثقافية التابع لوزارة الخارجية الأمريكية. يعكس هذا الإنجاز التزام Trace بالابتكار والريادة في مجال التكنولوجيا، حيث يوفر لها منصة للتعاون والتعلم والنمو جنبًا إلى جنب مع الرائدات في مجالات العلوم والتكنولوجيا والهندسة والرياضيات من جميع أنحاء العالم.",
    },
  },

  {
    image: "/images/womanLeader.png",
    header: {
      en: "Trace Among Women’s Leadership School",
      ar: "Trace ضمن مدرسة القيادة النسائية",
    },
    text: {
      en: "Trace has been selected to participate in the Women’s Leadership School, part of the Presidential Leadership School and a funded program by the National Training Academy in partnership with the Ministry of Planning and Economic Development. This distinction reflects Trace's dedication to advancing women’s leadership and professional growth, providing access to influential training and development opportunities.",
      ar: "تم اختيار Trace للمشاركة في مدرسة القيادة النسائية، وهي جزء من مدرسة القيادة الرئاسية وبرنامج ممول من الأكاديمية الوطنية للتدريب بالتعاون مع وزارة التخطيط والتنمية الاقتصادية. يعكس هذا التميز التزام Trace بتعزيز القيادة النسائية والنمو المهني، مما يوفر الوصول إلى فرص تدريب وتطوير مؤثرة.",
    },
  },
  {
    image: "/images/MasterCard.jpeg",
    header: {
      en: " Successful Partnership and Mentorship with EdVentures and Mastercard Foundation",
      ar: "إنجاز: شراكة ناجحة وبرنامج إرشادي مع EdVentures ومؤسسة ماستركارد",
    },
    text: {
      en: "Trace Education has proudly partnered with EdVentures and Mastercard Foundation, participating in a transformative mentorship program. Out of 210 startups, we were one of the 19 selected to attend a boot camp in Alexandria, gaining invaluable insights and support that have significantly shaped our growth and trajectory.",
      ar: " تفخر Trace Education بشراكتها مع EdVentures ومؤسسة ماستركارد، حيث شاركت في برنامج إرشادي تحولي. من بين 210 شركات ناشئة، تم اختيارنا كواحدة من 19 شركة لحضور مخيم تدريبي في الإسكندرية، حيث اكتسبنا رؤى ودعماً لا يقدر بثمن وقد أسهم بشكل كبير في نمو مسيرتنا وتوجهنا.",
    },
  },


  {
    image: "/images/STEMLogo.png",
    header: {
      en: "STEM.org Accredited™ Educational Experience",
      ar: "تجربة تعليمية معتمدة من STEM.org™"
    },
    text: {
      en: "Trace Edtech is proud to have earned the prestigious STEM.org Accredited™ Trustmark, an internationally recognized symbol of quality and excellence in STEM education. This accreditation highlights our commitment to providing innovative, engaging, and future-focused learning experiences that empower students with the critical skills needed for success in a rapidly evolving world.",
      ar: "تفخر Trace Edtech بحصولها على علامة الثقة المرموقة STEM.org Accredited™، وهي رمز معترف به دوليًا للجودة والتميز في تعليم العلوم والتكنولوجيا والهندسة والرياضيات. هذا الاعتماد يؤكد التزامنا بتقديم تجارب تعليمية مبتكرة وجذابة وموجهة نحو المستقبل، لتمكين الطلاب بالمهارات اللازمة للنجاح في عالم سريع التغير."
    }
  },
  {
    image: "/images/STEMBest.png",
    header: {
      en: "Top 5% Best in STEM Brands (2024–2025)",
      ar: "أفضل 5% من العلامات التجارية في مجالات العلوم والتكنولوجيا والهندسة والرياضيات (2024-2025)"
    },
    text: {
      en: "We are honored to be recognized among the Top 5% Best in STEM brands worldwide for 2024–2025. This distinction celebrates our exceptional innovation, accessibility, and significant impact in advancing STEM education. At Trace Edtech, we remain dedicated to shaping the future by inspiring and equipping the next generation of STEM leaders.",
      ar: "يشرفنا أن يتم الاعتراف بنا ضمن أفضل 5% من العلامات التجارية في مجالات العلوم والتكنولوجيا والهندسة والرياضيات على مستوى العالم لعام 2024–2025. هذا التقدير يحتفي بإبداعنا الاستثنائي وإمكانية الوصول وتأثيرنا الكبير في تعزيز تعليم STEM. نحن في Trace Edtech نواصل التزامنا بإلهام الجيل القادم من قادة STEM."
    }
  }
];

export const socialMediaIcons = [
  {
    class: "pi pi-facebook",
    to: "https://www.facebook.com/traceedtech",
  },
  {
    class: "pi pi-linkedin",
    to: "https://www.linkedin.com/company/trace-education8/",
  },
  //{ class: "pi pi-youtube", to: "/" },
  {
    class: "pi pi-instagram",
    to: "https://www.instagram.com/trace.education?igsh=ZW9xYnEyaGU1M210",
  },
];

export const pages = [
  { name: translationModule.home, to: "/#Home" },
  { name: translationModule.about, to: "/#About" },
  { name: translationModule.contact, to: "/#contact" },

];

export const childSidebar = [




  

  {
    label: translationModule.myCourses,
    name: "home",
    to: "childCourses",
    icon: "pi pi-shopping-bag",
  },

  {
    label: translationModule.studentProgress,
    name:'progress',
    icon: "pi pi-chart-line",
    to: "studentProgress"
  },
  {
    label: translationModule.studentAnalusis,
    name:'analysis',
    icon: "pi pi-id-card",
    to:"studentAnalysis"
  },

  {
    label: translationModule.enrollmentRequests,
    name:'requests',
    icon: "pi pi-check-circle",
    to: "enrollmentRequests"
  },
  {
    label: translationModule.notifications,
    name: "notifications",
    to: "childNotifications",
    icon: "pi pi-bell",
  },
  {
    label: translationModule.chats,
    name: "Chats",
    to: "ChildChats/0",
    icon: "pi pi-comments",
  },
];

export const grades = computed(() => {
  const makerArr = [
    { label: translationModule.kindergarten, count: 2 },
    { label: translationModule.primary, count: 6 },
    { label: translationModule.preparatory, count: 3 },
    { label: translationModule.secondary, count: 3 },
    { label: translationModule.others, count: 1 },
  ];
  let gradeObj = <any[]>[];
  for (let element of makerArr) {
    let items = <any[]>[];
    for (let i = 0; i < element.count; i++) {
      items.push({
        label:
          element.count == 1
            ? selectLang(element.label)
            : selectLang(element.label) + (i + 1).toString(),
        value:
          element.count == 1
            ? element.label.en
            : element.label.en + (i + 1).toString(),
      });
    }
    gradeObj.push({ label: selectLang(element.label), items: items });
  }
  return gradeObj;
});

export const genders = computed(() => {
  return [
    {
      label: selectLang(translationModule.male),
      value: translationModule.male.en,
    },
    {
      label: selectLang(translationModule.female),
      value: translationModule.female.en,
    },
  ];
});
export const educationSystems = computed(() => {
  return [
    {
      label: selectLang(translationModule.publicSchool),
      value: translationModule.publicSchool.en,
    },
    {
      label: selectLang(translationModule.privateSchools),
      value: translationModule.privateSchools.en,
    },
    {
      label: selectLang(translationModule.internationalScools),
      value: translationModule.internationalScools.en,
    },
    {
      label: selectLang(translationModule.others),
      value: translationModule.others.en,
    },
  ];
});

export const parentSidebarPages = computed(() => {
  return [
    {
      label: selectLang(translationModule.addChild),
      name: "addChild",
      to: "addChild",
      icon: "pi pi-user-plus",
    },
    {
      label: selectLang(translationModule.childCourses),
      name: "childCourses",
      to: "childrenCourses",
      icon: "pi pi-shopping-bag",
    },
    {
      label: selectLang(translationModule.childProgress),
      name: "childProgress",
      to: "childrenProgress",
      icon: "pi pi-chart-line",
    },
    {
      label: selectLang(translationModule.childAnalysis),
      name: "childAnalysis",
      to: "childrenAnalysis",
      icon: "pi pi-id-card",
    },
    {
      label: selectLang(translationModule.enrollmentRequests),
      name: "enrollmentsRequests",
      to: "parentHome",
      icon: "pi pi-check-circle",
    },



    // {
    //   label: selectLang(translationModule.sub),
    //   name: "subscriptions",
    //   to: "subscription",
    //   icon: "pi pi-arrow-right-arrow-left",
    // },
    {
      label: selectLang(translationModule.personalInfo),
      name: "settings",
      to: "parentSettings",
      icon: "pi pi-user",
    },
  ];
});

export const iqLevels = [
  {
    en: "Borderline",
    ar: "منخفظ جدا",
  },
  {
    en: "Low Average",
    ar: " متوسط منخفض",
  },
  {
    en: "Average",
    ar: "متوسط",
  },
  {
    en: "High Average",
    ar: "متوسط ​​عالي",
  },
  {
    en: "Superior",
    ar: "متفوق",
  },
];

export const managerSidebarPages = computed(() => {
  return [
    {
      label: selectLang(translationModule.requests),
      name: "Manage Requests",
      to: "manageRequests",
      icon: "pi pi-bell",
    },
    {
      label: selectLang(translationModule.users),
      name: "Manage Users",
      to: "manageUsers",
      icon: "pi pi-user",
    },
    {
      label: selectLang(translationModule.content),
      name: "Manage Courses",
      to: "manageCourses",
      icon: "pi pi-server",
    },
    {
      label: selectLang(translationModule.instructor),
      name: "Manage Instructors",
      to: "manageInstructors",
      icon: "pi pi-users",
    },
    {
      label: selectLang(translationModule.logs),
      name: "Manage Logs",
      to: "manageLogs",
      icon: "pi pi-arrow-right-arrow-left",
    },
  ];
});

export const instructorSidebarPages = computed(() => {
  return [
    {
      label: 'Profile',
      name: "Profile",
      to: "instructorProfile",
      icon: "pi pi-user",
    },
    {
      label: "Chats",
      name: "Chats",
      to: "instructorChats/0",
      icon: "pi pi-comments",
    },

  ];
});

export const workshopsImages = computed(() => {
  return [
    {
      text: {
        en: "Egypt Space Agency Visit",
        ar: "زيارة لوكالة الفضاء المصرية",
      },
      image: "/images/Arospace.jpeg",
    },

    {
      text: {
        en: "Egypt Space Agency Visit",
        ar: "زيارة لوكالة الفضاء المصرية",
      },
      image: "/images/EgyptSpace.png",
    },


    {
      text: {
        en: "Egypt Space Agency Visit",
        ar: "زيارة لوكالة الفضاء المصرية",
      },
      image: "/images/SpaceAgencyVisit.jpeg",
    },

    {
      text: {
        en: "Electronic Workshop",
        ar: "ورشة الإلكترونيات",
      },
      image: "/images/ElectronicResearch.jpeg",
    },

    {
      text: {
        en: "Renewable Energy Workshop",
        ar: "ورشة الطاقة المتجددة"
      },
      image: "/images/Renewable.JPG",
    },
    {
      text: {
        en: "Renewable Energy Workshop",
        ar: "ورشة الطاقة المتجددة"
      },
      image: "/images/Renewable2.JPG",
    },

  ];
});



export const materialInfo = [
  {
    name: 'Lesson',
    icon: 'pi pi-book',
  },
  {
    name: 'Quiz',
    icon: 'pi pi-check-square',
  },
  {
    name: 'Simulation',
    icon: 'pi pi-desktop',
  },
  {
    name: 'Project',
    icon: 'pi pi-building',
  },
  {
    name: 'Activity',
    icon: 'pi pi-bolt',
  },
]


export const variableObject = shallowRef({
  titleEn: {
    label: "English Title",
    variable: "",
    component: InputText,
    forTypes: ["Plans", "Categories", "Programs", "Courses"],
    inputType: "text",
  },
  titleAr: {
    label: "Arabic Title",
    variable: "",
    component: InputText,
    forTypes: ["Plans", "Categories", "Programs", "Courses"],
    inputType: "text",
  },
  descriptionEn: {
    label: "English Description",
    variable: "",
    component: Textarea,
    forTypes: ["Plans", "Categories", "Programs", "Courses"],
    inputType: "text",
  },
  descriptionAr: {
    label: "Arabic Description",
    variable: "",
    component: Textarea,
    forTypes: ["Plans", "Categories", "Programs", "Courses"],
    inputType: "text",
  },
  imageURL: {
    label: "Image Source",
    variable: "",
    component: InputText,
    forTypes: ["Plans", "Categories", "Programs", "Courses"],
    inputType: "text",
  },
  minAge: {
    label: "Min Age",
    variable: "",
    component: InputText,
    forTypes: ["Plans", "Programs", "Courses"],
    inputType: "number",
  },
  maxAge: {
    label: "Max Age",
    variable: "",
    component: InputText,
    forTypes: ["Plans", "Programs", "Courses"],
    inputType: "number",
  },
  price: {
    label: "Price",
    variable: "",
    component: InputText,
    forTypes: ["Plans", "Courses"],
    inputType: "number",
  },
});

export const categoryObject = shallowRef({
  titleEn: {
    label: "English Title",
    variable: "",
    component: InputText,
    inputType: "text",
  },
  titleAr: {
    label: "Arabic Title",
    variable: "",
    component: InputText,
    inputType: "text",
  },
  descriptionEn: {
    label: "English description",
    variable: "",
    component: Textarea,
    inputType: "text",
  },
  descriptionAr: {
    label: "Arabic description",
    variable: "",
    component: Textarea,
    inputType: "text",
  },
  image: {
    label: "Image Source",
    variable: "",
    component: InputText,
    inputType: "text",
  }
});


export const chaptersLabels = shallowRef({
  titleEn: {
    label: "English Title",
    mask1: "title",
    mask2: 'en',
    inputType: "text",
    component: InputText,
    disabled: false,
  },
  titleAr: {
    label: "Arabic Title",
    mask1: "title",
    mask2: 'ar',
    inputType: "text",
    component: InputText,
    disabled: false,
  },
  type: {
    label: "Type",
    mask1: "type",
    mask2: null,
    inputType: "text",
    component: InputText,
    disabled: true,
  },
});

export const courseObject = shallowRef({
  titleEn: {
    label: "English Title",
    variable: "",
    component: InputText,
    inputType: "text",
  },
  titleAr: {
    label: "Arabic Title",
    variable: "",
    component: InputText,
    inputType: "text",
  },
  descriptionEn: {
    label: "English description",
    variable: "",
    component: Textarea,
    inputType: "text",
  },
  descriptionAr: {
    label: "Arabic description",
    variable: "",
    component: Textarea,
    inputType: "text",
  },
  image: {
    label: "Image Source",
    variable: "",
    component: InputText,
    inputType: "text",
  },
  minAge: {
    label: "Min Age",
    variable: "",
    component: InputText,
    inputType: "number",
  },
  maxAge: {
    label: "Max Age",
    variable: "",
    component: InputText,
    inputType: "number",
  },
  price: {
    label: "Price",
    variable: "",
    component: InputText,
    inputType: "number",
  },
  duration: {
    label: "Duration",
    variable: "",
    component: InputText,
    inputType: "number",
  },

});

export const planObject = shallowRef({
  titleEn: {
    label: "English Title",
    variable: "",
    component: InputText,
    inputType: "text",
  },
  titleAr: {
    label: "Arabic Title",
    variable: "",
    component: InputText,
    inputType: "text",
  },
  descriptionEn: {
    label: "English description",
    variable: "",
    component: Textarea,
    inputType: "text",
  },
  descriptionAr: {
    label: "Arabic description",
    variable: "",
    component: Textarea,
    inputType: "text",
  },
  image: {
    label: "Image Source",
    variable: "",
    component: InputText,
    inputType: "text",
  },
  minAge: {
    label: "Min Age",
    variable: "",
    component: InputText,
    inputType: "number",
  },
  maxAge: {
    label: "Max Age",
    variable: "",
    component: InputText,
    inputType: "number",
  },
  price: {
    label: "Price",
    variable: "",
    component: InputText,
    inputType: "number",
  },
});

export const programObject = shallowRef({
  titleEn: {
    label: "English Title",
    variable: "",
    component: InputText,
    inputType: "text",
  },
  titleAr: {
    label: "Arabic Title",
    variable: "",
    component: InputText,
    inputType: "text",
  },
  descriptionEn: {
    label: "English description",
    variable: "",
    component: Textarea,
    inputType: "text",
  },
  descriptionAr: {
    label: "Arabic description",
    variable: "",
    component: Textarea,
    inputType: "text",
  },
  image: {
    label: "Image Source",
    variable: "",
    component: InputText,
    inputType: "text",
  },
  minAge: {
    label: "Min Age",
    variable: "",
    component: InputText,
    inputType: "number",
  },
  maxAge: {
    label: "Max Age",
    variable: "",
    component: InputText,
    inputType: "number",
  },
});


export const instructorIfonArrayFields = shallowRef({
  specializations: { name: "Specializations", value: <any[]>[] },
  educationBackground: { name: "Education Background", value: <any[]>[] },
  experience: { name: "Experience", value: <any[]>[] },
});
export const instructorIfonFields = shallowRef({
  email: { name: "Email", component: InputText, value: "", disabled: true },
  firstName: {
    name: "First Name",
    component: InputText,
    value: "",
    disabled: false,
  },
  lastName: {
    name: "Last Name",
    component: InputText,
    value: "",
    disabled: false,
  },
  phoneNumber: {
    name: "Phone Number",
    component: InputText,
    value: "",
    disabled: false,
  },
  title: { name: "Title", component: InputText, value: "", disabled: false },
  biography: {
    name: "Biography",
    component: Textarea,
    value: "",
    disabled: false,
  },
  philosophy: {
    name: "Philosophy",
    component: Textarea,
    value: "",
    disabled: false,
  },
});

export const IQScoresMap = [
  {
    min: 130,
    max: 160,
    desc: {
      en: "Very Superior",
      ar: "متفوق جدًا"
    }
  },
  {
    min: 120,
    max: 129,
    desc: {
      en: "Superior",
      ar: "متفوق"
    }
  },
  {
    min: 110,
    max: 119,
    desc: {
      en: "High Average",
      ar: "فوق المتوسط"
    }
  },
  {
    min: 90,
    max: 109,
    desc: {
      en: "Average",
      ar: "متوسط"
    }
  },
  {
    min: 80,
    max: 89,
    desc: {
      en: "Foundational Stage",
      ar: "المرحلة التأسيسية"
    }
  },
  {
    min: 70,
    max: 79,
    desc: {
      en: "Transitional Range",
      ar: "المدى الانتقالي"
    }
  },
  {
    min: 0,
    max: 69,
    desc: {
      en: "Developing Foundations",
      ar: "تطوير الأسس"
    }
  }
]

export const track_images = [
  {
    path: '/Tracks/health_heroes_male.png',
    name: 'Health Heroes',
    type: 'Male'
  },
  {
    path: '/Tracks/health_heroes_female.png',
    name: 'Health Heroes',
    type: 'Female'
  },
  {
    path: '/Tracks/code_creator_male.png',
    name: "Code Creators",
    type: 'Male'
  },
  {
    path: '/Tracks/code_creator_female.png',
    name: "Code Creators",
    type: 'Female'
  },
  {
    path: '/Tracks/tech_titans_male.png',
    name: "Tech Titans",
    type: 'Male'
  },
  {
    path: '/Tracks/tech_titans_female.png',
    name: "Tech Titans",
    type: 'Female'
  },
  {
    path: '/Tracks/planet_protector_male.png',
    name: "Planet Protectors",
    type: 'Male'
  },
  {
    path: '/Tracks/planet_protector_female.png',
    name: "Planet Protectors",
    type: 'Female'
  },
  {
    path: '/Tracks/future_frontiers_male.png',
    name: "Future Frontiers",
    type: 'Male'
  },
  {
    path: '/Tracks/future_frontiers_female.png',
    name: "Future Frontiers",
    type: 'Female'
  },
  {
    path: '/Tracks/quantum_quest.png',
    name: "Quantum Quest",
    type: 'Male'
  },
  {
    path: '/Tracks/quantum_quest.png',
    name: "Quantum Quest",
    type: 'Female'
  }

]


export const audioInstructions ={
  en:`
     <div class="instructions" >
        <h2>Instructions</h2>
        <p>🔊 The sound will play <strong>once</strong> automatically.</p>
        <p>🎧 Listen carefully to the sound.</p>
        <p>➡️ Choose the correct answer from <strong>left to right</strong>.</p>
        <p>⚠️ You can <strong>only choose once</strong>, so think before selecting.</p>
        <p>✅ Click on your answer to submit.</p>
    </div>`,
    ar:`  <div class="instructions arabic">
        <h2>التعليمات </h2>
        <p>🔊 سيتم تشغيل الصوت <strong>مرة واحدة </strong> تلقائيًا.</p>
        <p>🎧 استمع جيدًا للصوت.</p>
        <p>➡️ اختر الإجابة الصحيحة من <strong>اليسار إلى اليمين</strong>.</p>
        <p>⚠️ يمكنك <strong>الاختيار مرة واحدة فقط</strong>، لذا فكر جيدًا قبل التحديد.</p>
        <p>✅ انقر على إجابتك لتأكيد الاختيار.</p>
    </div>`
}