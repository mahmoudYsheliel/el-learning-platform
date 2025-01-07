<script lang="ts" setup>
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { selectLang,translationModule } from "@/lib/Translate";
const prop = defineProps(["programId","trackId","track",'search']);
const router = useRouter()
</script>

<template>
  <main v-if="selectLang(track?.title)?.toLowerCase().includes(search.toLowerCase())" >
    <div class="container"  @click="router.push(`/tracks/${prop.programId}/${prop.trackId}`)" >
      <img :src="track?.male_image" alt="" />
      <h2>{{ selectLang(track?.title) }}</h2>
      <Button @click="router.push(`/tracks/${prop.programId}/${prop.trackId}`)" :label=selectLang(translationModule.learnMore) />
    </div>
  </main>
</template>

<style scoped>
.container{
    width: fit-content;
    display: flex;
    flex-direction: column;
}
h2{
    color: var(--header);
    margin: 0;
    padding-left: 0.5rem;
    font-size: 1.25rem
}
button{
    align-self: end;
}
img{
    width: 16rem;
    aspect-ratio: 1.05/1;
    border-radius: 8px;
}

</style>
