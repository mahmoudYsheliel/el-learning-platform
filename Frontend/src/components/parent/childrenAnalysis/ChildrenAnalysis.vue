<script setup lang="ts">
import { ref, watch } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import { IQScoresMap } from "@/lib/Modules";
import { selectLang, translationModule } from "@/lib/Translate";
import IQChart from "../childrenAnalysis/IQChart.vue";
import Button from "primevue/button";
const prop = defineProps(["childId"]);
import { track_images } from "@/lib/Modules";
import { usePersonalInfo } from "@/stores/token";
import { useRouter } from "vue-router";
const info = usePersonalInfo()
const analysis = ref();
const router = useRouter()
const IQResult = ref()
const learningStyle = ref()
const recommendTrack = ref()
const recommendTrack2 = ref()
const recommendTrack3 = ref()
const selectedTrack = ref<any | null>(null)
const IQSection = ref()
function getBestIndex(arr: any[], rank: number = 1) {
  if (!Array.isArray(arr) || arr.length === 0 || rank < 1 || rank > arr.length) {
    return null
  }

  // Create an array of indices sorted by score descending
  const sortedIndices = arr
    .map((_, index) => index)
    .sort((a, b) => (arr[b]?.score ?? -Infinity) - (arr[a]?.score ?? -Infinity));
  return arr[sortedIndices[rank - 1]];
}
function getAnalysis() {
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
        const bestLearningStyle = getBestIndex(analysis.value?.learning_styles_results)

        new HttpRequester('get_learning_style').callApi({ id: bestLearningStyle?.learning_style_id }).then(res => {
          learningStyle.value = res?.data?.learning_style
        })

        const bestTrack = getBestIndex(analysis.value?.tracks_recommendation_results)
        new HttpRequester('get_tracks_recommendation').callApi({ id: bestTrack?.tracks_recommendation_id }).then(res => {
          recommendTrack.value = res?.data?.track_recommendation
          selectedTrack.value = res?.data?.track_recommendation
        })
        const bestTrack2 = getBestIndex(analysis.value?.tracks_recommendation_results, 2)
        new HttpRequester('get_tracks_recommendation').callApi({ id: bestTrack2?.tracks_recommendation_id }).then(res => {
          recommendTrack2.value = res?.data?.track_recommendation
        })
        const bestTrack3 = getBestIndex(analysis.value?.tracks_recommendation_results, 3)
        new HttpRequester('get_tracks_recommendation').callApi({ id: bestTrack3?.tracks_recommendation_id }).then(res => {
          recommendTrack3.value = res?.data?.track_recommendation
        })

      } else {
        analysis.value = null;
      }
    });
  }


}
watch(prop, () => {
  getAnalysis()
});

getAnalysis()

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

const track_image = ref()
watch((recommendTrack), () => {
  for (let i = 0; i < track_images.length; i++) {
    if (recommendTrack.value?.name == track_images[i].name && info.getInfo?.gender == track_images[i].type) {
      track_image.value = track_images[i].path
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


    <div class="section" style="display: flex; justify-content: start;align-items: start;">
      <div class="field">
        <h1>{{ selectLang(translationModule.learningStyle) }}</h1>
        <h2>{{ selectLang(learningStyle?.title) }}</h2>
        <img v-if="learningStyle?.image" :src="learningStyle?.image" style="margin-top: 8rem" alt="">
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


    <div class="section" style="display: flex; justify-content: start;align-items: start;">

      <div style="width: 100%;">

        <h1>{{ selectLang(translationModule.recommendTracks) }}</h1>
        <div class="tracks_images">
          <img :class="{notSelectedTrack:(selectedTrack?.name !== recommendTrack?.name)}" @click="selectedTrack = recommendTrack" :src="selectLang(recommendTrack?.image)" alt="">
          <img :class="{notSelectedTrack:(selectedTrack?.name !== recommendTrack2?.name)}" @click="selectedTrack = recommendTrack2" :src="selectLang(recommendTrack2?.image)" alt="">
          <img :class="{notSelectedTrack:(selectedTrack?.name !== recommendTrack3?.name)}" @click="selectedTrack = recommendTrack3" :src="selectLang(recommendTrack3?.image)" alt="">
        </div>
        <div v-if="selectedTrack">
          <h2>{{ selectLang(selectedTrack?.title) }}</h2>
          <div class="labeled_text">
            <h3>{{ selectLang(translationModule.aboutTrack) }}</h3>
            <p>{{ selectLang(selectedTrack?.description) }}</p>
          </div>

          <div class="labeled_text">
            <h3>{{ selectLang(translationModule.guidingPath) }}</h3>
            <p>{{ selectLang(selectedTrack?.advice) }}</p>
          </div>

          <div class="labeled_text">
            <h3>{{ selectLang(translationModule.keySkills) }}</h3>
            <p v-for="skill in selectedTrack?.key_skills">{{ selectLang(skill) }}</p>
          </div>

          <div class="button-container b1 no_print" style="margin: 2rem;">
            <p style="font-weight: bolder;font-size: 1.25rem;color: var(--header);">{{ selectLang(translationModule.startTraceJourney) }}</p>

            <Button class="no_print" @click="router.push(`/programs/${selectedTrack.program_id}`)" :label="selectLang(translationModule.clickToView)" style="background-image: linear-gradient(to bottom, var(--accent2), var(--accent5));" />
          </div>

        </div>


      </div>
    </div>

  </div>

</template>

<style scoped>
.notSelectedTrack {
  opacity: 0.6;
}

.constainer {
  width: 95%;
  margin-inline: auto;
  margin-top: 4rem;
}

.tracks_images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

.tracks_images img {
  border-radius: 2rem;
  cursor: pointer;
  width: 20rem;
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

img {
  width: 32%;
  min-width: 15rem;
}

.field>img {
  display: none;
}
.button-container {
    padding-inline: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


@media screen and (max-width:700px) {
  .section>img {
    display: none !important;
  }

  .field>img {
    display: block;
    padding: 0 !important;
    margin: 0 !important;
    margin-inline: auto !important;
  }
}
</style>
