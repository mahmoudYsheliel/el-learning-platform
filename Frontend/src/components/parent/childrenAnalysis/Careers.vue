<script lang="ts" setup> 
import BiChart from "@/components/general/BiChart.vue";
import { selectLang } from "@/lib/Translate";
import { computed } from "vue";


const props = defineProps(['careers'])


const traitsDistribution = computed(() => {
  let obj = { titles: <any[]>[], scores: <any[]>[] };
  let ordered = props.careers?.sections?.sort((a:any,b:any)=>{return b?.percentage - a?.percentage })

  for (let trait of ordered) {
    obj.titles.push(selectLang(trait?.title));
    obj.scores.push(trait?.percentage);
  }

  return obj;
});

</script>


<template>
    
<BiChart class="chart" :traits-distribution="traitsDistribution" :title="careers?.title" />

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