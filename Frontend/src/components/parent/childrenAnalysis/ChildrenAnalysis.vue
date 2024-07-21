<script setup lang="ts">
import { ref, computed } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
const prop = defineProps(["childId"]);

interface Feature {
  feature: string;
  percentage: number;
}
interface FeaturesGroup {
  name: string;
  features: Feature[];
}
interface AnalysisQuizes {
  title: string;
  featureGtoup: FeaturesGroup[];
}
const elements = ref<FeaturesGroup[]>([]);
const elementsInDetails = ref<AnalysisQuizes[]>([]);
const req = computed(() => {
  elements.value=[]
  elementsInDetails.value=[]
  const childnAlysisRequester = new HttpRequester("get_analysis");
  if (prop.childId) {
    childnAlysisRequester.callApi({ student_id: prop.childId }).then((res) => {
      if (res.success) {
        let analysisQuiz = res.data?.analysis_quiz;
        elements.value.push({
          name: "Personality",
          features: analysisQuiz?.personality?.feature_percentage_list,
        });
        elements.value.push({
          name: "Skills",
          features: analysisQuiz?.skills?.feature_percentage_list,
        });
        elements.value.push({
          name: "Future Steps",
          features: analysisQuiz?.future_steps?.feature_percentage_list,
        });
        console.log(analysisQuiz?.quizes_answered);
        for (let i = 0; i < analysisQuiz?.quizes_answered?.length; i++) {
          const quizRequester = new HttpRequester("get_analysis_quiz_title");
          quizRequester
            .callApi({
              analysis_quiz_id: analysisQuiz?.quizes_answered[i]?.quiz_id,
            })
            .then((res) => {
              if (res.success) {
                let quiz = res?.data?.analysis_quiz;
                elementsInDetails.value?.push({
                  title: quiz?.title,
                  featureGtoup: [
                    {
                      name: "Personality",
                      features:
                        analysisQuiz.quizes_answered[i]?.personality
                          ?.feature_percentage_list,
                    },
                    {
                      name: "Skills",
                      features:
                        analysisQuiz.quizes_answered[i]?.skills
                          ?.feature_percentage_list,
                    },
                    {
                      name: "Future Steps",
                      features:
                        analysisQuiz.quizes_answered[i]?.future_steps
                          ?.feature_percentage_list,
                    },
                  ],
                });
              }
            });
        }
      }
    });
  }
  return null;
});
</script>

<template>
  <div class="constainer" v-if="childId">
    <div class="general">
      <h2>Child Analysis</h2>
      <Accordion>
        <AccordionTab v-for="features in elements">
          <template #header>
            <h3>{{ features.name }}</h3>
          </template>
          <div class="feature-container">
            <div>
              <div class="feature" v-for="feature in features?.features">
                <p>{{ feature.feature }}</p>
                <p
                  :class="{
                    low: feature?.percentage < 50,
                    mid: feature?.percentage < 80 && feature?.percentage >= 50,
                    high: feature?.percentage >= 80,
                  }"
                >
                  {{ feature.percentage }}
                </p>
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="details">
      <h2>Child Analysis Details</h2>
      <Accordion>
        <AccordionTab v-for="quizDetails in elementsInDetails">
          <template #header>
            <h3>{{ quizDetails.title }}</h3>
          </template>
          <div class="general">
            <Accordion>
              <AccordionTab v-for="features in quizDetails.featureGtoup">
                <template #header>
                  <h4>{{ features.name }}</h4>
                </template>
                <div class="feature-container">
                  <div>
                    <div class="feature" v-for="feature in features?.features">
                      <p>{{ feature.feature }}</p>
                      <p
                        :class="{
                          low: feature?.percentage < 50,
                          mid:
                            feature?.percentage < 80 &&
                            feature?.percentage >= 50,
                          high: feature?.percentage >= 80,
                        }"
                      >
                        {{ feature.percentage }}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  </div>
  {{ req }}
</template>

<style scoped>
.constainer {
  width: 80%;
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
h3,h4 {
  color: var(--accent2);
  line-height: 1rem;
  margin-block: 0.25rem;
}
h4{
    color: var(--secondary)
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
.details{
    margin-top: 5rem;
}
</style>
