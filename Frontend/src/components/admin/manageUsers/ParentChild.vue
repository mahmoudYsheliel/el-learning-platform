<script lang="ts" setup>
import { ref, computed } from "vue";
import { HttpRequester } from "@/lib/APICaller";

function extractDate(dateTimeString: string) {
  const date = new Date(dateTimeString);

  // Extract date components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const parents = ref();
const children = ref();
const users = ref();
const usersRequester = new HttpRequester("get_all_users");
usersRequester.callApi().then((res) => {
  if (res?.success) {
    parents.value = res?.data?.parents;
    children.value = res?.data?.children;
    users.value = res?.data?.users;
  }
});
const programs = ref();
new HttpRequester("get_all_program").callApi().then((res) => {
  if (res?.success) {
    programs.value = res?.data?.program;
  }
});

const selectedViewType = ref("parent"); // or child or user

const parentsWithChildren = computed(() => {
  let parentsArr = [];
  for (let i = 0; i < parents.value?.length; i++) {
    let parentId = parents.value[i]?.user_id;
    let user = users.value.find((user: any) => {
      return user?.id == parentId;
    });

    let childrenArr = [];
    for (let j = 0; j < parents.value[i]?.children?.length; j++) {
      let childId = parents.value[i]?.children[j];

      let childUser = users.value.find((user: any) => {
        return user?.id == childId;
      });
      childrenArr.push(childUser?.email);
    }
    let data = {
      email: user?.email,
      firstName: user?.first_name,
      lastName: user?.last_name,
      phoneNumber: user?.phone_number,
      createdAt: user?.created_at,
      location: parents.value[i]?.location,
      job: parents.value[i]?.job,
      children: childrenArr,
    };
    parentsArr.push(data);
  }
  return parentsArr;
});

const childWithParent = computed(() => {
  let childrenArr = [];

  for (let i = 0; i < children.value?.length; i++) {
    let childId = children.value[i]?.user_id;
    let user = users.value.find((user: any) => {
      return user?.id == childId;
    });
    let parentEmail = users.value.find((user: any) => {
      return (
        parents.value.find((parent: any) => {
          return parent?.children?.includes(childId);
        })?.user_id == user?.id
      );
    })?.email;
    let data = {
      email: user?.email,
      firstName: user?.first_name,
      lastName: user?.last_name,
      phoneNumber: user?.phone_number,
      createdAt: user?.created_at,
      grade: children.value[i]?.grade,
      program: programs.value?.find((program: any) => {
        return program?.id == children.value[i]?.child_group;
      })?.title?.en,
      education_system: children.value[i]?.education_system,
      parentEmail: parentEmail,
    };
    childrenArr.push(data);
  }
  return childrenArr;
});
</script>

<template>
  <div class="options-container">
    <p
      @click="selectedViewType = 'parent'"
      :class="{ selected: selectedViewType == 'parent' }"
    >
      Parents
    </p>
    <p
      @click="selectedViewType = 'child'"
      :class="{ selected: selectedViewType == 'child' }"
    >
      Children
    </p>
    <p
      @click="selectedViewType = 'user'"
      :class="{ selected: selectedViewType == 'user' }"
    >
      Users
    </p>
  </div>

  <div class="table" v-if="selectedViewType == 'user'">
    <div class="userRow row first">
      <h3>#</h3>
      <h3>Email</h3>
      <h3>First Name</h3>
      <h3>Last Name</h3>
      <h3>User Type</h3>
      <h3>Phone Number</h3>
      <h3>Creation Date</h3>
    </div>
    <div class="userRow row" v-for="(user, i) in users">
      <span style="color: var(--text)">{{ i + 1 }}</span>
      <span>{{ user?.email }}</span>
      <span>{{ user?.first_name }}</span>
      <span>{{ user?.last_name }}</span>
      <span>{{ user?.user_type }}</span>
      <span>{{ user?.phone_number }}</span>
      <span>{{ extractDate(user?.created_at) }}</span>
    </div>
  </div>

  <div class="table" v-if="selectedViewType == 'parent'">
    <div class="parentRow row first">
      <h3>#</h3>
      <h3>Email</h3>
      <h3>First Name</h3>
      <h3>Last Name</h3>
      <h3>Phone Number</h3>
      <h3>Location</h3>
      <h3>Job</h3>
      <h3>Creation Date</h3>
      <h3>Children Emails</h3>
    </div>
    <div class="parentRow row" v-for="(parent, i) in parentsWithChildren">
      <span style="color: var(--text)">{{ i + 1 }}</span>
      <span>{{ parent?.email }}</span>
      <span>{{ parent?.firstName }}</span>
      <span>{{ parent?.lastName }}</span>
      <span>{{ parent?.phoneNumber }}</span>
      <span>{{ parent?.location }}</span>
      <span>{{ parent?.job }}</span>
      <span>{{ extractDate(parent?.createdAt) }}</span>
      <span style="padding-block: 0.5rem"
        ><p v-for="child in parent.children">{{ child }}</p></span
      >
    </div>
  </div>
  <div class="table" v-if="selectedViewType == 'child'">
    <div class="childRow row first">
      <h3>#</h3>
      <h3>Email</h3>
      <h3>First Name</h3>
      <h3>Last Name</h3>
      <!-- <h3>Phone Number</h3> -->
      <h3>Grade</h3>
      <h3>Program</h3>
      <h3>Education System</h3>
      <h3>Parent Email</h3>
      <h3>Creation Date</h3>
    </div>
    <div class="childRow row" v-for="(child, i) in childWithParent">
      <span style="color: var(--text)">{{ i + 1 }}</span>
      <span>{{ child?.email }}</span>
      <span>{{ child?.firstName }}</span>
      <span>{{ child?.lastName }}</span>
      <!-- <span>{{ child?.phoneNumber }}</span> -->
      <span>{{ child?.grade }}</span>
      <span>{{ child?.program }}</span>
      <span>{{ child?.education_system }}</span>
      <span>{{ child?.parentEmail }}</span>
      <span>{{ extractDate(child?.createdAt) }}</span>
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
.userRow {
  grid-template-columns: 2rem 20rem 7rem 7rem 7rem 10rem 10rem;
}
.parentRow {
  grid-template-columns: 2rem 20rem 7rem 7rem 7rem 10rem 10rem 10rem 20rem;
}
.childRow {
  grid-template-columns: 2rem 20rem 7rem 7rem 10rem 10rem 10rem 20rem 10rem;
}
p {
  margin: 0;
  padding: 0;
  line-height: 1.25rem;
}
</style>
