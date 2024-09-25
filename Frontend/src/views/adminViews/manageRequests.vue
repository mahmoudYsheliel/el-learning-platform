<script lang="ts" setup>
import AdminSidebar from "../../components/admin/general/AdminSidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import "primeicons/primeicons.css";
import { selectLang, translationModule } from "@/lib/Translate";

interface Languages {
  en: string;
  ar: string;
}

interface RnrollmentRequest {
  id: string;
  parentEmail: string;
  childEmail: string;
  courseTitle: Languages;
  date: string;
  status: string;
  price: number;
  comments: any[];
  student_id: string;
  course_id: string;
  type: string;
  courses: any[];
}
const enrollmentRequests = ref<RnrollmentRequest[]>([]);
const enrollmentRequestsRequester = new HttpRequester(
  "get_all_request_enrollment"
);
async function getEnrollmentRequests() {
  enrollmentRequests.value = [];
  enrollmentRequestsRequester.callApi().then((enrollmentRes) => {
    if (enrollmentRes?.success == true) {
      for (let req of enrollmentRes?.data?.requests) {
        const parentInfoRequester = new HttpRequester(
          "personal_another_user_info"
        );
        parentInfoRequester
          .callApi({ another_userId: req?.parent_id })
          .then((parentRes) => {
            const childInfoRequester = new HttpRequester(
              "personal_another_user_info"
            );
            childInfoRequester
              .callApi({ another_userId: req?.student_id })
              .then((studentRes) => {
                if (studentRes?.success == true) {
                  if (req.package_type == "course") {
                    const childInfoRequester = new HttpRequester("get_course");
                    childInfoRequester
                      .callApi({ course_id: req?.course_id })
                      .then((courseRes) => {
                        if (courseRes?.success == true) {
                          enrollmentRequests.value?.push({
                            id: req?.id,
                            parentEmail: parentRes?.data?.info?.email,
                            childEmail: studentRes?.data?.info?.email,
                            courseTitle: courseRes?.data?.course?.title,
                            date: extractDate(req?.created_at),
                            status: req?.status,
                            price: req?.price,
                            comments: req?.comments,
                            student_id: req?.student_id,
                            course_id: req?.course_id,
                            courses: [],
                            type: "course",
                          });
                          addedComment.value = "";
                          enrollmentRequests.value.sort((a, b) =>
                            a.id.localeCompare(b.id)
                          );
                        }
                      });
                  } else if (req.package_type == "plan") {
                    const childInfoRequester = new HttpRequester("get_plan");
                    childInfoRequester
                      .callApi({ plan_id: req?.course_id })
                      .then((planRes) => {
                        if (planRes?.success == true) {
                          enrollmentRequests.value?.push({
                            id: req?.id,
                            parentEmail: parentRes?.data?.info?.email,
                            childEmail: studentRes?.data?.info?.email,
                            courseTitle: planRes?.data?.plan?.title,
                            date: extractDate(req?.created_at),
                            status: req?.status,
                            price: req?.price,
                            comments: req?.comments,
                            student_id: req?.student_id,
                            course_id: req?.course_id,
                            courses: planRes?.data?.plan?.courses,
                            type: "plan",
                          });
                          addedComment.value = "";
                          enrollmentRequests.value.sort((a, b) =>
                            a.id.localeCompare(b.id)
                          );
                        }
                      });
                  }
                }
              });
          });
      }
    }
  });
}
getEnrollmentRequests();

