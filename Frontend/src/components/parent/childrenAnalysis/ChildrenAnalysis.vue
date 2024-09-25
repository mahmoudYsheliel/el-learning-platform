<script setup lang="ts">
import { ref, computed } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import { selectLang, translationModule } from "@/lib/Translate";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import IQSection from "../childrenAnalysis/IQSection.vue";
import Big5Traits from "../childrenAnalysis/Big5Traits.vue";
import Personalities from "../childrenAnalysis/Personalities.vue";
import LearningStyles from "../childrenAnalysis/LearningStyles.vue";
import Careers from "../childrenAnalysis/Careers.vue";
import Summary from "../childrenAnalysis/Summary.vue";
const prop = defineProps(["childId"]);

const analysis = ref();
const allFeatures = ref();
const allCareers = ref();

new HttpRequester("get_all_features_info").callApi().then((res) => {
  if (res?.success) {
    allFeatures.value = res?.data?.features_info;
  }
});
new HttpRequester("get_all_careers").callApi().then((res) => {
  if (res?.success) {
    allCareers.value = res?.data?.careers?.careers;
  }
});
const req = computed(() => {
  const childnAlysisRequester = new HttpRequester("get_analysis");
  if (prop.childId) {
    childnAlysisRequester.callApi({ student_id: prop.childId }).then((res) => {
      if (res?.success) {
        analysis.value = res?.data?.analysis_quiz;
      } else {
        analysis.value = null;
      }
    });
  }
  return null;
});

const analysisDataObject = computed(() => {
  if (!analysis.value) {
    return null;
  }
  let obj = {
    iq: {
      title: {
        en: "IQ evalusation",
        ar: "مستوي الذكاء",
      },
      sections: <any[]>[],
    },
    big5Traits: {
      title: {
        en: "Big Five Personality Traits",
        ar: "سمات الشخصية الخمس الكبرى",
      },
      sections: <any[]>[],
    },
    personality: {
      title: {
        en: "Personality",
        ar: "الشخصية",
      },
      sections: <any[]>[],
    },
    learningStyle: {
      title: {
        en: "Learning Styles",
        ar: "أنماط التعلم",
      },
      sections: <any[]>[],
    },
    careers: {
      title: {
        en: "Possible Careers",
        ar: " مهن مقترحة",
      },
      sections: <any[]>[],
    },
  };

  for (let section of analysis.value?.iq_results) {
    let name = section?.feature_name;
    obj.iq.sections.push({
      name: name,
      feature_name: section?.feature_name,
      score: section?.score,

      title: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.title,
      description: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.description,
      global_min: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.global_min,
      global_max: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.global_max,
    });
  }
  for (let section of analysis.value?.big5traits_results) {
    let name = section?.feature_name;
    obj.big5Traits.sections.push({
      name: name,
      feature_name: section?.feature_name,
      score: section?.score,

      title: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.title,
      description: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.description,
      global_min: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.global_min,
      global_max: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.global_max,
    });
  }
  for (let section of analysis.value?.enneagram_results) {
    let name = section?.feature_name;
    obj.personality.sections.push({
      name: name,
      feature_name: section?.feature_name,
      score: section?.score,

      title: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.title,
      description: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.description,
      global_min: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.global_min,
      global_max: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.global_max,
    });
  }
  for (let section of analysis.value?.learning_styles_results) {
    let name = section?.feature_name;
    obj.learningStyle.sections.push({
      name: name,
      feature_name: section?.feature_name,
      score: section?.score,

      title: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.title,
      description: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.description,
      global_min: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.global_min,
      global_max: allFeatures.value?.find((feature: any) => {
        return feature?.name == name;
      })?.global_max,
    });
  }

  for (let section of analysis.value?.possible_careers) {
    let name = section?.career_name;
    obj.careers.sections.push({
      name: section?.career_name,
      feature_name: section?.career_name,
      percentage: section?.percentage,

      title: allCareers.value?.find((feature: any) => {
        return feature?.name == name;
      })?.title,
      description: allCareers.value?.find((feature: any) => {
        return feature?.name == name;
      })?.description,
    });
  }

  return obj;
});
</script>

<template>
  <div class="constainer" v-if="childId">
    <h2>{{ selectLang(translationModule.childAnalysis) }}</h2>
    <div v-if="analysisDataObject">
      <Accordion :activeIndex="0">
        <AccordionTab>
          <template #header>
            <h3 style="color: var(--accent1)">
              {{ selectLang(translationModule.summary) }}
            </h3>
          </template>
          <Summary
            :iq-score="analysisDataObject.iq.sections[0]"
            :dominant-trait="
              analysisDataObject.big5Traits.sections.reduce((max, obj) => {
                return obj.score > max.score ? obj : max;
              }, analysisDataObject.big5Traits.sections[0])
            "
            :personality="
              analysisDataObject.personality.sections.reduce((max, obj) => {
                return obj.score > max.score ? obj : max;
              }, analysisDataObject.personality.sections[0])
            "
            :learning-style="
              analysisDataObject.learningStyle.sections.reduce((max, obj) => {
                return obj.score > max.score ? obj : max;
              }, analysisDataObject.learningStyle.sections[0])
            "
            :best-carer="
              analysisDataObject.careers.sections.reduce((max, obj) => {
                return obj.percentage > max.percentage ? obj : max;
              }, analysisDataObject.careers.sections[0])
            "
          />
        </AccordionTab>

        <AccordionTab>
          <template #header>
            <h3 style="color: var(--accent1)">
              {{ selectLang(analysisDataObject.iq.title) }}
            </h3>
          </template>
          <IQSection :iqSection="analysisDataObject.iq.sections[0]" />
        </AccordionTab>

        <AccordionTab>
          <template #header>
            <h3 style="color: var(--accent1)">
              {{ selectLang(analysisDataObject.big5Traits.title) }}
            </h3>
          </template>
          <Big5Traits :traits="analysisDataObject.big5Traits" />
        </AccordionTab>

        <AccordionTab>
          <template #header>
            <h3 style="color: var(--accent1)">
              {{ selectLang(analysisDataObject.personality.title) }}
            </h3>
          </template>
          <Personalities :traits="analysisDataObject.personality" />
        </AccordionTab>

        <AccordionTab>
          <template #header>
            <h3 style="color: var(--accent1)">
              {{ selectLang(analysisDataObject.learningStyle.title) }}
            </h3>
          </template>
          <LearningStyles :traits="analysisDataObject.learningStyle" />
        </AccordionTab>

        <AccordionTab>
          <template #header>
            <h3 style="color: var(--accent1)">
              {{ selectLang(analysisDataObject.careers.title) }}
            </h3>
          </template>
          <Careers :careers="analysisDataObject.careers" />
        </AccordionTab>
      </Accordion>
    </div>
  </div>
  {{ req }}
</template>

<style scoped>
.constainer {
  width: 95%;
  margin-inline: auto;
  margin-top: 2rem;
}
.feature-container {
  padding-inline: 1rem;
}
h2 {
  width: fit-content;
  color: var(--accent1);
  border-bottom: 0.25rem solid var(--accent3);
  line-height: 1.5rem;
}
h3,
h4 {
  color: var(--accent2);
  line-height: 1rem;
  margin-block: 0.25rem;
}
h4 {
  color: var(--secondary);
}
p {
  margin: 0;
  color: var(--text);
}
.feature {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-inline: auto;
  border-bottom: 4px solid var(--choiceBackgroundColor);
}
.low {
  color: var(--wrongAnswer);
}
.mid {
  color: var(--accent3);
}
.high {
  color: var(--correctAnswer);
}
.details {
  margin-top: 5rem;
}
</style>
