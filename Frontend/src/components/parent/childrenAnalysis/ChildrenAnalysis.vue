<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import { IQScoresMap } from "@/lib/Modules";
import { selectLang, translationModule } from "@/lib/Translate";
import knob from 'primevue/knob';
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Big5Traits from "../childrenAnalysis/Big5Traits.vue";
import Personalities from "../childrenAnalysis/Personalities.vue";
import LearningStyles from "../childrenAnalysis/LearningStyles.vue";
import IQChart from "../childrenAnalysis/IQChart.vue";
import Summary from "../childrenAnalysis/Summary.vue";
const prop = defineProps(["childId"]);
import { track_images } from "@/lib/Modules";
import { usePersonalInfo } from "@/stores/token";
const info = usePersonalInfo()
const analysis = ref();

const IQResult = ref()
const learningStyle = ref()
const recommendTrack = ref()
const IQSection = ref()
function getMaxObject(arr:any[]){
    let tem=arr[0]
    for (let i=0;i<arr.length;i++){
        if (arr[i]?.score > tem?.score){
            tem=arr[i]
        }
    }
    return tem
}
watch(prop, () => {
  const childnAlysisRequester = new HttpRequester("get_analysis");
  IQResult.value = null
  learningStyle.value = null
  recommendTrack.value = null
  if (prop.childId) {
    childnAlysisRequester.callApi({ student_id: prop.childId }).then((res) => {
      if (res?.success) {
        analysis.value = res?.data?.analysis_quiz;
        IQSection.value = analysis.value?.section_results?.find((section: any) => { return section?.section == 'IQ' })?.sub_sections

        IQResult.value = 0
        for (let i = 0; i < IQSection.value.length; i++) {
          IQResult.value += IQSection.value[i]?.total_score
        }
        IQResult.value = Math.round(IQResult.value / IQSection.value.length)
        const bestLearningStyle = getMaxObject(analysis.value?.learning_styles_results)
                console.log(bestLearningStyle)
                new HttpRequester('get_learning_style').callApi({ id: bestLearningStyle?.learning_style_id }).then(res => {
                    learningStyle.value = res?.data?.learning_style
                })

                const bestTrack = getMaxObject(analysis.value?.tracks_recommendation_results)
                new HttpRequester('get_tracks_recommendation').callApi({ id: bestTrack?.tracks_recommendation_id }).then(res => {
                    recommendTrack.value = res?.data?.track_recommendation
                })

      } else {
        analysis.value = null;
      }
    });
  }

});



function getIqDescription(score: number) {


  for (const entry of IQScoresMap) {
    const minScore = entry.min;
    const maxScore = entry.max;

    // Check if score falls within the range
    if ((minScore === null || score >= minScore) && (maxScore === null || score <= maxScore)) {
      return entry.desc;
    }
  }
  return { en: '', ar: '' }
}

const track_image =ref()
 watch((recommendTrack),() => {
  console.log(1)
    for (let i = 0; i < track_images.length; i++) {
       if (recommendTrack.value?.name == track_images[i].name && info.getInfo?.gender==track_images[i].type) {
          track_image.value= track_images[i].path
          return
        }
    }
    
    track_image.value = ''
})
</script>

<template>


  <div class="constainer" v-if="childId">

    <div class="field">
      <h1>{{ selectLang(translationModule.summary) }}</h1>
      <div class="labeled_text">
        <h2><span style="color: var(--text);">{{ selectLang(translationModule.yourChildIQ) }} </span> {{ IQResult }} ({{ selectLang(getIqDescription(IQResult)) }})</h2>

      </div>
      <IQChart v-if="IQSection" :IQChart="IQSection" />
    </div>


    <div style="display: flex; justify-content: start;align-items: start;">
      <div class="field">
        <h1>{{ selectLang(translationModule.learningStyle) }}</h1>
        <h2>{{ selectLang(learningStyle?.title) }}</h2>
        <div class="labeled_text">
          <h3>{{ selectLang(translationModule.styleOverview) }}</h3>
          <p>{{ selectLang(learningStyle?.description) }}</p>
        </div>

        <div class="labeled_text">
          <h3>{{ selectLang(translationModule.supportTips) }}</h3>
          <p>{{ selectLang(learningStyle?.advice) }}</p>
        </div>
      </div>
      <img v-if="learningStyle?.image" :src="learningStyle?.image" style="margin-top: 8rem" alt="">
    </div>


    <div style="display: flex; justify-content: start;align-items: start;">
      <div class="field" >
      <h1>{{ selectLang(translationModule.recommendTracks) }}</h1>
      <h2>{{ selectLang(recommendTrack?.title) }}</h2>

      <div class="labeled_text">
        <h3>{{ selectLang(translationModule.aboutTrack) }}</h3>
        <p>{{ selectLang(recommendTrack?.description) }}</p>
      </div>

      <div class="labeled_text">
        <h3>{{ selectLang(translationModule.guidingPath) }}</h3>
        <p>{{ selectLang(recommendTrack?.advice) }}</p>
      </div>

      <div class="labeled_text">
        <h3>{{ selectLang(translationModule.keySkills) }}</h3>
        <p v-for="skill in recommendTrack?.key_skills">{{ selectLang(skill) }}</p>
      </div>



    </div>
    <img :src="track_image"  style="margin-top: 8rem" alt="">
    </div>
  </div>

</template>

<style scoped>
.constainer {
  width: 95%;
  margin-inline: auto;
  margin-top: 4rem;
}

.field {
  padding-inline: 1rem;
  margin-top: 2rem;
}

.labeled_text {
  padding-inline: 1rem;
  margin-top: 0.5rem;
}

h1 {
  width: fit-content;
  color: var(--accent1);
  margin: 0.25rem;

}

h2,
h3 {
  color: var(--accent2);
  margin: 0.5rem;
  padding-inline: 0.5rem;
}

h3 {
  color: var(--secondary);
}

p {
  margin: 0;
  color: var(--text);
  padding-inline: 1rem;
}
</style>
