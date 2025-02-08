<script lang="ts" setup>
import Button from "primevue/button";
import { useRouter, useRoute } from "vue-router";
import { selectLang, translationModule } from "@/lib/Translate";
import { computed } from "vue";
import 'primeicons/primeicons.css'
import Chip from "primevue/chip";
import type { backgroundClip } from "html2canvas/dist/types/css/property-descriptors/background-clip";


const prop = defineProps(
  {
    course: {
      type: Object,
      required: true
    },
    search: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '22rem'
    }
  });
const router = useRouter()
const route = useRoute()
const isEnrolled = computed(() => {
  if (route.params?.isEnrolled) {
    return route.params?.isEnrolled
  }
  return 0
})
const childId = computed(() => {
  if (route.params?.childId) {
    return route.params?.childId
  }
  return 0
})
const rates = [4.8, 4.7, 4.9]
const colors = ['#D42488', '#7B12FF', '#01ABFF', '#7302ff']
const color = colors[Math.floor(Math.random() * 4)]
const rate = rates[Math.floor(Math.random() * 3)]
</script>

<template>
  <main v-if="selectLang(course?.title)?.toLowerCase().includes(search.toLowerCase())">
    <div class="container" @click="router.push(`/courseDetails/${prop.course?.id}/${childId}/${isEnrolled}`)">
      <div class="img_cont" :class="{ locked: course?.is_locked }">
        <img :style="{width:prop.width}" :src="course?.image" alt="" />
        <i v-if="course?.is_locked" class="pi pi-lock lock"></i>
        <!-- <div class="chip" :style="{backgroundColor:color}">
          <i class="pi pi-star-fill"></i>
          <span style="color: white;">{{ rate }} </span>
        </div> -->
      </div>
      <h2>{{ selectLang(course?.title) }} </h2>
      <Button style="border: none;" :style="{ backgroundColor: color }" raised @click="router.push(`/courseDetails/${prop.course?.id}/${childId}/${isEnrolled}`)" :label=selectLang(translationModule.learnMore) />
    </div>
  </main>
</template>

<style scoped>
.chip {
  color: #FCD980;
  font-size: 0.625rem;
  right: 1rem;
  position: absolute;
  top: calc(100% - 1.5rem);
  padding: 0.2rem 0.75rem;
  border-radius: 2rem;
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  align-items: center;
}

.container {
  width: fit-content;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.img_cont {
  position: relative;
}

.lock {
  position: absolute;
  font-size: 3rem;
  top: calc(50% - 2rem);
  left: calc(50% - 2rem);
  color: white;
  padding: 0.5rem;
  border-radius: 100%;
}

.locked>img {
  opacity: 0.6;
}

h2 {
  color: var(--header);
  margin: 0;
  padding-left: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

button {
  align-self: end;
}

img {
  aspect-ratio: 1.6/1;
  border-radius: 8px;
}
</style>
