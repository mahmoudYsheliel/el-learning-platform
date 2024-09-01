<script lang="ts" setup>
import { computed, ref,watch } from "vue";
import { useRoute } from "vue-router";
import { HttpRequester } from "@/lib/APICaller";
import Button from "primevue/button";
import 'primeicons/primeicons.css'
import { selectLang,translationModule } from "@/lib/Translate";


const emit=defineEmits(['next'])
defineProps(['completed'])

const route =useRoute()
const simulation =ref()
const path=computed(()=>{return route.params.materialId})
watch(path,()=>{getsimulation()})
const getsimulation = () => {
  const simulationRequester = new HttpRequester('get_simulation')
  simulationRequester.callApi({simulation_id:route.params.materialId}).then(res=>{if(res.success){
    simulation.value = res.data.simulation
  }})
};
getsimulation();

function markCompleted(){
  const addAnswersRequester = new HttpRequester('add_progress')
  let progres = {
    simulation_progress:{
      simulation_id:route.params.materialId,
      completed_at: new Date().toISOString(),
    },
    material_type:'Simulation'
  }

  addAnswersRequester.callApi({progres:progres,enrolment_id:route.params.enrollmentId}).then(res=>{emit('next',true)})
}
function newWindow(src:string){
window.open(src)
}
</script>

<template>
  <main>
    <div class="container">
      <h2>
        {{selectLang(simulation?.title) }}
      </h2>
      <p>{{selectLang(simulation?.description) }}</p>
      <div class="wrapper" style="cursor: pointer; " @click="()=>{newWindow(simulation?.source)}">
        <h4 style="color: var(--accent2);">{{ selectLang(translationModule.clickToView) }}</h4>
        <img  :src="simulation?.image" />
      </div>
      <Button :disabled="completed" icon="pi pi-check-circle"  :label=selectLang(translationModule.markCompleted) icon-pos="right" @click="markCompleted"/>
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 80%;
  margin-inline: auto;
}

h2 {
  color: var(--accent1);
  margin: 0;
  line-height: 1rem;
  margin-top: 2rem;
  border-bottom: 4px solid var(--accent3);
  width: fit-content;
}
img {
  width: 100%;
  border-radius: 8px;
}
.wrapper {
  margin-top: 2rem;
  width: 75%;
  margin-inline: auto;
}
button{
  font-size: 0.75rem;
}
</style>
