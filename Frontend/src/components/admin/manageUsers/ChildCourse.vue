<script lang="ts" setup>
import { ref, computed } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import "primeicons/primeicons.css";

function extractDate(dateTimeString: string) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const courses = ref();
const users = ref();
const enrollments = ref();

const usersRequester = new HttpRequester("get_all_users");
usersRequester.callApi().then((res) => {
  if (res?.success) {
    users.value = res?.data?.users;
  }
});
const coursesRequester = new HttpRequester("get_courses");
coursesRequester.callApi().then((res) => {
  if (res?.success) {
    courses.value = res?.data?.courses;
  }
});
const enrollmentsRequester = new HttpRequester("get_admin_enrollments");
enrollmentsRequester.callApi().then((res) => {
  if (res?.success) {
    enrollments.value = res?.data?.enrollments;
  }
});

const selectedViewType = ref("course"); // or child
const reverse = ref(false);

const courseWithChildren = computed(() => {
  let enrollmentsArr = [];
  for (let i = 0; i < enrollments.value?.length; i++) {
    let childId = enrollments.value[i]?.student_id;
    let user = users.value?.find((user: any) => {
      return user?.id == childId;
    });
    let courseId = enrollments.value[i]?.course_id;
    let course = courses.value.find((course: any) => {
      return course?.id == courseId;
    });
    let data = {
      email: user?.email,
      createdAt: enrollments.value[i]?.created_at,
      courseTiltla: course?.title?.en,
    };
    enrollmentsArr.push(data);
  }
  if (selectedViewType.value == "child") {
    enrollmentsArr.sort((a: any, b: any) => {
      if (a?.email > b?.email) return -1;
      if (b?.email > a?.email) return 1;
      return 0;
    });
  }
  if (selectedViewType.value == "course") {
    enrollmentsArr.sort((a: any, b: any) => {
      if (a?.courseTiltla > b?.courseTiltla) return -1;
      if (b?.courseTiltla > a?.courseTiltla) return 1;
      return 0;
    });
  }
  if (reverse.value) {
    enrollmentsArr.reverse();
  }
  return enrollmentsArr;
});

function sortBy(typeSort: string) {
  reverse.value = !reverse.value;
  selectedViewType.value = typeSort;
}
</script>

<template>
  <div class="table">
    <div class="row first">
      <h3>#</h3>
      <h3
        @click="
          () => {
            sortBy('child');
          }
        "
        style="cursor: pointer"
      >
        Email
        <i class="pi pi-sort-alt"></i>
      </h3>
      <h3
        @click="
          () => {
            sortBy('course');
          }
        "
        style="cursor: pointer"
      >
        Course Title
        <i class="pi pi-sort-alt"></i>
      </h3>
      <h3>Creation Date</h3>
    </div>
    <div class="row" v-for="(obj, i) in courseWithChildren">
      <span style="color: var(--text)">{{ i + 1 }}</span>
      <span>{{ obj?.email }}</span>
      <span>{{ obj?.courseTiltla }}</span>
      <span>{{ extractDate(obj?.createdAt) }}</span>
    </div>
  </div>
</template>

<style scoped>
.options-container {
  display: flex;
  justify-content: space-around;
  margin-block: 4rem 2rem;
}
.options-container > * {
  color: var(--text);
  cursor: pointer;
}
.selected {
  color: var(--accent1);
  transition-duration: 0.5s;
}
.row {
  display: grid;
  grid-template-columns: 5rem 20rem 10rem 10rem;
}
.row > * {
  border: 2px solid var(--choiceBackgroundColor);
  padding-inline: 0.5rem;
}
h3 {
  color: var(--text);
  margin: 0;
}
.table {
  overflow-x: scroll;
}
span {
  color: var(--accent2);
}
p {
  margin: 0;
  padding: 0;
  line-height: 1.25rem;
}
</style>
