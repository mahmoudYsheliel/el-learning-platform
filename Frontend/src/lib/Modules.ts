import { translationModule } from "@/lib/Translate";
import { usePersonalInfo } from "@/stores/token";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { selectLang } from "@/lib/Translate";

export const pagesToRoute = [
  { name: translationModule.home, to: "/#Home" },
  { name: translationModule.courses, to: "/#Courses" },
  { name: translationModule.about, to: "/#About" },
  { name: translationModule.contact, to: "/#Contact" },
];

export const items = computed(() => {
  const personalInfo = usePersonalInfo();
  const router = useRouter();
  if (personalInfo.getInfo?.userType == "Admin") {
    return [
      {
        label: selectLang(translationModule.maangeRequests),
        command: () => {
          router.push("/manageRequests");
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
    return [
      {
        label: selectLang(translationModule.home),
        command: () => {
          router.push("/parentHome");
        },
      },
      {
        label: selectLang(translationModule.childProgress),
        command: () => {
          router.push("/childrenProgress");
        },
      },

      {
        label: selectLang(translationModule.childCourses),
        command: () => {
          router.push("/childrenCourses");
        },
      },
      {
        label: selectLang(translationModule.childAnalysis),
        command: () => {
          router.push("/childrenAnalysis");
        },
      },
      {
        label: selectLang(translationModule.addChild),
        command: () => {
          router.push("/addChild");
        },
      },
      {
        label: selectLang(translationModule.sub),
        command: () => {
          router.push("/subscription");
        },
      },
      {
        label: selectLang(translationModule.settings),
        command: () => {
          router.push("/parentSettings");
        },
      },
    ];
  } else if (personalInfo.getInfo?.userType == "Child") {
    return [
      {
        label: selectLang(translationModule.myCourses),
        command: () => {
          router.push("/childCourses");
        },
      },
      {
        label: selectLang(translationModule.notifications),
        command: () => {
          router.push("/childNotifications");
        },
      },
    ];
  }
  return [
    {
      label: selectLang(translationModule.logout),
      command: () => {
        return true;
      },
    },
  ];
});

export const achievments = [
  {
    class: "/images/GraduationCap.svg",
    info: translationModule.instructor,
    count: 100,
    color: "#E9F8F3",
  },
  {
    class: "/images/VideoCamera.svg",
    info: translationModule.vidoe,
    count: 1000,
    color: "#FFFAF5",
  },
  {
    class: "/images/GraduationCap.svg",
    info: translationModule.instructor,
    count: 2000,
    color: "#FFEEF0",
  },
  {
    class: "/images/UsersThree.svg",
    info: translationModule.users,
    count: 10000,
    color: "#F0F7FF",
  },
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
  { class: "pi pi-whatsapp", to: "https://wa.me/201065356028?text=hello" },
];

export const pages = [
  { name: translationModule.home, to: "/#Home" },
  { name: translationModule.about, to: "/#About" },
  { name: translationModule.contact, to: "/#contact" },
  //{ name: "Schools", to: "/" },
  //{ name: "FQAs", to: "/" },
  //{ name: "Privacy Policy", to: "/" },
  //{ name: "Terms and Conditions", to: "/" },
];

export const childSidebar = [
  {
    label: translationModule.home,
    name: "home",
    to: "childCourses",
    icon: "pi pi-home",
  },
  {
    label: translationModule.notifications,
    name: "notifications",
    to: "childNotifications",
    icon: "pi pi-bell",
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


export const parentSidebarPages = computed(()=>{

  return [
    {
      label: selectLang(translationModule.enrollmentRequests),
      name:'enrollmentsRequests',
      to: "parentHome",
      icon: "pi pi-home",
    },
    {
      label:selectLang(translationModule.childProgress),
      name:'childProgress',
      to: "childrenProgress",
      icon: "pi pi-chart-line",
    },
    {
      label: selectLang(translationModule.childCourses),
      name:'childCourses',
      to: "childrenCourses",
      icon: "pi pi-shopping-bag",
    },
    {
      label: selectLang(translationModule.childAnalysis),
      name:'childAnalysis',
      to: "childrenAnalysis",
      icon: "pi pi-id-card",
    },
    {
      label: selectLang(translationModule.addChild),
      name:'addChild',
      to: "addChild",
      icon: "pi pi-user-plus",
    },
    {
      label: selectLang(translationModule.sub),
      name:'subscriptions',
      to: "subscription",
      icon: "pi pi-arrow-right-arrow-left",
    },
    {
      label:selectLang(translationModule.settings),
      name:'settings',
      to: "parentSettings",
      icon: "pi pi-cog",
    },
  ]
}) 


export const iqLevels= [
  {
    en:	'Borderline',
    ar:'منخفظ جدا'
  },
  {
    en:	'Low Average',
    ar:' متوسط منخفض'
  },
  {
    en:	'Average',
    ar:'متوسط'
  },
  {
    en:	'High Average',
    ar:'متوسط ​​عالي'
  },
  {
    en:	'Superior',
    ar:'متفوق'
  }
]


export const managerSidebarPages = computed(() => {
  return [
    {
      label: selectLang(translationModule.requests),
      name: 'Manage Requests',
      to: "manageRequests",
      icon: "pi pi-bell",
    },
    {
      label: selectLang(translationModule.courses),
      name: 'Manage Courses',
      to: "manageCourses",
      icon: "pi pi-server",
    },
    {
      label: selectLang(translationModule.instructor),
      name: 'Manage Instructors',
      to: "manageInstructors",
      icon: "pi pi-users",
    },
    {
      label: selectLang(translationModule.logs),
      name: 'Manage Logs',
      to: "manageLogs",
      icon: "pi pi-arrow-right-arrow-left",
    },
  ];
});