function extractDate(dateTimeString: string) {
  const date = new Date(dateTimeString);

  // Extract date components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function extractTime(dateTimeString: string) {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

const showComments = ref(false);
const requestOrderToShowComments = ref(-1);
const addedComment = ref("");

function addComment() {
  let data = {
    enrollment_request_id:
      enrollmentRequests.value[requestOrderToShowComments.value].id,
    msg: {
      msg: addedComment.value,
    },
  };
  const addCommentRequester = new HttpRequester("add_comment");
  addCommentRequester.callApi(data).then((res) => {
    if (res?.success) {
      getEnrollmentRequests();
    }
  });
}

function accept(req: RnrollmentRequest) {
  if (req.type == "course") {
    const editRequestStatusRequester = new HttpRequester("edit_request_status");
    const createEnrollmentRequester = new HttpRequester("create_enrollment");
    createEnrollmentRequester
      .callApi({
        new_enrollment: {
          student_id: req.student_id,
          course_id: req.course_id,
          created_at: new Date().toISOString(),
        },
      })
      .then((res) => {
        if (res?.success) {
          editRequestStatusRequester
            .callApi({ new_status: "Success", enrollment_request_id: req.id })
            .then((res) => {
              if (res?.success) {
                getEnrollmentRequests();
              }
            });
        }
      });
  }
  if (req.type == "plan") {
    const editRequestStatusRequester = new HttpRequester("edit_request_status");
    for (let course of req.courses) {
      const createEnrollmentRequester = new HttpRequester("create_enrollment");
      createEnrollmentRequester
        .callApi({
          new_enrollment: {
            student_id: req.student_id,
            course_id: course?.Id,
            created_at: new Date().toISOString(),
          },
        })
        .then((res) => {
          if (res?.success) {
            editRequestStatusRequester
              .callApi({ new_status: "Success", enrollment_request_id: req.id })
              .then((res) => {
                if (res?.success) {
                  getEnrollmentRequests();
                }
              });
          }
        });
    }
  }
}
function reject(id: string) {
  const editRequestStatusRequester = new HttpRequester("edit_request_status");
  editRequestStatusRequester
    .callApi({ new_status: "Rejected", enrollment_request_id: id })
    .then((res) => {
      if (res?.success) {
        getEnrollmentRequests();
      }
    });
}
const reverse = ref(false);
function orderRequests(type: string) {
  if (type == "price") {
    enrollmentRequests.value.sort((a: any, b: any) => {
      return a?.price - b?.price;
    });
    if (reverse.value) {
      enrollmentRequests.value.reverse();
    }
  } else if (type == "parent") {
    enrollmentRequests.value.sort((a: any, b: any) => {
      return a?.parentEmail?.localeCompare(b?.parentEmail);
    });
    if (reverse.value) {
      enrollmentRequests.value.reverse();
    }
  } else if (type == "title") {
    enrollmentRequests.value.sort((a: any, b: any) => {
      return a?.courseTitle?.localeCompare(b?.courseTitle);
    });
    if (reverse.value) {
      enrollmentRequests.value.reverse();
    }
  } else if (type == "date") {
    enrollmentRequests.value.sort((a: any, b: any) => {
      return a?.date?.localeCompare(b?.date);
    });
    if (reverse.value) {
      enrollmentRequests.value.reverse();
    }
  } else if (type == "time") {
    enrollmentRequests.value.sort((a: any, b: any) => {
      return a?.time?.localeCompare(b?.time);
    });
    if (reverse.value) {
      enrollmentRequests.value.reverse();
    }
  } else if (type == "status") {
    enrollmentRequests.value.sort((a: any, b: any) => {
      return a?.status?.localeCompare(b?.status);
    });
    if (reverse.value) {
      enrollmentRequests.value.reverse();
    }
  }
  reverse.value = !reverse.value;
}
</script>

<template>
  <Navbar />
  <Dialog
    v-model:visible="showComments"
    modal
    header="Request Comments"
    :style="{ width: '50vw' }"
  >
    <div class="msg-wrapper">
      <div
        class="msg"
        v-for="msg in enrollmentRequests[requestOrderToShowComments].comments"
        :class="{
          admin: msg?.sender_type == 'Admin',
          parent: msg?.sender_type == 'Parent',
        }"
      >
        {{ msg.msg }}
      </div>
    </div>

    <div class="add-comment">
      <InputText v-model="addedComment" />
      <Button label="Add Comment" @click="addComment" />
    </div>
  </Dialog>

  <div class="container">
    <AdminSidebar class="sidebar" selected="Manage Requests" />
    <div class="wrapper">
      <h2>Enrollment Requests</h2>
      <div class="table-container">
        <div class="row head">
          <h3 @click="orderRequests('parent')">
            {{ selectLang(translationModule.parentEmail) }}
            <i class="pi pi-sort-alt"></i>
          </h3>
          <h3 @click="orderRequests('child')">
            {{ selectLang(translationModule.childEmail) }}
            <i class="pi pi-sort-alt"></i>
          </h3>
          <h3 @click="orderRequests('title')">
            {{ selectLang(translationModule.courseTitle) }}
            <i class="pi pi-sort-alt"></i>
          </h3>
          <h3 @click="orderRequests('price')">
            {{ selectLang(translationModule.price) }}
            <i class="pi pi-sort-alt"></i>
          </h3>
          <h3 @click="orderRequests('date')">
            {{ selectLang(translationModule.date) }}
            <i class="pi pi-sort-alt"></i>
          </h3>
          <h3 @click="orderRequests('status')">
            {{ selectLang(translationModule.status) }}
            <i class="pi pi-sort-alt"></i>
          </h3>
          <h3>{{ selectLang(translationModule.actions) }}</h3>
        </div>
        <div class="row" v-for="(req, i) in enrollmentRequests">
          <span>{{ req.parentEmail }}</span>
          <span>{{ req.childEmail }}</span>
          <span>{{ selectLang(req.courseTitle) }}</span>
          <span>{{ req.price }} L.E.</span>
          <span>{{ req.date }}</span>
          <span
            :class="{
              pending: req.status == 'Pending',
              rejected: req.status == 'Rejected',
              accepted: req.status == 'Success',
            }"
            >{{ req.status }}</span
          >
          <span
            style="
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
              margin-block: 1rem;
            "
          >
            <Button
              @click="
                requestOrderToShowComments = i;
                showComments = true;
              "
              style="font-size: 0.7rem; width: 100%"
              label="Show Comments"
            />
            <Button
              v-if="req.status == 'Pending'"
              @click="
                () => {
                  accept(req);
                }
              "
              style="
                font-size: 0.7rem;
                width: 100%;
                background-color: var(--correctAnswer);
                color: black;
              "
              label="Accept"
            />
            <Button
              v-if="req.status == 'Pending'"
              @click="
                () => {
                  reject(req.id);
                }
              "
              style="
                font-size: 0.7rem;
                width: 100%;
                background-color: var(--wrongAnswer);
              "
              label="Reject"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 12rem calc(100vw - 12rem);
  min-height: 100vh;
}
.row {
  display: grid;
  grid-template-columns: repeat(7, 10rem);
}

