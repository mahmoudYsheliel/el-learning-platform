<script lang="ts" setup>
import IQDescruption from '@/lib/IQDescription.json'
import { track_images } from '@/lib/Modules';
import { selectLang, translationModule } from '@/lib/Translate';
import { ref, watch, onMounted, computed } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import { IQScoresMap } from "@/lib/Modules";
import IQNames from '@/lib/IQNames.json'
import knob from 'primevue/knob';
import ProgressBar from 'primevue/progressbar';
const prop = defineProps(["childId"]);
import { usePersonalInfo } from '@/stores/token';

const info = usePersonalInfo()
const analysis = ref();

const IQResult = ref()
const learningStyle = ref()
const recommendTrack = ref()
const IQSection = ref<any[]>([])

const section1 = ref()
const section2 = ref()
const section3 = ref()
const section4 = ref()
const section5 = ref()

const emits = defineEmits(['sections'])
function getMaxObject(arr: any[]) {
    let tem = arr[0]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]?.score > tem?.score) {
            tem = arr[i]
        }
    }
    return tem
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

                const bestLearningStyle = getMaxObject(analysis.value?.learning_styles_results)

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
        emits('sections', [section1.value, section2.value, section3.value, section4.value, section5.value])
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
type subsets = 'Vocabulary' | 'Similarities' | 'Visual Puzzles' | 'Matrix Reasoning' | 'Figure Weights' | 'Digit Span' | 'Symbol Search'
function fetchComment(subset: subsets, score: number) {
    if (!IQDescruption[subset])
        return ''
    for (let i = 0; i < IQDescruption[subset].length; i++) {
        if (IQDescruption[subset][i].max_score >= score && IQDescruption[subset][i].min_score <= score) {
            return selectLang(IQDescruption[subset][i].comment)
        }
    }
}

const track_image = computed(() => {
    const userType = info.getInfo?.gender ? info.getInfo?.gender : 'Male'
    console.log(track_images,recommendTrack.value?.name,userType)
      
    for (let i = 0; i < track_images.length; i++) {
        if (recommendTrack.value?.name == track_images[i].name && userType == track_images[i].type) {
            return track_images[i].path
        }
    }
    return track_images[0].path
})

</script>


