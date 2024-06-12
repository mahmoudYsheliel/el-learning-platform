<script setup lang="ts">
import "primeicons/primeicons.css";
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Tree from "primevue/tree";

const prop = defineProps(["chapters", "courseTitle"]);

const router = useRouter();
const route = useRoute();
const shrink = ref(false);
const selectedKey = ref();

const chaptersObj = computed(() => {
  let chaptersObj = prop.chapters;
  for (let index = 0; index < chaptersObj?.length; index++) {
    chaptersObj[index].label = chaptersObj[index].title;
    chaptersObj[index].children = chaptersObj[index].materials;
    chaptersObj[index].key = 'k'+index.toString();
    for (let j = 0; j < chaptersObj[index].children?.length; j++) {
      chaptersObj[index].children[j].label =
        chaptersObj[index].children[j].title;
      chaptersObj[index].children[j].key =
        'k'+index.toString() + "_" + j.toString();
      if (chaptersObj[index].children[j].Id == route.params.materialId) {
        selectedKey.value = Object.fromEntries(new Map([[chaptersObj[index].children[j].key,true]]));
        
      }
    }
  }
  return chaptersObj;
});
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
        <Tree
          v-model:selectionKeys="selectedKey"
          :value="chaptersObj"
          selectionMode="single"
          :metaKeySelection="false"
          @nodeSelect="(node:any) => {
            if (node.Id){router.push(
                `/viewCoursePage/${route.params.courseId}/${route.params.enrollmentId}/${node.Id}`
              );}
            }"
          @node-unselect="
            (node) => {
              if (node.Id) {
                router.push(
                  `/viewCoursePage/${route.params.courseId}/${route.params.enrollmentId}/${node.Id}`
                );
              }
            }
          "
          :pt="{ root: { style: 'padding:0' } }"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100%;
  width: fit-content;
  position: relative;
  padding-bottom: 2rem;
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
  padding: 0;
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
