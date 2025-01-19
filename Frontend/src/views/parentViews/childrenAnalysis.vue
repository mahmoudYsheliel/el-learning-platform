<script lang="ts" setup>
import ParentSidebar from '../../components/parent/general/ParentSidebar.vue'
import Navbar from '../../components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import SelectChild from '@/components/parent/parentProfile/SelectChild.vue'
import ChildrenAnalysis from '@/components/parent/childrenAnalysis/ChildrenAnalysis.vue'
import PrintReport from '@/components/parent/childrenAnalysis/PrintReport.vue';
import Button from 'primevue/button';
import { ref,watch } from "vue";
import { selectLang, translationModule } from '@/lib/Translate';
import { HttpRequester } from '@/lib/APICaller';


const selectedChild = ref(null)

const file = ref<HTMLElement>()
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

function printComponent() {
    window.print()
    return
    const pdf = new jsPDF();
    const scale = 1;

    if (!file.value)
        return
    html2canvas(file.value, {
        scale,
        useCORS: true
    }).then(canvas => {
        if (!file.value)
            return
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        while (heightLeft > 0) {
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            position -= pageHeight;
            if (heightLeft > 0) pdf.addPage();
        }

        // Convert PDF to Base64 string
        const pdfBase64 = pdf.output('datauristring');
        new HttpRequester('send_page').callApi({
            request: {
                html_content:'',
                image_base64: pdfBase64,
                recipient: "s-mahmoud.sheliel@zewailcity.edu.eg",
                subject: "Your Page PDF",
                body: "Attached is the PDF version of the page.",
            }
        }).then(res => {
            console.log(res)
        })
    })


}
</script>

<template>
    <Navbar class="no_print" />
    <div ref="file">
        <div class="print_only">
            <div class="report_header ">
                <img src="/public/images/logo4.png" alt="">
                <div class="report_title">
                    <h2 style="color: black;">IQ SCORE REPORT</h2>
                    <h4 style="color: var(--accent1);">TRACE EDUCATION COMPANY</h4>
                </div>
            </div>
        </div>

        <div class="container">
            <ParentSidebar class="sidebar no_print" selected="childAnalysis" />
            <div class="wrapper ">

                <SelectChild class="print" @selected-child="id => selectedChild = id" />
                <PrintReport class="print_only" :child-id="selectedChild" />
                <ChildrenAnalysis class="no_print" :child-id="selectedChild" />
                <div class="button-container no_print">
                    <Button style="width: 6rem;" v-if="selectedChild" @click="printComponent" :label="selectLang(translationModule.print)" />
                </div>
            </div>

        </div>
    </div>


    <Footer class="no_print" />

</template>

<style scoped>
.button-container {
    padding-inline: 4rem;
    display: flex;
    justify-content: end;
}

.container {
    display: grid;
    grid-template-columns: 12rem 1fr;
    min-height: 100vh;

}

.wrapper {
    margin-top: 5rem;
    margin-bottom: 5rem;
}

.print_only {
    display: none;
}

@media screen and (max-width: 1000px) {
    .container {
        grid-template-columns: 90vw;
        min-height: 100vh;
    }

    .sidebar {
        display: none;
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