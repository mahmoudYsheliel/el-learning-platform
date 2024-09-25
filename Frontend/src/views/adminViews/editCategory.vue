<script lang="ts" setup>
import Nanbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import { useRoute, useRouter } from "vue-router";
import { categoryObject } from "@/lib/Modules";
import Button from "primevue/button";
import { ref,reactive } from "vue";

const route = useRoute();
const router = useRouter();
const categoryRequester = new HttpRequester("get_category");
const category = ref();


categoryRequester
  .callApi({ category_id: route.params?.categoryId })
  .then((res) => {
    if (res?.success) {
      category.value = res?.data?.category;

      categoryObject.value = {
            ...categoryObject.value,
            titleEn: {
              ...categoryObject.value.titleEn,
              variable: category.value?.category?.en || "",
            },
            titleAr: {
              ...categoryObject.value.titleAr,
              variable: category.value?.category?.ar || "",
            },
            descriptionEn: {
              ...categoryObject.value.descriptionEn,
              variable: category.value?.description?.en || "",
            },
            descriptionAr: {
              ...categoryObject.value.descriptionAr,
              variable: category.value?.description?.ar || "",
            },
            image: {
              ...categoryObject.value.image,
              variable: category.value?.image || "",
            },
          };
    }
  });

function updateCategory() {
  const data = {
    category_id: route.params?.categoryId,
    update: {
      category: {
        en: categoryObject.value.titleEn.variable,
        ar:categoryObject.value.titleAr.variable,
      },
      description: {
        en: categoryObject.value.descriptionEn.variable,
        ar: categoryObject.value.descriptionAr.variable,
      },
      image: categoryObject.value.image.variable,
    },
  };
  new HttpRequester("update_category").callApi(data).then((res) => {
    if (res?.success) {
      router.push("/managecategorys");
    }
  });
}
</script>

<template>
  <Nanbar />
  <div class="container">
    <div class="element" v-for="element in categoryObject">
      <h3>{{ element.label }}</h3>
      <component
        :type="element.inputType"
        :is="element.component"
        v-model="element.variable"
      />
    </div>

    <div class="btn-container">
      <Button
        @click="updateCategory"
        label="Save Changes"
      />
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
  height: 10rem;
}
img {
  display: block;
  width: 62.5%;
  margin-block: 1rem;
  margin-inline: auto;
  border-radius: 0.5rem;
}
h3 {
  padding: 0;
  margin: 0;
  color: var(--accent1);
}
span {
  color: var(--text);
}
.btn-container {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 5rem;
}
</style>