.row > * {
  display: flex;
  align-items: center;
  padding-inline: 0.5rem;
  border: 2px solid var(--choiceBackgroundColor);
}
.wrapper {
  margin-top: 2rem;
  margin-inline: 2rem;
}
i {
  padding-inline: 0.5rem;
}
h2 {
  color: var(--accent1);
  width: fit-content;
  line-height: 1rem;
  border-bottom: 0.25rem solid var(--accent3);
}
.table-container {
  padding-inline: 1rem;
  overflow-x: scroll;
}
h3 {
  color: var(--text);
  cursor: pointer;
  margin: 0;
}
span {
  color: var(--accent2);
}
.pending {
  color: var(--secondary);
}
.rejected {
  color: var(--wrongAnswer);
}
.accepted {
  color: var(--accent4);
}
.msg-wrapper {
  display: flex;
  flex-direction: column;
}
.parent,
.admin {
  padding: 0.25rem;
  margin: 0.25rem;
  border-radius: 0.25rem;
  width: fit-content;
  min-width: 8rem;
  max-width: 20rem;
  color: var(--primary);
}
.parent {
  background-color: var(--secondary);
  align-self: flex-end;
}
.admin {
  background-color: var(--accent1);
}
.add-comment {
  margin-inline: auto;
  margin-top: 2rem;
  width: fit-content;
  display: flex;
  gap: 1rem;
}
@media screen and (max-width: 1000px) {
  .container {
    grid-template-columns: 100vw;
    min-height: 100vh;
  }
  .sidebar {
    display: none;
  }
}
</style>
