<script lang="ts" setup>
import AdminSidebar from "../../components/admin/general/AdminSidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
interface RnrollmentRequest {
  id: string;
  parentEmail: string;
  childEmail: string;
  courseTitle: string;
  date: string;
  time: string;
  status: string;
  price: number;
  student_id: string;
  course_id: string;
  comments: any[];
}
const enrollmentRequests = ref<RnrollmentRequest[]>([]);
const enrollmentRequestsRequester = new HttpRequester(
  "get_all_request_enrollment"
);
async function getEnrollmentRequests() {
  enrollmentRequests.value = [];
  enrollmentRequestsRequester.callApi().then((enrollmentRes) => {
    if (enrollmentRes.success == true) {
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
                if (studentRes.success == true) {
                  const childInfoRequester = new HttpRequester("get_course");
                  childInfoRequester
                    .callApi({ course_id: req?.course_id })
                    .then((courseRes) => {
                      if (courseRes.success == true) {
                        enrollmentRequests.value?.push({
                          id: req?.id,
                          parentEmail: parentRes?.data?.info?.email,
                          childEmail: studentRes?.data?.info?.email,
                          courseTitle: courseRes?.data?.course?.title,
                          date: extractDate(req?.created_at),
                          time: extractTime(req?.created_at),
                          status: req?.status,
                          price: courseRes?.data?.course?.price,
                          comments: req?.comments,
                          course_id: req?.course_id,
                          student_id: req?.student_id,
                        });
                        addedComment.value = "";
                        enrollmentRequests.value.sort((a, b) =>
                          a.id.localeCompare(b.id)
                        );
                      }
                    });
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
    if (res.success) {
      getEnrollmentRequests();
    }
  });
}

function accept(req: RnrollmentRequest) {
  const editRequestStatusRequester = new HttpRequester("edit_request_status");
  const createEnrollmentRequester = new HttpRequester("create_enrollment");
  createEnrollmentRequester
    .callApi( {new_enrollment:{ student_id: req.student_id, course_id: req.course_id  ,created_at:new Date().toISOString()}})
    .then((res) => {
      if (res.success) {
        editRequestStatusRequester
          .callApi({ new_status: "Success", enrollment_request_id: req.id} )
          .then((res) => {
            if (res.success) {
              getEnrollmentRequests();
            }
          });
      }
    });
}
function reject(id: string) {
  const editRequestStatusRequester = new HttpRequester("edit_request_status");
  editRequestStatusRequester
    .callApi({ new_status: "Rejected", enrollment_request_id: id })
    .then((res) => {
      if (res.success) {
        getEnrollmentRequests();
      }
    });
}
</script>

<template>
  <Navbar />
  <div class="container">
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
    <AdminSidebar selected="Manage Requests" />
    <div class="wrapper">
      <div class="requests">
        <h2>Enrollment Requests</h2>
        <div class="table-container">
          <div class="row head">
            <h3>Parent Email</h3>
            <h3>Child Email</h3>
            <h3>Course Title</h3>
            <h3>Course Price</h3>
            <h3>Date</h3>
            <h3>Time</h3>
            <h3>Status</h3>
            <h3>Actions</h3>
          </div>
          <div class="row" v-for="(req, i) in enrollmentRequests">
            <span>{{ req.parentEmail }}</span>
            <span>{{ req.childEmail }}</span>
            <span>{{ req.courseTitle }}</span>
            <span>{{ req.price }} L.E.</span>
            <span>{{ req.date }}</span>
            <span>{{ req.time }}</span>
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
                style="font-size: 0.75rem; width: 100%"
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
                  font-size: 0.75rem;
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
                  font-size: 0.75rem;
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
  </div>
  <Footer />
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 12rem 1fr;
  min-height: 100vh;
}
.row {
  display: grid;
  grid-template-columns: repeat(8, 9rem);
}
h3 {
  margin: 0;
}
.row > * {
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  border: 2px solid var(--choiceBackgroundColor);
}
.wrapper {
  margin-top: 2rem;
  margin-left: 2rem;
}
h2 {
  color: var(--accent1);
  width: fit-content;
  line-height: 1rem;
  border-bottom: 0.25rem solid var(--accent3);
}
.requests {
  width: 90%;
}
.table-container {
  padding-left: 1rem;
  overflow-x: scroll;
  max-width: 100%;
}
h3 {
  color: var(--text);
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
</style>
