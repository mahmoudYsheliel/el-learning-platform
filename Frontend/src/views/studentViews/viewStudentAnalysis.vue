<script lang="ts" setup>
import ParentSidebar from '../../components/parent/general/ParentSidebar.vue'
import Navbar from '../../components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import ChildrenAnalysis from '@/components/parent/childrenAnalysis/ChildrenAnalysis.vue'
import PrintReport from '@/components/parent/childrenAnalysis/PrintReport.vue';
import Button from 'primevue/button';
import { ref, watch } from "vue";
import { selectLang, translationModule } from '@/lib/Translate';
import { usePersonalInfo } from "@/stores/token";
import ChildSidebar from "../../components/general/ChildSidebar.vue";
import { useRouter } from 'vue-router';

const router = useRouter()
const info = usePersonalInfo()
const selectedChild = ref(info.getInfo?.id)

const file = ref<HTMLElement>()

function printComponent() {
    window.print()

}
</script>

<template>
    <div>
        <Navbar class="no_print" />
        <div ref="file">
            <div class="print_only">
                <div class="report_header ">
                    <img src="/public/images/logo4.png" alt="">
                    <div class="report_title">
                        <h2 style="color: black;">{{ selectLang(translationModule.IQReport) }}</h2>
                        <h4 style="color: var(--accent1);"></h4>
                    </div>
                </div>
            </div>

            <div class="container">
                <ChildSidebar class="sidebar no_print" selected="analysis" />
                <div class="wrapper ">

                    <PrintReport class="print_only" :child-id="selectedChild" />
                    <ChildrenAnalysis class="no_print" :child-id="selectedChild" />


                    <div class="button-container no_print" >  
                        <Button style="padding-inline: 2rem;" v-if="selectedChild" @click="router.push('viewChildAnalysis')" :label="selectLang(translationModule.viewFullReport)" />
                        <Button style="padding-inline: 2rem;" v-if="selectedChild" @click="printComponent" :label="selectLang(translationModule.print)" />
                    </div>

                </div>



            </div>
        </div>


        <Footer class="no_print" />


    </div>

</template>

<style scoped>
.button-container {
    padding-inline: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.container {
    display: grid;
    grid-template-columns: 12rem 1fr;
    min-height: 100vh;

}

.wrapper {
    margin-block: 4rem;
}

.print_only {
    display: none;
}

@media screen and (max-width: 1000px) {
    .container {
        grid-template-columns: 100vw;
        min-height: 100vh;
    }

    .sidebar {
        display: none;
    }
    .b1{
        flex-direction: column;
    }
}


@media print {
    .no_print {
        display: none;
    }

    .wrapper {
        margin-top: 0rem;
        margin-bottom: 5rem;
    }

    .print_only {
        display: block !important;
    }

    .container {
        display: block;
    }

    .report_header {
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
    }

    .report_title h2,
    .report_title h4 {
        text-align: center;
        margin: 0;
    }

    @page {
        size: 1000px 1600px;
        /* A4 size (in mm) */
        margin: 20mm;
        /* Adjust margins */
    }
}
</style>