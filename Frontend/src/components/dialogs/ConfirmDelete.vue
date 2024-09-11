<script setup lang="ts">
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { ref } from "vue";
import { HttpRequester } from "@/lib/APICaller";

const typedTitle = ref();

const prop = defineProps(["showDialog", "mat", "matType"]);
const emit = defineEmits(["removeDialog"]);

function deletion() {
  if (prop.matType == "Programs") {
    new HttpRequester("delete_program")
      .callApi({ program_id: prop.mat?.id })
      .then((res) => {
        if (res.success) {
          emit("removeDialog", true);
        }
      });
  } else if (prop.matType == "Categories") {
    new HttpRequester("delete_category")
      .callApi({ category_id: prop.mat?.id })
      .then((res) => {
        if (res.success) {
          emit("removeDialog", true);
        }
      });
  } else if (prop.matType == "Plans") {
    new HttpRequester("delete_plan")
      .callApi({ plan_id: prop.mat?.id })
      .then((res) => {
        if (res.success) {
          emit("removeDialog", true);
        }
      });
  } else if (prop.matType == "Courses") {
    new HttpRequester("delete_course")
      .callApi({ course_id: prop.mat?.id })
      .then((res) => {
        if (res.success) {
          emit("removeDialog", true);
        }
      });
  }
}
</script>

<template>
  <Dialog
    v-model:visible="prop.showDialog"
    modal
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
  >
    <template #container="{ closeCallback }">
      <div class="dialog">
        <h2>
          Type
          <strong style="font-weight: 1000"
            >"{{
              matType == "Categories" ? mat?.category?.en : mat?.title?.en
            }}"</strong
          >
          to confirm deletion
        </h2>
        <InputText v-model="typedTitle" />
        <Button
          label="Confirm Deletion"
          :disabled="
            (typedTitle != mat.title?.en && matType != 'Categories') ||
            (typedTitle != mat.category?.en && matType == 'Categories')
          "
          @click="deletion"
        />
        <Button
          label="Cancel"
          @click="
            () => {
              $emit('removeDialog', true);
            }
          "
        />
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
.dialog {
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
h2 {
  color: var(--accent1);
  margin: 0;
  padding: 0;
}
.btn-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
}
</style>
