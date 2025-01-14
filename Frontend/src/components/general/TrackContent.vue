<script lang="ts" setup>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { selectLang, translationModule } from "@/lib/Translate";

const props =defineProps(['levels'])
</script>

<template>
  <div class="card">
    <h2>{{ selectLang(translationModule.trackContent) }}</h2>
    <Accordion :multiple="true" :activeIndex="[]">
      <AccordionTab
        v-for="(level, i) in levels"
        :key="level.title"
        :pt="{
          root: {
            style:
              'margin-block:0.5rem; border:solid 2px var(--accent1); border-radius:1rem; padding:0.25rem',
          },
        }"
      >
        <template #header style="display: flex; flex-direction: column">
          <div>
            <h4>{{ selectLang(level.title) }}</h4>
            <div
              style="
                display: flex;
                justify-content: space-between;
                gap: 2rem;
                padding-left: 2rem;
              "
            >
              <h5>
                {{ level.coursesCount }}
                {{ selectLang(translationModule.courses) }}
              </h5>
            </div>
          </div>
        </template>

        <p
          style="padding: 0; margin: 0; color: var(--accent1)"
          class="m-0"
          v-for="course in level.courses"
        >
          {{ selectLang(course.title) }}
        </p>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<style scoped>



h4,
h5 {
  margin: 0;
}
h2 {
  color: var(--accent1);
  margin: 0;
  padding: 0;
}
p {
  margin-left: 1rem;
  line-height: 1.25rem;
  color: var(--text);
}

.card {
  width: 75%;
}

</style>
