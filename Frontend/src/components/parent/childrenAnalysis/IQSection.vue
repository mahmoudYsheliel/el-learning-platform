<script lang="ts" setup>
import { selectLang, translationModule } from "@/lib/Translate";
import { iqLevels } from "@/lib/Modules";

import Chart from "@/components/general/Chart.vue";

const props = defineProps(["iqSection"]);
</script>

<template>
  <div class="container">
    <Chart class="chart"/>
    <div class="iqInfo">
     
      <h4>
        {{ selectLang(translationModule.yourChildIQ) }} :
        <span>{{ iqSection?.score }}</span>
        <span>({{
          selectLang(
            iqLevels[
              Math.floor(
                (5 * (iqSection?.score-iqSection?.global_min)/(iqSection?.global_max - iqSection?.global_min+1)
                  ) 
              )
            ]
          )
        }})</span>
      </h4>
    </div>
    
  </div>
</template>

<style scoped>
.container {
  margin-inline:auto ;
}
h4{
    color: var(--text);
    padding-inline: 2rem;
}
span{
    color: var(--accent1);
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
