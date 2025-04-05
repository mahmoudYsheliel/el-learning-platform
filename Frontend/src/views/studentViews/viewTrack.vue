<script lang="ts" setup>
import Button from "primevue/button";
import { useRouter, useRoute } from "vue-router";
import { selectLang, translationModule } from "@/lib/Translate";
import { computed, ref } from "vue";
import { HttpRequester } from "@/lib/APICaller";
import Navbar from "@/components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import "primeicons/primeicons.css";
import CourseCard from "@/components/general/CourseCard.vue";
import TrackContent from "@/components/general/TrackContent.vue";




const route = useRoute();
const router = useRouter();
const program = ref()
const track = ref()
const programRequester = new HttpRequester('get_program')
const coursesRequester = new HttpRequester('get_courses')
const levels = ref<any[]>([])

programRequester.callApi({ program_id: route.params?.programId }).then(res => {
    if (res?.data) {
        program.value = res?.data?.program
        track.value = program.value?.tracks[Number(route.params?.trackId)]
        coursesRequester.callApi().then(res => {

            if (res?.data) {
                const courses = res?.data?.courses
                for (let i = 0; i < track.value?.levels?.length; i++) {
                    let level = { title: track.value?.levels[i].title, coursesCount: 0, courses: <any[]>[] }
                    for (let j = 0; j < track.value?.levels[i]?.courses?.length; j++) {
                        const course = courses?.find((course: any) => {
                            return course?.id == track.value.levels[i].courses[j]
                        })
                        track.value.levels[i].courses[j] = course
                        level.courses.push(course)
                        level.coursesCount = level.coursesCount + 1
                    }
                    levels.value.push(level)
                }

                for (let i = 0; i < track.value?.courses?.length; i++) {
                    track.value.courses[i] = courses?.find((course: any) => {
                        return course?.id == track.value?.courses[i]
                    })

                }
            }

        })
    }
})





</script>

<template>




    <Navbar />
    <div class="track-container">
        <h1>{{ selectLang(track?.title) }}</h1>
        <div class="track_video">
            <iframe class="video" v-if="track?.video" :src="track?.video" frameborder="0" sandbox="allow-scripts allow-same-origin" allowfullscreen></iframe>
            <img class="video" style="aspect-ratio: 3/2;" :src="track?.image" v-else alt="">
            <div class="track_content">
                <TrackContent :levels="levels" />
            </div>
        </div>
        <div class="track_overview">
            <h2>{{ selectLang(translationModule.trackOverview) }}</h2>
            <p style="width: 66% ;">{{ selectLang(track?.description) }}</p>
        </div>
        <div class="levels_container">
            <h2 v-if="track?.title?.en == 'Robotics Track'">{{ selectLang(translationModule.phases) }}</h2>
            <h2 v-else>{{ selectLang(translationModule.levels) }}</h2>
            <div v-for="level, i in track?.levels">
                <div class="level">
                    <h3>{{ selectLang(level?.title) }} </h3>
                    <div style="display: flex;flex-direction: column;width: 100%;justify-content: center;align-items: center;">
                        <div class="courses_container" style="margin-block: 2rem;">
                            <CourseCard v-for="course in level?.courses" :course="course" search="" :width="'18rem'" />
                            <div style="width: 100%;;text-align: center;font-weight: bolder;font-size: 4rem;background: radial-gradient(var(--accent5),var(--accent1));background-clip: text;color: transparent;" v-if="level.courses.length == 0">{{ selectLang(translationModule.commingSoon) }}</div>
                        </div>
                        <div class="level-breaker" v-if="i != track?.levels?.length - 1"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="courses_tracks_container" v-if="track?.courses.length > 0">
            <h2>{{ selectLang(translationModule.courses) }}</h2>
            <div class="courses_tracks">
                <CourseCard v-for="course in track?.courses" :course="course" search="" />
            </div>
        </div>
    </div>
    <Footer />
</template>

<style scoped>
p {
    color: var(--text);
    margin: 0;
}

h3 {
    color: var(--accent3);
    font-size: 1.5rem;
    line-height: 3.25rem;

}

.level-breaker {
    height: 4px;
    width: 60%;
    margin-inline: auto;
    background-color: var(--accent1);
}

.video {
    width: 100%;
    aspect-ratio: 1.75/1;
    margin-top: 0.5rem;
    border-radius: 0.25rem;
}

.track_content {
    display: flex;
    align-items: center;
    flex-direction: column;

}

.track_content>img {
    width: 50%;
    margin-inline: auto;
    border-radius: 100%;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 12px;
    padding: 0.5rem;
}

.track_video {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 2rem;

}

.courses_container {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    padding-bottom: 1rem;
}

.level {
    padding-inline: 1rem;
    display: grid;
    grid-template-columns: 1fr;

    align-items: center;

}

h3 {
    text-wrap: wrap;
}

h2 {
    color: var(--accent1);
    margin-top: 2rem;
    font-size: 1.75rem;
}

.courses_tracks {
    display: flex;
    gap: 2rem;
    max-width: 95%;
    padding-bottom: 1rem;
    margin-bottom: 5rem;
    margin-inline: auto;
    overflow-x: auto;
}

h1 {
    color: var(--accent2);
}

.track-container {
    padding-inline: 3rem;
    padding-top: 2rem;
}

@media screen and (max-width:1200px) {
    .track_video {
        display: flex;
        flex-direction: column;
    }

    .track-container {
        padding-inline: 2rem;
        padding-top: 2rem;
    }

    .courses_container {
        flex-wrap: wrap;
    }
}
</style>