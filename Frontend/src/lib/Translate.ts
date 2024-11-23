import { useLang } from "@/stores/token";

interface Languages {
  en: string;
  ar: string;
}

export function selectLang(obj: null | Languages) {
  const lang = useLang();
  const selectedLang = lang.getLang;
  if (selectedLang == "en") {
    return obj?.en;
  } else if (selectedLang == "ar") {
    return obj?.ar;
  }
  return "null";
}

export const translationModule = {
  language: {
    en: "العربية",
    ar: "English",
  },
  companyName: {
    en: "Trace Education",
    ar: "Trace Education",
  },
  home: {
    en: "Home",
    ar: "الرئيسية",
  },
  contact: {
    en: "Contact",
    ar: "اتصال",
  },

  courses: {
    en: "Courses",
    ar: "دورات",
  },
  about: {
    en: "About",
    ar: "من نحن",
  },
  myAccount: {
    en: "My Account",
    ar: "حسابي",
  },
  plans: {
    en: "Trace Plans",
    ar: "Trace خطط",
  },
  programs: {
    en: "Programs",
    ar: "البرامج",
  },
  entertainYourEdu: {
    en: "Entertain Your Education",
    ar: "استمتع بالتعليم الخاص بك",
  },
  upSkills: {
    en: "Up You Skils",
    ar: "ارفع مهاراتك",
  },
  advanceCareer: {
    en: "To Advance Your Career",
    ar: "للنهوض بحياتك ",
  },
  path: {
    en: "Path",
    ar: "المهنية",
  },
  traceDescription: {
    en: "race delivers the most interactive way for education as never before .We are here to boost our talent students creativity and guide them through their interesting and curious journey in the world",
    ar: "قدم Trace الطريقة الأكثر تفاعلية للتعليم كما لم يحدث من قبل. نحن هنا لتعزيز إبداع طلابنا الموهوبين وتوجيههم خلال رحلتهم الشيقة والغريبة في العالم",
  },
  startFree: {
    en: "Start For Free",
    ar: "ابدأ مجانًا",
  },
  noCreditCard: {
    en: "NO CREDIT CARD REQUIRED",
    ar: "بطاقة الإئتمان غير مطلوبة",
  },
  tracePrograms: {
    en: "Trace Programs",
    ar: "برامج Trace",
  },
  traceProgramsDescription: {
    en: "Where Entertainment meets Education",
    ar: "حيث يلتقي الترفيه بالتعليم",
  },
  learnMore: {
    en: "Learn More",
    ar: "المزيد",
  },
  workshops: {
    en: "Attend workshops by",
    ar: "حضور ورش العمل بواسطة",
  },
  workshopDescription: {
    en: "Trace is proudly accredited by STEM.org that provides STEM courses; from the age of four till the age of eighteen years old. Exclusively in Egypt, Trace is empowered by Engineering for kids.",
    ar: "تم اعتماد Trace بفخر من قبل STEM.org الذي يقدم دورات في العلوم والتكنولوجيا والهندسة والرياضيات. من سن الرابعة حتى سن الثامنة عشرة. حصريًا في مصر، يتم تمكين Trace من خلال الهندسة للأطفال.",
  },
  bookWorkshop: {
    en: "Book Workshop",
    ar: "احجز الان",
  },
  earnCer: {
    en: "Earn your certificate By",
    ar: "احصل على شهادتك بواسطة",
  },
  certificateDescription: {
    en: "Trace is proudly accredited by STEM.org that provides STEM courses; from the age of four till the age of eighteen years old. Exclusively in Egypt, Trace is empowered by Engineering for kids.",
    ar: "تم اعتماد Trace بفخر من قبل STEM.org الذي يقدم دورات في العلوم والتكنولوجيا والهندسة والرياضيات. من سن الرابعة حتى سن الثامنة عشرة. حصريًا في مصر، يتم تمكين Trace من خلال الهندسة للأطفال.",
  },
  achievements: {
    en: "Our Achievements",
    ar: "إنجازاتنا",
  },
  achDescription: {
    en: "Various versions have evolved over the years, sometimes by accident,",
    ar: "وقد تطورت إصدارات مختلفة على مر السنين، وأحيانا عن طريق الصدفة،",
  },
  vidoe: {
    en: "Video",
    ar: "فيديو",
  },
  instructor: {
    en: "Instructor",
    ar: "مدرب",
  },
  student: {
    en: "Student",
    ar: "طالب",
  },
  users: {
    en: "Users",
    ar: "مستخدم",
  },
  personalized: {
    en: "Personalized Learning",
    ar: " رحلة من",
  },
  journey: {
    en: "Journey",
    ar: "التعلم الذاتي ",
  },
  oneYear: {
    en: "One Year Road Map",
    ar: "خريطة الطريق لمدة عام",
  },
  roadMapDescription: {
    en: "As we believe in the importance of providing adequate knowledge for each learner, we have created a dedicated program roadmap for each learner that is based on the learners’ answers to their online questionnaire designed by our experienced psychologists.",
    ar: "نظرًا لأننا نؤمن بأهمية توفير المعرفة الكافية لكل متعلم، فقد أنشأنا خارطة طريق برنامجية مخصصة لكل متعلم تعتمد على إجابات المتعلمين على استبيانهم عبر الإنترنت الذي صممه علماء النفس ذوو الخبرة لدينا",
  },
  roadmap: {
    en: "See Roadmap",
    ar: "خريطة الطريق",
  },
  pages: {
    en: "Pages",
    ar: "الصفحات",
  },
  searchCourses: {
    en: "Search Courses ...",
    ar: "البحث في الدورات...",
  },
  startJourney: {
    en: "Start Your Journey",
    ar: "ابدأ رحلتك",
  },
  myCourses: {
    en: "My Courses",
    ar: "دوراتي",
  },
  notifications: {
    en: "Notifications",
    ar: "إشعارات",
  },
  title: {
    en: "Title",
    ar: "العنوان",
  },
  type: {
    en: "Type",
    ar: "النوع",
  },
  content: {
    en: "Content",
    ar: "المحتوي",
  },
  status: {
    en: "Status",
    ar: "الحالة",
  },
  actions: {
    en: "Actions",
    ar: "الخيارات",
  },
  enrolledCourses: {
    en: "Courses You Enrolled",
    ar: "الدورات التي قمت بالتسجيل فيها",
  },
  canEnroll: {
    en: "Courses You Can Enroll",
    ar: "الدورات التي يمكنك التسجيل فيها",
  },
  login: {
    en: "Login",
    ar: "تسجيل الدخول",
  },
  signup: {
    en: "Signup",
    ar: "اشتراك",
  },
  logout: {
    en: "Log Out",
    ar: "تسجيل الخروج",
  },
  welcomeBack: {
    en: "Welcome back to the",
    ar: "مرحبا بكم مرة أخرى في",
  },
  traceCommunity: {
    en: "Trace Community",
    ar: "مجتمع Trace",
  },
  noAccount: {
    en: "No Account Yet",
    ar: "لا يوجد حساب بعد",
  },
  haveAccount: {
    en: "You have Account",
    ar: "لديك حساب؟",
  },
  email: {
    en: "Email",
    ar: " الايميل",
  },
  pass: {
    en: "Password",
    ar: "كلمة السر",
  },
  confirmPass: {
    en: "Conform Password",
    ar: "تأكيد كلمة المرور",
  },
  childProgress: {
    en: "Children Progress",
    ar: "تطور الأطفال",
  },
  childCourses: {
    en: "Children Courses",
    ar: "دورات الاطفال",
  },
  childAnalysis: {
    en: "Children Analysis",
    ar: "تحليل الاطفال",
  },
  addChild: {
    en: "Add Child",
    ar: "إضافة طفل",
  },
  sub: {
    en: "Subscriptions",
    ar: "الاشتراكات",
  },
  settings: {
    en: "Settings",
    ar: "الإعدادات",
  },
  saveChanges: {
    en: "Save Changes",
    ar: "حفظ التغييرات",
  },
  firstName: {
    en: "First Name",
    ar: "الاسم الأول",
  },
  lastName: {
    en: "Last Name",
    ar: "الاسم الأخير",
  },
  phone: {
    en: "Phone Number",
    ar: "رقم الهاتف",
  },
  address: {
    en: "Address",
    ar: "العنوان",
  },
  job: {
    en: "Job",
    ar: "المهنة",
  },
  gender: {
    en: "Gender",
    ar: "الجنس",
  },
  birthDate: {
    en: "Birth Date",
    ar: "تاريخ الميلاد",
  },
  male: {
    en: "Male",
    ar: "ذكر",
  },
  female: {
    en: "Female",
    ar: "أنثي",
  },
  grade: {
    en: "Grade",
    ar: "العام الدراسي",
  },
  educationSystem: {
    en: "Education System",
    ar: "نظام التعليم",
  },
  selectChild: {
    en: "Select Child",
    ar: "حدد الطفل",
  },
  childEmail: {
    en: "Child email",
    ar: "ايميل  للطفل",
  },
  courseTitle: {
    en: "Course Title",
    ar: "عنوان الدورة",
  },
  comments: {
    en: "Show Comments",
    ar: "عرض التعليقات",
  },
  enrollmentRequests: {
    en: "Enrollment Requests",
    ar: "طلبات التسجيل",
  },
  manageLogs: {
    en: "Manage Logs",
    ar: "إدارة السجلات",
  },
  manageInstructors: {
    en: "Manage Instructors",
    ar: "إدارة المدربين",
  },
  manageCourses: {
    en: "Manage Content",
    ar: "إدارة المحتوي",
  },
  maangeRequests: {
    en: "Manage Requests",
    ar: "إدارة الطلبات",
  },
  startAnalysisQuiz: {
    en: "Start Analysis Quiz",
    ar: "أبدأ الاختيار الان",
  },
  sureLogout: {
    en: "Are you sure to log out",
    ar: "متأكد من تسجيل الخروج؟",
  },
  back: {
    en: "Back",
    ar: "رجوع",
  },
  joinUs: {
    en: "Join Us",
    ar: "انضم الينا",
  },
  dataMissing: {
    en: "Some Data Is Missing",
    ar: "بعض البيانات مفقودة",
  },
  userNotExist: {
    en: "User Doesn't Exist",
    ar: "المستخدم غير موجود",
  },
  diffPass: {
    en: "Different Password",
    ar: "كلمة مرور مختلفة",
  },
  emailTaken: {
    en: "Email is Taken",
    ar: "تم أخذ  الايميل من قبل",
  },
  lessons: {
    en: "Lessons",
    ar: "دروس",
  },
  quiz: {
    en: "Quizes",
    ar: "اختبار",
  },
  courseInfo: {
    en: "Course Information",
    ar: "معلومات عن الدورة",
  },
  categories: {
    en: "Categories",
    ar: "تصنيف",
  },
  duration: {
    en: "Duration",
    ar: "المدة",
  },
  age: {
    en: "Age",
    ar: "العمر",
  },
  price: {
    en: "price",
    ar: "السعر",
  },
  enrollNow: {
    en: "Enroll Now",
    ar: "سجل الان",
  },
  viewMat: {
    en: "View Material",
    ar: "عرض المواد",
  },
  courseDescription: {
    en: "Course Description",
    ar: "وصف الدورة",
  },
  courseObjectives: {
    en: "Course Objectives",
    ar: "أهداف الدورة",
  },
  pleaseGoToChildrenCourse: {
    en: 'Please Go To "Children Courses" ',
    ar: '"يرجى الذهاب إلى "دورات الأطفال',
  },
  selectChildEnroll: {
    en: " Select The Child You Want to Enroll",
    ar: "حدد الطفل الذي تريد تسجيله",
  },
  selectCourse: {
    en: "Select the Course",
    ar: "حدد الدورة",
  },
  gotoChildCourses: {
    en: "Go To Childre Courses",
    ar: "اذهب إلى دورات الأطفال",
  },
  askParent: {
    en: "Ask your Parent To Enroll You to this Course or Plan",
    ar: "اطلب من والديك تسجيلك في هذه الدورة أو الخظة",
  },
  cancell: {
    en: "Cancel",
    ar: "الغاء",
  },
  courseContent: {
    en: "Course Content",
    ar: "محتوى الدورة",
  },
  days: {
    en: "Days",
    ar: "يوم",
  },
  years: {
    en: "Years",
    ar: "عام",
  },
  wellDone: {
    en: "Well Done",
    ar: "عمل رائع",
  },
  logWithParent: {
    en: "Log in With Your Parent Account For Analysis Details",
    ar: "قم بتسجيل الدخول باستخدام حساب الوالدين الخاص بك للحصول على تفاصيل التحليل",
  },
  returnHome: {
    en: "Return Home",
    ar: "ارجع للصفحة الرئيسية",
  },
  finishQuiz: {
    en: "Finish Quiz",
    ar: "إنهاء الاختبار",
  },
  startTest: {
    en: "Start Test",
    ar: "ابدأ الاختبار",
  },
  prev: {
    en: "Previous",
    ar: "السابق",
  },
  next: {
    en: "Next",
    ar: "التالي",
  },
  markCompleted: {
    en: "Mark as Completed",
    ar: "وضع علامة على أنها مكتملة",
  },
  quizWillStart: {
    en: "Quiz Will Start In",
    ar: "سيبدأ الاختبار في",
  },
  expectedTime: {
    en: "Quiz Expected Time:",
    ar: "الوقت المتوقع للاختبار:",
  },
  minutes: {
    en: "minutes",
    ar: "دقائق",
  },
  yourTime: {
    en: "Your Time:",
    ar: "وقتك:",
  },
  question: {
    en: "Question",
    ar: "السؤال",
  },
  prevQuestion: {
    en: "Previous Question",
    ar: "السؤال السابق",
  },
  nextQuestion: {
    en: "Next Question",
    ar: "السؤال التالي",
  },
  yourScore: {
    en: "Your Score",
    ar: "نتيجتك",
  },
  showAnswer: {
    en: "Show Answers",
    ar: "اعرض اجابات",
  },
  tryAgain: {
    en: "Try Again",
    ar: "حاول ثانية",
  },
  nextLesson: {
    en: "Next Lesson",
    ar: "الدرس التالي",
  },
  childAdded: {
    en: "Child Added Successfully",
    ar: "تمت إضافة الطفل بنجاح",
  },
  loginWith: {
    en: "Please Log in With:",
    ar: "يرجى تسجيل الدخول مع:",
  },
  viewChild: {
    en: "View Child",
    ar: "عرض الطفل",
  },
  toStartJourney: {
    en: "to Start a New Journey",
    ar: "لبدء رحلة جديدة",
  },
  kindergarten: {
    en: "Kindergarten",
    ar: "روضة أطفال ",
  },
  primary: {
    en: "Primary School",
    ar: " مدرسة إبتدائية ",
  },
  preparatory: {
    en: "Preparatory School",
    ar: "مدرسة اعدادية ",
  },
  secondary: {
    en: "Secondary School",
    ar: "مدرسة ثانوية ",
  },
  others: {
    en: "Others",
    ar: "أخري ",
  },
  publicSchool: {
    en: "Public Education System",
    ar: "نظام التعليم العام",
  },
  privateSchools: {
    en: "Private Schools",
    ar: "مدارس خاصة",
  },
  internationalScools: {
    en: "International Schools",
    ar: "المدارس الدولية",
  },
  sentSuccessfully: {
    en: "Enrolment Request Sent Successfully",
    ar: "تم إرسال طلب التسجيل بنجاح",
  },
  pleaseSendInvoice: {
    en: " Please send an invoice to this number:01065356028 with",
    ar: "برجاء ارسال فاتورة على هذا الرقم:01065356028 مع",
  },
  attatchTheInvoice: {
    en: "and attatch the invoice as a whatsapp message to the same number",
    ar: "وإرفاق الفاتورة كرسالة واتس اب على نفس الرقم",
  },
  switchToChild: {
    en: "Switch to Child",
    ar: "التبديل إلى حساب الطفل",
  },
  coursesEnrolled: {
    en: "Courses Enrolled",
    ar: "الدورات المسجلة",
  },
  coursesCompleted: {
    en: "Courses Completed",
    ar: " الدورات المكتملة",
  },
  completed: {
    en: "Completed:",
    ar: "مكتمل:",
  },
  completedAt: {
    en: "Completed at:",
    ar: "اكتملت في:",
  },
  heighest: {
    en: "Heighest:",
    ar: "الأعلى:",
  },
  nomOfAtts: {
    en: "Number Of Attempts:",
    ar: "عدد المحاولات:",
  },
  att: {
    en: "Attempt",
    ar: "المحاولة",
  },
  score: {
    en: "Score",
    ar: "نتيجة",
  },
  timeToAns: {
    en: "Time To Answer",
    ar: "وقت الإجابة",
  },
  date: {
    en: "Date",
    ar: "التاريخ",
  },
  time: {
    en: "Time",
    ar: "الوقت",
  },
  editedSuccessffully: {
    en: "Edited Successfully",
    ar: "تم التعديل بنجاح",
  },
  addComment: {
    en: "Add Comment",
    ar: "أضف تعليق",
  },
  showComments: {
    en: "Show Comments",
    ar: "عرض التعليقات",
  },
  pendding: {
    en: "Pending",
    ar: "قيد الانتظار",
  },
  rejected: {
    en: "Rejected",
    ar: "مرفوض",
  },
  succeess: {
    en: "Success",
    ar: "مقبول",
  },
  enrollmentsRequests: {
    en: "Enrollment Requests",
    ar: "طلبات التسجيل",
  },
  durationOfTest: {
    en: "the duration of the quiz is:",
    ar: "مدة الاختبار هي :",
  },
  yourChildIQ: {
    en: "Your Child IQ Score is:",
    ar: "درجة ذكاء طفلك هي:",
  },
  summary: {
    en: "Summary",
    ar: "الملخص",
  },
  dominantTrait: {
    en: "Dominant Trait",
    ar: "السمة المهيمنة",
  },
  bestDescription: {
    en: "Persnonality Type",
    ar: " نوع الشخصية",
  },
  learningStyle: {
    en: "Learning Style",
    ar: "أسلوب التعلم",
  },
  recommendedCareer: {
    en: "Recommended Career",
    ar: "المهنة المقترحة ",
  },
  requests: {
    en: "Requests",
    ar: "الطلبات",
  },
  logs: {
    en: "Activities",
    ar: "الأنشطة ",
  },
  parentEmail: {
    en: "Parent Email",
    ar: "ايميل الوالد",
  },
  noWorkshop: {
    en: "Currently No Workshops",
    ar: "لا يوجد ورش عمل حاليا",
  },
  viewFreeLesson: {
    en: "View Free Lesson",
    ar: "عرض الدرس المجاني",
  },
  freeLessons: {
    en: "The Free Lessons",
    ar: "الدروس المجانية",
  },
  viewCourse: {
    en: "View Course",
    ar: "عرض الدورة ",
  },
  egyptianPound: {
    en: "Egyptian Pound",
    ar: "جنيه مصري",
  },
  selectedPlan: {
    en: "Selected Plan",
    ar: "الخطة المحددة",
  },
  allPlans: {
    en: "All Plans",
    ar: "جميع الخطط",
  },
  allCourses: {
    en: "All Courses",
    ar: "جميع الدورات",
  },
  planCourses: {
    en: "Plan Courses",
    ar: "دورات الخطة",
  },
  havePromoCode: {
    en: "If you have a promo code, please enter it",
    ar: "إذا كان لديك رمز ترويجي، يرجى إدخاله",
  },
  promoCode:{
    en:'promo code',
    ar:'الرمز الترويجي'
  },
  courseBelongsToPlan:{
    en:'This Course Belongs to a Trace Plan',
    ar:'تنتمي هذه الدورة إلى خطة Trace '
  },
  viewPlans:{
    en:'View Plans',
    ar:'عرض الخطط'
  },
  planDescription:{
    en:'Plan Description',
    ar:'وصف الخطة'
  },
  planObjectives:{
    en:'Plan Objectives',
    ar:'أهداف الخطة'
  },
  planInfo:{
    en:'Plan Information',
    ar:'معلومات عن الخطة'
  },
  missingPersonalInfo:{
    en:'Please add missing personal information',
    ar:'الرجاء إضافة المعلومات الشخصية المفقودة'
  },
  addInfo:{
    en:'Add missing information',
    ar:'إضافة المعلومات المفقودة'
  },
  later:{
    en:'Later',
    ar:'لاحقاً'
  },
  clickToView:{
    en:'Click to Start',
    ar:'اضغط للبدأ'
  },
  sources:{
    en:"Sources",
    ar:"المصادر"
  },
  source:{
    en:"Source",
    ar:"المصدر"
  },
  objectives:{
    en:"Objectives",
    ar:"الأهداف"
  },
  terms_concepts:{
    en:"Terms and Concepts",
    ar:'المصطلحات و المبادئ'
  },
  materials:{
    en:'Materials',
    ar:'الأدوات'
  },
  instructions:{
    en:"Instrictions",
    ar:"الخطوات"
  },
  results:{
    en:"Results",
    ar:"النتائج"
  },
  conclusions:{
    en:"Conclusions",
    ar:"الاستنتاج"
  },
  manageUsers:{
    en:'Manage Users',
    ar:'ادارة المستخدمين'
  },
courseHasPrequisite:{
  en:'This Course Requires a Prequisite: ',
  ar:'تتطلب هذه الدورة دورة متطلبة:'
},
chats:{
  en:'Ask Instructor',
  ar:"اسأل المعلم"
},
};
