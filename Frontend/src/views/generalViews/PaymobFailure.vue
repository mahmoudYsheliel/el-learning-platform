<script setup lang="ts">
import Navbar from '@/components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import { selectLang, translationModule } from '@/lib/Translate';
import Button from 'primevue/button';
import 'primeicons/primeicons.css'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()



</script>


<template>
    <Navbar />
    <div id="thankyou_container">
        <i class="pi pi-times-circle"></i>
        <h1> {{ selectLang(translationModule.tryAgain) }}</h1>
        <p style="color: var(--text);">{{ selectLang(translationModule.enrollFailed) }}</p>
        <Button style="margin-top: 2rem;" :label="selectLang(translationModule.returnHome)" @click="router.push('/')" />

    </div>
    <Footer />

</template>


<style scoped>
#thankyou_container {
    min-height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
}

i {
    font-size: 5rem;
    color: var(--wrongAnswer);
}

h1 {
    font-size: 3rem;
    color: var(--accent1);
}

p,
h1 {
    margin: 0;
}
</style>