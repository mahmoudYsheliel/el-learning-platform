<script lang="ts" setup>
import Navbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import { useRoute } from "vue-router";
import { ref } from "vue";
import InputText from "primevue/inputtext";
import "primeicons/primeicons.css";
import { instructorIfonFields, instructorIfonArrayFields } from "@/lib/Modules";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import router from "@/router";

const route = useRoute();

const image = ref("");

const instructorCourses = ref<any[]>([]);
const courses = ref();

const coursesRequester = new HttpRequester("get_courses");
const instructorRequester = new HttpRequester("personal_another_user_info");

coursesRequester.callApi().then((res) => {
  if (res?.success) {
    courses.value = res?.data?.courses;
    instructorRequester
      .callApi({ another_userId: route.params?.instructorId })
      .then((res) => {
        if (res?.success) {
          let data = res?.data?.info;

          instructorIfonFields.value = {
            email: {
              ...instructorIfonFields.value.email,
              value: data?.email || "",
            },
            phoneNumber: {
              ...instructorIfonFields.value.phoneNumber,
              value: data?.phone_number,
            },
            firstName: {
              ...instructorIfonFields.value.firstName,
              value: data?.first_name,
            },
            lastName: {
              ...instructorIfonFields.value.lastName,
              value: data?.last_name,
            },
            title: { ...instructorIfonFields.value.title, value: data?.title },
            biography: {
              ...instructorIfonFields.value.biography,
              value: data?.biography,
            },
            philosophy: {
              ...instructorIfonFields.value.philosophy,
              value: data?.philisophy,
            },
          };

          instructorIfonArrayFields.value = {
            experience: {
              ...instructorIfonArrayFields.value.experience,
              value: data?.experience,
            },

            specializations: {
              ...instructorIfonArrayFields.value.specializations,
              value: data?.specializations,
            },

            educationBackground: {
              ...instructorIfonArrayFields.value.educationBackground,
              value: data?.education_background,
            },
          };

          image.value = data?.image;
          let insCourses = [];
          for (let i = 0; i < data?.courses?.length; i++) {
            let course = courses.value?.find((c: any) => {
              return c?.id == data?.courses[i];
            });
            insCourses.push(course);
          }
          instructorCourses.value = insCourses;
        }
      });
  }
});

function updateInstructor() {
  let user = {
    email: instructorIfonFields.value.email.value,
    phone_number: instructorIfonFields.value.phoneNumber.value,
    last_name: instructorIfonFields.value.lastName.value,
    first_name: instructorIfonFields.value.firstName.value,
    image: image.value,
  };
  let instructor = {
    title: instructorIfonFields.value.title.value,
    specializations: instructorIfonArrayFields.value.specializations.value,
    biography: instructorIfonFields.value.biography.value,
    education_background:
      instructorIfonArrayFields.value.educationBackground.value,
    experience: instructorIfonArrayFields.value.experience.value,
    philisophy: instructorIfonFields.value.philosophy.value,
    courses: <any[]>[],
  };
  for (let i = 0; i < instructorCourses.value.length; i++) {
    if (instructorCourses.value[i]?.id) {
      instructor.courses.push(instructorCourses.value[i]?.id);
    }
  }
  new HttpRequester("update_another_user_info")
    .callApi({
      user_type_specific_info: instructor,
      user_to_change: route.params.instructorId,
      update: user,
    })
    .then((res: any) => {
      if (res?.success) {
        router.push("/manageInstructors");
      }
    });
}
</script>

<template>
  <Navbar />
  <div class="container">
    <div class="element" v-for="field in instructorIfonFields">
      <h3>{{ field.name }}</h3>
      <component
        :is="field.component"
        v-model="field.value"
        :disabled="field.disabled"
      />
    </div>

    <Accordion :activeIndex="0">
      <AccordionTab
        :pt="{
          headerAction: {
            style: 'padding-inline:0',
          },
        }"
      >
        <template #header>
          <h3>Courses</h3>
        </template>
        <div>
          <div v-for="(course, i) in instructorCourses" class="row">
            <div class="courseelement">
              <Dropdown
                v-model="instructorCourses[i]"
                :options="courses"
                optionLabel="title.en"
                placeholder="Select a Course"
              />
              <i
                class="pi pi-times-circle"
                @click="
                  () => {
                    instructorCourses.splice(i, 1);
                  }
                "
              ></i>
            </div>
          </div>
          <div class="btn-container">
            <i
              @click="
                () => {
                  instructorCourses?.push(null);
                }
              "
              class="pi pi-plus-circle"
              label="Add Course to Road Map"
              style="font-size: 1.5rem; color: var(--accent1)"
            ></i>
          </div>
        </div>
      </AccordionTab>

      <AccordionTab
        v-for="(field, fieldName) in instructorIfonArrayFields"
        :pt="{
          headerAction: {
            style: 'padding-inline:0',
          },
        }"
      >
        <template #header>
          <h3>{{ field.name }}</h3>
        </template>
        <div>
          <div v-if="field.value" v-for="(_, i) in field.value" class="row">
            <div class="courseelement">
              <InputText v-model="field.value[i]" />
              <i
                class="pi pi-times-circle"
                @click="
                  () => {
                    if (field.value) {
                      const fieldValue = [...field.value];
                      fieldValue.splice(i, 1);

                      instructorIfonArrayFields = {
                        ...instructorIfonArrayFields,
                        [fieldName.toString()]: {
                          ...instructorIfonArrayFields[fieldName],
                          value: fieldValue,
                        },
                      };
                      console.log(instructorIfonArrayFields);
                    }
                  }
                "
              ></i>
            </div>
          </div>
          <div class="btn-container">
            <i
              @click="
                () => {
                  const fieldValue = [...field.value];
                  fieldValue.push('');

                  instructorIfonArrayFields = {
                    ...instructorIfonArrayFields,
                    [fieldName.toString()]: {
                      ...instructorIfonArrayFields[fieldName],
                      value: fieldValue,
                    },
                  };
                  console.log(instructorIfonArrayFields);
                }
              "
              class="pi pi-plus-circle"
              label="Add Course to Road Map"
              style="font-size: 1.5rem; color: var(--accent1)"
            ></i>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
    <div class="element">
      <h3>Image Source</h3>
      <InputText v-model="image" />
    </div>
    <div v-if="image" class="img-container">
      <img :src="image" alt="" />
    </div>
    <div class="btn-container">
      <Button label="Save Changes" @click="updateInstructor" />
    </div>
  </div>

  <Footer />
</template>

<style scoped>
.container {
  min-height: 80vh;
  width: 90%;
  margin-inline: auto;
  margin-block: 5rem;
}
.element {
  display: grid;
  grid-template-columns: 15rem calc(100% - 15rem);
  margin-bottom: 1rem;
}
textarea {
  height: 5rem;
}
img {
  display: block;
  width: 62.5%;
  margin-block: 1rem;
  margin-inline: auto;
  border-radius: 0.5rem;
}
.row {
  padding: 1rem;
}
h3 {
  padding: 0;
  margin: 0;
  color: var(--accent1);
}
.btn-container {
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-bottom: 5rem;
}
i {
  cursor: pointer;
  color: red;
}
.courseelement {
  display: grid;
  grid-template-columns: calc(100% - 5rem) 5rem;
  gap: 2rem;
}
.img-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
}
</style>
