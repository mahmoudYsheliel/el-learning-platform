<script lang="ts" setup> 
import BiChart from "@/components/general/BiChart.vue";
import { selectLang,translationModule } from "@/lib/Translate";
import { computed } from "vue";


const props = defineProps(['IQChart'])

const traitsDistribution =computed(()=>{

  let obj = { titles: <any[]>[], scores: <any[]>[] };

    for (let i=0; i< props.IQChart?.length;i++) {
    obj.titles.push(props.IQChart[i]?.name);
    obj.scores.push(props.IQChart[i]?.total_score);
  
  }
 
  return obj;
})

</script>


<template>
  <div v-if="traitsDistribution"> <BiChart  class="chart" :traits-distribution="traitsDistribution" :title="selectLang(translationModule.results)"  />
  </div>
 
</template>

<style scoped>
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