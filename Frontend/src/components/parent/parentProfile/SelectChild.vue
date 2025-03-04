<script setup lang="ts">
import { ref } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import "primeicons/primeicons.css";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { usePersonalInfo, useToken } from "@/stores/token";
import { useRouter } from "vue-router";
import { selectLang, translationModule } from "@/lib/Translate";


const emits = defineEmits(["selectedChild"]);

const children = ref<any[]>([]);
const selectedChild = ref<any>(null);
const groupRequester = new HttpRequester("get_all_program");
groupRequester.callApi().then((res) => {
  const programs = res?.data?.program;

  const childrenRequester = new HttpRequester("personal_info");
  childrenRequester.callApi().then((res) => {
    if (res?.data?.info?.children) {
      for (let child of res?.data?.info?.children) {
        const childRequester = new HttpRequester("personal_another_user_info");
        childRequester.callApi({ another_userId: child }).then((res) => {
          if (res?.data?.info) {
            let childObj = res?.data?.info;
            childObj.id = child;
            childObj.child_group_image = programs.find(
              (r: any) => r.id == childObj.child_group
            )?.image;
            childObj.child_group = programs.find(
              (r: any) => r.id == childObj.child_group
            )?.title;
            children.value.push(childObj);

            if (! selectedChild.value) {
              selectedChild.value = children.value[0]
              emits('selectedChild', selectedChild.value?.id)
            }
          }

        });

      }

    }

  })

})
const router = useRouter();

function switchChild(id: string) {
  const token = useToken();

  const switchRequester = new HttpRequester("switch_to_child");
  switchRequester.callApi({ child_id: id }).then((res) => {
    if (res?.success) {
      token.logout();
      token.addToken(res?.data?.access_token);
      const personalInfoRequester = new HttpRequester("personal_info");
      const personalInfo = usePersonalInfo();

      personalInfoRequester.callApi().then((res) => {
        if (res?.success) {
          personalInfo.addInfo({
            userType: res?.data?.info?.user_type,
            notifications: res?.data?.info?.notifications,
            id: res?.data?.info?.id,
            firstName: res?.data?.info?.first_name,
            lastName: res?.data?.info?.last_name,
            email: res?.data?.info?.email,
            gender: res?.data?.info?.gender,
          });
          router.push("/");
        }
      });
    }
  });
}
</script>

<template>
  <main>
    <div class="container">
      <Dropdown @change="$emit('selectedChild', selectedChild?.id)" v-model="selectedChild" :options="children" optionLabel="email" :placeholder="selectLang(translationModule.selectChild)" class="dropDown" />
      <div v-if="selectedChild" class="selectedChildInfo">
        <div class="info">
          <div class="childImage">
            <img v-if="selectedChild?.image != ''" :src="selectedChild?.image" alt="" />
            <i v-else class="pi pi-user"></i>
          </div>
          <div class="childInfo">
            <h2 style="color: var(--accent1); margin: 0; line-height: 2rem;padding-top: 0.5rem;">
              {{ selectedChild?.first_name }} {{ selectedChild?.last_name }}
            </h2>
            <p style="color: var(--text); margin: 0; line-height: 0.75rem">
              {{ selectedChild?.email }}
            </p>
            <h3>
              {{ selectLang(selectedChild?.child_group) }}
            </h3>

          </div>
        </div>
        <Button :label="selectLang(translationModule.switchToChild)" @click="() => {
            switchChild(selectedChild.id);
          }
          " />

      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline: 2rem;
  margin-inline: auto;
}

.dropDown {
  width: 75%;
}

.childImage>* {
  width: 5rem;
  height: 5rem;
  font-size: 5rem;
  color: var(--accent1);

  border-radius: 50%;
  overflow: hidden;
  border: var(--accent1) solid 0.1rem;
  background-color: var(--choiceBackgroundColor);
}

.info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.selectedChildInfo {
  display: flex;
  flex-wrap: wrap;
  width: 75%;
  justify-content: space-between;
  padding-inline: 2rem;
  align-items: center;
  margin-top: 2rem;
  background-color: var(--choiceBackgroundColor);
  border-radius: 1rem;
}

h3 {
  border-radius: 0.25rem;
  line-height: 1.25rem;
  padding: 0.25rem;
  font-size: 0.75rem;
  width: fit-content;
  background-color: transparent;
  color: var(--text);
  border: 2px solid var(--accent1);
}

.childInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

button {
  color: var(--primary);
  background-color: var(--accent1);
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

button:hover {
  color: var(--accent1);
  background-color: var(--primary);
  transition-duration: 0.5s;
}

@media print {

  button,
  .dropDown {
    display: none;
  }

}
</style>
