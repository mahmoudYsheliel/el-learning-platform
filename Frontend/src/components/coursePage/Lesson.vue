<script lang="ts" setup>
import axios from "axios";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useToken } from "@/stores/token";
const token = useToken();
const route = useRoute();

const seletedMat = computed(() => {
  return route.params.materialId;
});
const title = ref();
const description = ref();
const source = ref();
const getCourse = async () => {
  axios
    .post(
      "http://127.0.0.1:8000/get_lesson",
      { lesson_id: seletedMat.value },
      {
        headers: {
          Authorization: `Bearer ${token.getToken}`,
        },
      }
    )
    .then((res) => {
      try {
        title.value = res.data.data.lesson["title"];
        description.value = res.data.data.lesson["description"];
        source.value = res.data.data.lesson["source"];
      } catch (err) {}
    });
};
getCourse();
</script>

<template>
  <main>
    <div class="container">
      <h2>
        {{ title }}
      </h2>
      <p>{{ description }}</p>
      <div class="wrapper">
        <iframe :src="source" frameborder="0"></iframe>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 80%;
  margin-inline: auto;
}
h2 {
  color: var(--primary);
  margin-top: 2rem;
  border-bottom: 4px solid var(--primary);
  width: fit-content;
  margin-bottom: 1rem;
}
iframe {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 8px;
}
.wrapper {
  margin-top: 2rem;
  width: 75%;
  margin-inline: auto;
}
</style>