<template>
    <div class="print_only ">
        <div class="section" ref="section1">
            <div class="field">
                <h2>{{ selectLang(translationModule.intro) }}</h2>
                <p>{{ selectLang(translationModule.analysisReportIntro) }}</p>
            </div>
            <div class="field">
                <h2>{{ selectLang(translationModule.purpose) }}</h2>
                <p>{{ selectLang(translationModule.analysisReportPurpose) }}</p>
            </div>
        </div>

        <div class="section" ref="section2">
            <div class="field">
                <h2>{{ selectLang(translationModule.detailed) }}</h2>
                <p>{{ selectLang(translationModule.analysisReportDetail) }}</p>
            </div>
            <div class="summary ">
                <div class="overall ">
                    <div class="score ">
                        {{ IQResult }}
                    </div>
                    <h3 style="color: var(--header);">Overall Score</h3>
                </div>

                <div class="scores ">
                    <div v-for="section in IQSection" class="subset_score">
                        <knob :min="40" :max="160" :modelValue="section.total_score" style="display: inline;" :size="120" />
                        <h4 style="margin: 0; translate:0 -0.75rem ;">{{ section.name }}</h4>
                    </div>
                </div>
            </div>

            <div class="new-page"></div>
            <div v-for="section in IQSection.slice(0, 2)">
                <div style="display: flex;justify-content: space-between; flex-direction: column;">
                    <div class="field">
                        <h2>{{ selectLang(IQNames[section.name as subsets]) }} ({{ section.total_score }}/160):</h2>
                        <p>{{ fetchComment(section.name, section.total_score) }}</p>
                    </div>
                    <ProgressBar :value="(section.total_score - 40) / 120 * 100" style="display: block;width: 80%;margin-top: 1rem;height: 1rem;margin-inline: auto;" :size="12" />
                </div>
            </div>
        </div>





        <div class="section" ref="section3">
            <div v-for="section in IQSection.slice(2, IQSection.length)">
                <div style="display: flex;justify-content: space-between; flex-direction: column;">
                    <div class="field">
                        <h2>{{ selectLang(IQNames[section.name as subsets]) }} ({{ section.total_score }}/160):</h2>
                        <p>{{ fetchComment(section.name, section.total_score) }}</p>
                    </div>
                    <ProgressBar :value="(section.total_score - 40) / 120 * 100" style="display: block;width: 80%;margin-top: 1rem;height: 1rem;margin-inline: auto;" :size="12" />
                </div>
            </div>
        </div>

        <div class="new-page"></div>
        <div class="section" ref="section4">

            <div class="field">
                <h2>{{ selectLang(translationModule.cognitiveStrengthTitle) }}</h2>
                <p>{{ selectLang(translationModule.cognitiveStrengthDesc) }}</p>
            </div>

            <div class="field">
                <h2>{{ selectLang(translationModule.shortTermGoalsTitle) }}</h2>
                <p>{{ selectLang(translationModule.shortTermGoalsDesc) }}</p>
            </div>

            <div class="field">
                <h2>{{ selectLang(translationModule.longTermLearningPathwayTitle) }}</h2>
                <p>{{ selectLang(translationModule.longTermLearningPathwayDesc) }}</p>
            </div>



        </div>

        <div class="section" ref="section5">
            <div style="display: flex; justify-content: start;align-items: start;">
                <div class="field">
                    <h2>{{ selectLang(translationModule.learningStyle) }} <span style="padding-left: 1rem; color: var(--header);">{{ selectLang(learningStyle?.title) }}</span> </h2>
                    <div class="labeled_text">
                        <h3>{{ selectLang(translationModule.styleOverview) }}</h3>
                        <p>{{ selectLang(learningStyle?.description) }}</p>
                    </div>

                    <div class="labeled_text">
                        <h3>{{ selectLang(translationModule.supportTips) }}</h3>
                        <p>{{ selectLang(learningStyle?.advice) }}</p>
                    </div>
                </div>
                <img v-if="learningStyle?.image" :src="learningStyle?.image" style="margin-top: 4rem;width: 12rem;aspect-ratio: 1/1;" alt="">
            </div>


            <div style="display: flex; justify-content: start;align-items: start;">
                <div class="field">

                    <h2>{{ selectLang(translationModule.recommendTracks) }} <span style="padding-left: 1rem; color: var(--header);">{{ selectLang(recommendTrack?.title) }}</span> </h2>

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
                <img :src="track_image" style="margin-top: 8rem" alt="">
            </div>
        </div>



    </div>
</template>

<style scoped>
.section {
    padding: 1rem;
}

.subset_score {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.scores {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr !important;

}

.score {
    font-size: 5rem !important;
    font-weight: bolder;
    color: var(--accent1);
    padding: 2rem !important;
    aspect-ratio: 1/1 !important;
    border-radius: 100% !important;
    background-color: var(--primary);
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin-inline: auto !important;

}

.overall {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.summary {
    display: grid !important;
    grid-template-columns: 1fr 2fr !important;

    background-color: var(--choiceBackgroundColor);
    border-radius: 1rem;
    padding: 2rem;
    width: 90%;
}


.field {
    padding-inline: 1rem;
    margin-top: 2rem;
}

.labeled_text {
    padding-inline: 1rem;
    margin-top: 0.5rem;
}

h2 {
    width: fit-content;
    color: var(--accent1);
    margin: 0.25rem;

}

h2,
h3 {
    color: var(--accent1);
    margin-block: 0.25rem;
}

h3 {
    color: var(--secondary);
}

p {
    margin: 0;
    color: var(--text);
    padding-inline: 1rem;
}

@media print {
    .print_only {
        display: block !important;
        visibility: visible !important;
        width: 95% !important;
        margin-inline: auto !important;
    }

    .new-page {
        page-break-before: always;
        /* Force content to start on a new page */
    }
}
img{
    width: 32%;
    min-width: 15rem;
}

@media (max-width:750px) {
    img {
        display: none;
    }

    .scores {
        display: flex !important;
        flex-wrap: wrap !important;
        justify-content: space-between;
        align-items: center;
    }
}

@media screen and (max-width:1200px) {
    .summary {
        display: grid;
        grid-template-columns: auto !important;
        grid-template-rows: 1fr auto !important;
    }
}
</style>
