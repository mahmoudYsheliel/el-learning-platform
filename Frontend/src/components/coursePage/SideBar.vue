<script setup lang="ts">
import "primeicons/primeicons.css";
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const prop = defineProps(["material", "courseTitle"]);

const router = useRouter();
const route = useRoute();
const seletedMat = computed(() => {
  return route.params.materialId;
});

const shrink = ref(false);
</script>

<template>
  <main>
    <span @click="shrink = !shrink" class="circle">
      <span class="upper-arrow" :class="{ upperArrowShrink: shrink }"></span>
      <span class="down-arrow" :class="{ downArrowShrink: shrink }"></span>
    </span>
    <div class="container" :class="{ shrink: shrink }">
      <h3>
        {{ courseTitle }}
      </h3>
      <div class="wrapper">
        <div
          v-for="(mat, i) in material"
          :class="{ selected: seletedMat == mat.Id }"
          class="element"
          @click="
            () => {
              router.push(
                `/viewCoursePage/${route.params.courseId}/${route.params.enrollmentId}/${mat.Id}`
              );
            }
          "
        >
          <i :class="mat.icon" />
          {{ mat.title }}
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100%;
  width: fit-content;
  position: relative;

  box-shadow: 4px 8px 8px var(--primary);
}
.container {
  background-color: var(--primary);
  height: 100%;
  overflow: hidden;
  width: 15rem;
  transition-duration: 0.5s;
}
.container > * {
  padding: 1rem 0.5rem;
}
h3 {
  background-color: var(--secondary);
  color: var(--primary);
  line-height: 2rem;
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.circle {
  width: 2rem;
  height: 2rem;
  background-color: var(--primary);
  z-index: 2;
  display: block;
  position: absolute;
  top: 1rem;
  left: calc(100% - 0.5rem);
  border-radius: 100%;
  cursor: pointer;
}
.circle > * {
  width: 1rem;
  height: 0.5rem;
  background-color: var(--secondary);
  position: absolute;
  border-radius: 0.25rem;
  left: 0.5rem;
  transition-duration: 0.5s;
}
.upper-arrow {
  top: 0.5rem;
  transform: rotate(-45deg);
}
.down-arrow {
  top: 1rem;
  transform: rotate(45deg);
}

.element {
  border-bottom: 2px solid;
  margin-bottom: 0.5rem;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  transition-duration: 0.5s;
}
.element:hover {
  opacity: 0.25;
}
.selected {
  color: var(--secondary);
}
.wrapper {
  height: calc(100% - 6rem);
  overflow-y: scroll;
}
.wrapper::-webkit-scrollbar {
  display: none;
}
.shrink {
  width: 0px;
}
.upperArrowShrink {
  transform: rotate(45deg);
}
.downArrowShrink {
  transform: rotate(-45deg);
}
</style>
