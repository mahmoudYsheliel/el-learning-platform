<script lang="ts" setup>
import Navbar from '../../components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import PrintReport from '@/components/parent/childrenAnalysis/PrintReport.vue';
import Button from 'primevue/button';
import { ref, onMounted } from "vue";
import { HttpRequester } from '@/lib/APICaller';
import { usePersonalInfo } from '@/stores/token';
import axios from 'axios';
const Info = usePersonalInfo()
const selectedChild = ref()
const file = ref<HTMLElement>()
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { selectLang, translationModule } from '@/lib/Translate';
import { useRouter } from 'vue-router';
const router = useRouter()
onMounted(() => {
    selectedChild.value = Info.getInfo?.id
})

async function printComponent(sections: HTMLElement[]) {
    // window.print()

    const pdf = new jsPDF();
    const scale = 1;
    let firstPageShift = 0
    if (!file.value)
        return
    await html2canvas(file.value, {
        scale,
        useCORS: true
    }).then(canvas => {
        if (!file.value)
            return
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        firstPageShift = imgHeight
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    })
    for (let i = 0; i < sections.length; i++) {
        await html2canvas(sections[i], {
            scale,
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            if (i == 0) {
                pdf.addImage(imgData, 'PNG', 0, firstPageShift + 10, imgWidth, imgHeight);
            }
            else {
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }
            if (i != sections.length - 1) {
                pdf.addPage();
            }

        })
    }

    // Convert PDF to Base64 string
    const pdfBase64 = pdf.output('datauristring');
    new HttpRequester('send_page').callApi({
        request: {
            html_content: '',
            image_base64: pdfBase64,
            recipient: 's-mahmoud.sheliel@zewailcity.edu.eg',
            subject: "Webpage PDF",
            body: 'str',
        }
    })
}
</script>

<template>
    <Navbar class="no_print" />
    <div class="container">
        <div class="report_header" ref="file">
            <img src="/public/images/logo4.png" alt="">
            <div class="report_title">
                <h2 style="color: black;">IQ SCORE REPORT</h2>
                <h4 style="color: var(--accent1);">TRACE EDUCATION COMPANY</h4>
            </div>
        </div>
        <div class="wrapper ">
            <PrintReport class="print_only" :child-id="selectedChild" @sections="(sections) => { printComponent(sections) }" />
        </div>
        <div style="display: flex; justify-content: end;">
            <Button :label="selectLang(translationModule.returnHome)" icon="pi pi-home" @click="router.push('/')"/>
  
        </div>
    </div>
    <Footer class="no_print" />
</template>

<style scoped>
.container {
    margin-inline: auto;
    padding: 1.5rem;
}

.button-container {
    padding-inline: 4rem;
    display: flex;
    justify-content: end;
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

.wrapper {
    margin-top: 5rem;
    margin-bottom: 5rem;
}


</style>