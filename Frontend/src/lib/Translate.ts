import { useLang } from "@/stores/token";

interface Languages {
  en: string;
  ar: string;
}

export function selectLang(obj: null | Languages, lan: string | null = null) {
  const lang = useLang();
  let selectedLang = lang.getLang;
  if (lan) {
    selectedLang = lan
  }
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
    en: "Up Your Skills",
    ar: "ارفع مهاراتك",
  },
  advanceCareer: {
    en: "To Advance Your Career Path",
    ar: " للنهوض بحياتك المهنية",
  },
  traceDescription: {
    en: "Trace delivers the most interactive way for education as never before .We are here to boost our talent students creativity and guide them through their interesting and curious journey in the world",
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
    en: "Welcome back to",
    ar: "مرحبا بكم مرة أخرى في",
  },
  welcome: {
    en: "Welcome to ",
    ar: "مرحبا بكم "
  },
  traceCommunity: {
    en: "Trace Community",
    ar: "مجتمع Trace",
  },
  noAccount: {
    en: "Don't Have Account Yet?",
    ar: "؟لا يوجد حساب بعد",
  },
  haveAccount: {
    en: "Do You have an Account?",
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
    en: "Confirm Password",
    ar: "تأكيد كلمة المرور",
  },
  username: {
    en: "User Name",
    ar: 'اسم المستخدم'
  },
  enterEmail: {
    en: 'Enter your email for the verification proccess,we will send 4 digits code to your email.',
    ar: 'أدخل بريدك الإلكتروني لعملية التحقق، وسنرسل رمزًا مكونًا من 4 أرقام إلى أرقام'
  },
  enterCode: {
    en: 'Enter your 4 digits code that you received on your email.',
    ar: 'أدخل الرمز المكون من 4 أرقام الذي تلقيته على بريدك الإلكتروني.'
  },
  setPass: {
    en: 'Set the new password for your account so you can login and access all featuress.',
    ar: 'قم بتعيين كلمة المرور الجديدة لحسابك حتى تتمكن من تسجيل الدخول والوصول إلى جميع الميزات.'
  },
  passReseted: {
    en: 'Your password has been reset successfully',
    ar: 'تمت إعادة تعيين كلمة المرور الخاصة بك بنجاح'
  },
  didnotReceive: {
    en: 'If you didn’t receive a code!',
    ar: 'إذا لم تتلق الرمز!'
  },
  resend: {
    en: 'Resend',
    ar: ' إعادة الإرسال'
  },
  childProgress: {
    en: "Children Progress",
    ar: "تطور الأطفال",
  },
  studentProgress: {
    en: 'Student Progress',
    ar: 'تقدم الطالب'
  },
  studentAnalusis: {
    en: 'Student Analysis',
    ar: 'تحليل الطالب'
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
  noChildren: {
    en: "Add your first child to unlock personalized experiences today!",
    ar: "أضف طفلك الأول لتستمتع بتجارب مخصصة اليوم!"
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
    en: "Enrollments",
    ar: "التسجيل",
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
    en: "Start Trace Test Now",
    ar: "الآن Trace  ابدأ اختبار  ",
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
  weakPass: {
    en: 'Weak Password',
    ar: 'كلمة المرور ضعيفة'
  },
  notValidEmail: {
    en: 'Email Not Valid',
    ar: 'البريد الإلكتروني غير صالح'
  },
  noRoleSelected: {
    en: 'No Role Selected',
    ar: 'لم يتم تحديد أي دور'
  },
  phoneNumberError: {
    en: 'Phone Number is Incorrect',
    ar: 'رقم الهاتف غير صحيح'
  },
  lessons: {
    en: "Lessons",
    ar: "دروس",
  },
  quiz: {
    en: "Quizzes",
    ar: "اختبار",
  },
  activity: {
    en: 'Activity',
    ar: 'نشاط'
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
    en: "Thank you for completing the test! Your results are ready.",
    ar: "شكرًا لك على إكمال الاختبار! نتائجك جاهزة.",
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
    ar: "اعرض الإجابات",
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
  promoCode: {
    en: 'promo code',
    ar: 'الرمز الترويجي'
  },
  courseBelongsToPlan: {
    en: 'This Course Belongs to a Trace Plan',
    ar: 'تنتمي هذه الدورة إلى خطة Trace '
  },
  viewPlans: {
    en: 'View Plans',
    ar: 'عرض الخطط'
  },
  planDescription: {
    en: 'Plan Description',
    ar: 'وصف الخطة'
  },
  planObjectives: {
    en: 'Plan Objectives',
    ar: 'أهداف الخطة'
  },
  planInfo: {
    en: 'Plan Information',
    ar: 'معلومات عن الخطة'
  },
  missingPersonalInfo: {
    en: 'Please add missing personal information',
    ar: 'الرجاء إضافة المعلومات الشخصية المفقودة'
  },
  addInfo: {
    en: 'Add missing information',
    ar: 'إضافة المعلومات المفقودة'
  },
  later: {
    en: 'Later',
    ar: 'لاحقاً'
  },
  clickToView: {
    en: 'Click to Start',
    ar: 'اضغط للبدأ'
  },
  sources: {
    en: "Sources",
    ar: "المصادر"
  },
  source: {
    en: "Source",
    ar: "المصدر"
  },
  objectives: {
    en: "Objectives",
    ar: "الأهداف"
  },
  terms_concepts: {
    en: "Terms and Concepts",
    ar: 'المصطلحات و المبادئ'
  },
  materials: {
    en: 'Materials',
    ar: 'الأدوات'
  },
  instructions: {
    en: "Instructions",
    ar: "الخطوات"
  },
  results: {
    en: "Results",
    ar: "النتائج"
  },
  conclusions: {
    en: "Conclusions",
    ar: "الاستنتاج"
  },
  manageUsers: {
    en: 'Manage Users',
    ar: 'ادارة المستخدمين'
  },
  courseHasPrequisite: {
    en: 'This Course Requires a Prequisite: ',
    ar: 'تتطلب هذه الدورة دورة متطلبة:'
  },
  chats: {
    en: 'Ask Instructor',
    ar: "اسأل المعلم"
  },
  recommendTracks: {
    en: "Best Tracks",
    ar: "أفضل المسارات",
  },
  LearningStyle: {
    en: "Learning Style",
    ar: "أسلوب التعلم"
  },
  keySkills: {
    en: 'Key Skills',
    ar: 'المهارات الأساسية'
  },
  styleOverview: {
    en: 'Style Overview',
    ar: 'نظرة عامة على النمط'
  },
  supportTips: {
    en: 'Support Tips',
    ar: 'نصائح الدعم'
  },
  aboutTrack: {
    en: 'About This Track',
    ar: 'حول هذا المسار'
  },
  guidingPath: {
    en: 'Guiding Their Path',
    ar: 'توجيه مسارهم'
  },
  print: {
    en: 'Print',
    ar: 'اطبع'
  },
  intro: {
    en: 'Introduction',
    ar: 'مقدمة'
  },
  analysisReportIntro: {
    en: "Welcome to your personalized Trace Test Report. This comprehensive report provides \
                detailed insights into your child’s cognitive strengths, learning style, and areas for growth.\
                Based on the test results, we have crafted a personalized learning pathway to help your child\
                excel in STEM education. Our goal is to support your child’s academic journey with tailored\
                strategies and courses designed to fit their unique profile.",
    ar: "مرحبًا بك في تقرير اختبار Trace المخصص لك. ويقدم هذا التقرير الشامل\
                رؤى تفصيلية حول نقاط القوة المعرفية لدى طفلك وأسلوب التعلم ومجالات النمو.\
                واستنادًا إلى نتائج الاختبار، قمنا بتصميم مسار تعليمي مخصص لمساعدة طفلك\
                التفوق في تعليم العلوم والتكنولوجيا والهندسة والرياضيات (STEM). هدفنا هو دعم الرحلة الأكاديمية لطفلك من خلال برامج مخصصة\
                الاستراتيجيات والدورات المصممة لتناسب ملفهم الشخصي الفريد./"
  },
  purpose: {
    en: 'Purpose of the Trace Test',
    ar: 'الغرض من اختبار Trace'
  },
  analysisReportPurpose: {
    en: "The Trace Test evaluates key cognitive abilities that are critical for success in STEM fields. By\
                assessing areas such as verbal reasoning, visual-spatial skills, working memory, and\
                processing speed, the Trace Test helps identify your child’s strengths and potential areas for\
                growth. This allows us to create a learning pathway that is both challenging and supportive.",
    ar: "يقوم اختبار Trace بتقييم القدرات المعرفية الأساسية التي تعتبر ضرورية للنجاح في مجالات العلوم والتكنولوجيا والهندسة والرياضيات. بواسطة\
                تقييم مجالات مثل التفكير اللفظي، والمهارات البصرية المكانية، والذاكرة العاملة، و\
                سرعة المعالجة، يساعد اختبار Trace في تحديد نقاط القوة لدى طفلك والمجالات المحتملة لها\
                نمو. يتيح لنا ذلك إنشاء مسار تعليمي يتسم بالتحدي والداعم في نفس الوقت."
  },
  detailed: {
    en: 'Detailed Feedback on Your Child’s Performance',
    ar: "تعليقات تفصيلية حول أداء طفلك"
  },
  analysisReportDetail: {
    en: "The following is a detailed breakdown of each cognitive task and what your child’s scores\
                indicate about their abilities:",
    ar: "فيما يلي تحليل تفصيلي لكل مهمة معرفية ونتائج طفلك\
                تشير إلى قدراتهم:"
  },
  tracks: {
    en: "Tracks",
    ar: "المسارات"
  },
  levels: {
    en: 'Levels',
    ar: 'المستويات'
  },
  phases: {
    en: 'Phases',
    ar: 'المراحل'
  },
  trackOverview: {
    en: "Track Overview",
    ar: "نظرة عامة على المسار"
  },
  commingSoon: {
    en: 'Coming Soon',
    ar: 'قريباً'
  },
  trackContent: {
    en: "Track Content",
    ar: "محتوي المسار"
  },
  locked: {
    en: 'Course is Locked Now',
    ar: "الدورة مغلقة الآن"
  },
  forgeotPass: {
    en: 'Forgot Password?',
    ar: 'هل نسيت كلمة السر؟'
  },
  verification: {
    en: 'Verification',
    ar: 'تأكيد'
  },
  updatePass: {
    en: 'Update Password',
    ar: 'تحديث كلمة المرور'
  },
  parent: {
    en: 'Parent',
    ar: 'والد'
  },
  parentRole: {
    en: 'Parents can manage child profiles and monitor their progress, including course enrollment, lesson completion, and performance.',
    ar: 'يمكن للوالدين إدارة ملفات تعريف الأطفال ومراقبة تقدمهم، بما في ذلك التسجيل في الدورة التدريبية وإكمال الدرس والأداء.'
  },
  studentRole: {
    en: 'Students can independently enroll in courses, access materials, and track their progress through a personalized dashboard.',
    ar: 'يمكن للطلاب التسجيل بشكل مستقل في الدورات التدريبية، والوصول إلى المواد، وتتبع تقدمهم من خلال لوحة معلومات مخصصة.'
  },
  selectRole: {
    en: 'Select Role',
    ar: 'اختر دور'
  },
  personalInfo: {
    en: 'Personal Information',
    ar: 'معلومات شخصية'
  },
  cognitiveStrengthTitle: {
    en: 'Cognitive Strengths and Areas for Growth',
    ar: 'نقاط القوة المعرفية ومجالات النمو'
  },
  cognitiveStrengthDesc: {
    en: 'Your child exhibits strong abilities in verbal reasoning, abstract thinking, and visual-spatial\
                    processing. These skills are key for success in STEM subjects like robotics, engineering, and\
                    computer science. Areas to focus on for growth include working memory and processing\
                    speed. Enhancing these skills will help your child handle complex tasks more efficiently.',
    ar: 'يُظهر طفلك قدرات قوية في التفكير اللفظي والتفكير المجرد والبصري المكاني\
                    يعالج.هذه المهارات هي مفتاح النجاح في موضوعات العلوم والتكنولوجيا والهندسة والرياضيات مثل الروبوتات والهندسة وغيرها\
                    علوم الكمبيوتر.تشمل المجالات التي يجب التركيز عليها لتحقيق النمو الذاكرة العاملة والمعالجة\
                    سرعة.إن تعزيز هذه المهارات سيساعد طفلك على التعامل مع المهام المعقدة بشكل أكثر كفاءة.'
  },
  shortTermGoalsDesc: {
    en: 'Short-term goals help your child build essential skills step by step. These goals focus on improving problem-solving, critical thinking, and hands-on experience in STEM subjects. Encouraging consistent practice and setting achievable milestones will enhance their learning progress and confidence.',
    ar: 'تساعد الأهداف قصيرة المدى طفلك على بناء المهارات الأساسية خطوة بخطوة. تركز هذه الأهداف على تحسين حل المشكلات والتفكير النقدي والخبرة العملية في موضوعات العلوم والتكنولوجيا والهندسة والرياضيات. إن تشجيع الممارسة المستمرة وتحديد معالم قابلة للتحقيق سيعزز تقدمهم في التعلم وثقتهم بأنفسهم.'
  },
  shortTermGoalsTitle: {
    en: 'Short Term Learning Pathway',
    ar: 'مسار التعلم على المدى القصير'
  },
  longTermLearningPathwayTitle: {
    en: 'Long Term Learning Pathway',
    ar: 'مسار التعلم على المدى الطويل'
  },
  longTermLearningPathwayDesc: {
    en: 'Engage in progressively challenging projects in robotics and engineering. Encourage participation in STEM competitions, workshops, and collaborative projects. These activities will help solidify your child’s skills and passion for STEM.',
    ar: 'شارك في مشاريع متدرجة التحدي في الروبوتات والهندسة. شجع على المشاركة في المسابقات وورش العمل والمشاريع التعاونية في مجالات العلوم والتكنولوجيا والهندسة والرياضيات. ستساعد هذه الأنشطة على ترسيخ مهارات طفلك وشغفه بهذه المجالات.'
  },
  traceEdu: {
    en: 'TRACE EDUCATION COMPANY',
    ar: "شركة Trace التعليمية"
  },
  IQReport: {
    en: "IQ SCORE REPORT",
    ar: 'تقرير نتائج معدل الذكاء'
  },
  startTraceJourney: {
    en: "Start your learning journey with Trace courses",
    ar: "ابدأ رحلتك للتعلم مع دورات Trace"
  },
  takeTest: {
    en: 'Take Trace Test',
    ar: 'ابدأ اختبار TRACE'
  },




  termsConditions: {
    en: "Terms and Conditions",
    ar: "الشروط والأحكام"
  },
  lastUpdated: {
    en: "Last updated: February 18, 2025",
    ar: "آخر تحديث: 18 فبراير 2025"
  },
  policyIntroduction: {
    en: "These Terms and Conditions ('Terms') govern your use of the website and services provided\
by Trace EdTech ('the Company', 'We', 'Us', or 'Our'), accessible from\
https://www.traceedtech.com. By accessing and using this Website, You agree to comply with\
these Terms. If You do not agree with any part of these Terms, You must not use this Website.",
    ar: "هذه الشروط والأحكام ('الشروط') تحكم استخدامك للموقع الإلكتروني والخدمات المقدمة من قبل Trace EdTech ('الشركة'، 'نحن'، 'لنا' أو 'خاصتنا')، والمتاحة عبر  \
https://www.traceedtech.com. من خلال الوصول إلى هذا الموقع واستخدامه، فإنك توافق على الامتثال لهذه الشروط. إذا كنت لا توافق على أي جزء من هذه الشروط، يجب عليك عدم استخدام هذا الموقع."
  },
  interpretationDefinitions: {
    en: "Interpretation and Definitions",
    ar: "التفسير والتعريفات"
  },
  interpretation: {
    en: "Interpretation",
    ar: "التفسير"
  },
  definitions: {
    en: "Definitions",
    ar: "التعريفات"
  },
  affiliateDefinition: {
    en: "Affiliate: An entity that controls, is controlled by, or is under common control with a party, where 'control' means ownership of 50% or more of shares, equity interest, or other voting rights.",
    ar: "الشركة التابعة: كيان يتحكم فيه أو يتم التحكم فيه أو يكون تحت سيطرة مشتركة مع طرف آخر، حيث تعني 'السيطرة' ملكية 50٪ أو أكثر من الأسهم أو الفائدة في الأسهم أو حقوق التصويت الأخرى."
  },
  country: {
    en: "Country: Egypt.",
    ar: "الدولة: مصر."
  },
  companyDefinition: {
    en: "Company: Trace EdTech, Giza, 6th of October.",
    ar: "الشركة: تريس إدتيك، الجيزة، السادس من أكتوبر."
  },
  deviceDefinition: {
    en: "Device: Any device that can access the Service, such as a computer, cellphone, or tablet.",
    ar: "الجهاز: أي جهاز يمكنه الوصول إلى الخدمة، مثل الكمبيوتر أو الهاتف المحمول أو الجهاز اللوحي."
  },
  serviceDefinition: {
    en: "Service: The Website and any associated digital services.",
    ar: "الخدمة: الموقع وأي خدمات رقمية مرتبطة به."
  },
  acknowledgment: {
    en: "Acknowledgment",
    ar: "الإقرار"
  },
  intellectualPropertyRights: {
    en: "Intellectual Property Rights",
    ar: "حقوق الملكية الفكرية"
  },
  restrictions: {
    en: "Restrictions",
    ar: "القيود"
  },
  restrictedActions: {
    en: "You are specifically restricted from publishing any Website material in other media, selling, sub-licensing, publicly performing, or using the Website for any unlawful purpose.",
    ar: "يُحظر عليك بشكل خاص نشر أي مواد من الموقع في وسائل الإعلام الأخرى، أو بيعها، أو منح تراخيص فرعية لها، أو عرضها علنًا، أو استخدام الموقع لأي غرض غير قانوني."
  },
  yourContent: {
    en: "Your Content",
    ar: "محتواك"
  },
  contentLicense: {
    en: "By displaying Your Content, You grant the Company a non-exclusive, worldwide, irrevocable license to use, reproduce, and distribute it across any media.",
    ar: "من خلال عرض محتواك، تمنح الشركة ترخيصًا غير حصري وعالميًا وغير قابل للإلغاء لاستخدامه وإعادة إنتاجه وتوزيعه عبر أي وسيلة إعلامية."
  },
  linksToOtherWebsites: {
    en: "Links to Other Websites",
    ar: "روابط لمواقع أخرى"
  },
  thirdPartyDisclaimer: {
    en: "Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.",
    ar: "قد تحتوي خدمتنا على روابط لمواقع أو خدمات تابعة لجهات خارجية لا تملكها أو تتحكم بها الشركة."
  },
  termination: {
    en: "Termination",
    ar: "إنهاء"
  },
  terminationClause: {
    en: "The Company reserves the right to terminate or suspend Your access immediately, without notice, for any violation of these Terms.",
    ar: "تحتفظ الشركة بالحق في إنهاء أو تعليق وصولك فورًا، دون إشعار، في حالة انتهاكك لهذه الشروط."
  },
  limitationOfLiability: {
    en: "Limitation of Liability",
    ar: "حدود المسؤولية"
  },
  liabilityClause: {
    en: "To the maximum extent permitted by law, the Company shall not be liable for any indirect, incidental, or consequential damages.",
    ar: "إلى أقصى حد يسمح به القانون، لا تتحمل الشركة أي مسؤولية عن الأضرار غير المباشرة أو العرضية أو التبعية."
  },
  disclaimer: {
    en: '"AS IS" and "AS AVAILABLE" Disclaimer',
    ar: 'إخلاء المسؤولية "كما هو" و "كما هو متاح"'
  },
  governingLaw: {
    en: "Governing Law & Dispute Resolution",
    ar: "القانون الحاكم وتسوية النزاعات"
  },
  severability: {
    en: "Severability",
    ar: "قابلية الفصل"
  },
  changesToTerms: {
    en: "Changes to These Terms",
    ar: "التعديلات على هذه الشروط"
  },
  contactUs: {
    en: "Contact Us",
    ar: "اتصل بنا"
  },
  copyRight:{
    en:'© 2018 - 2025 Trace Limited. All rights reserved.',
    ar:'© 2018 - 2025 Trace Limited. جميع الحقوق محفوظة.'
  },
  terms:{
    en:'Terms and Conditions',
    ar:'الشروط والأحكام'
  },
  privacy:{
    en:'Privacy Policy',
    ar:'سياسة الخصوصية'
  }






};
