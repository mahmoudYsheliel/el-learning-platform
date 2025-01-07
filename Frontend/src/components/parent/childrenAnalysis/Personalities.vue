<script lang="ts" setup>
import { selectLang, translationModule } from "@/lib/Translate";
import { computed } from "vue";

import BiChart from "@/components/general/BiChart.vue";

const props = defineProps(["traits"]);

const traitsDistribution = computed(() => {
  let obj = { titles: <any[]>[], scores: <any[]>[] };
  for (let trait of props.traits?.sections) {
    obj.titles.push(selectLang(trait?.title));
    obj.scores.push(trait?.score);
  }
  return obj;
});
</script>

<template>

  <div class="container">
    <BiChart
    class="chart"
      :traits-distribution="traitsDistribution"
      :title="selectLang(traits?.title)"
    />
    <div>
        <div class="iqInfo" v-for="trait in traits?.sections">
      <h4>
        <span >{{ selectLang(trait?.title) }} : {{ trait?.score }}</span>
        <span style="color: var(--text);">({{ selectLang(trait?.description) }})</span>
      </h4>
      
    </div>

    </div>
   
    
  </div>
</template>

<style scoped>
h4 {
  color: var(--accent1);
  display: flex;
  flex-direction: column;
  padding-inline: 2rem;
}

.chart{
  width: 100%;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

}
.chart::-webkit-scrollbar{
  display:none ;
}
</style>
