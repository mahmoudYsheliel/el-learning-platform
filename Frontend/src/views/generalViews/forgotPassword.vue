<script setup lang="ts">
import Navbar from '@/components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InputOtp from 'primevue/inputotp';
import Button from 'primevue/button';
import { ref } from 'vue';
import { selectLang,translationModule } from '@/lib/Translate';



const email = ref()
const pass = ref()
const confirmPass = ref()
const OTP = ref()
const stage = ref('email') // OTP , pass  

</script>

<template>
<Navbar />
<div class="container">
    <div class="email_stage">
        <InputText :placeholder="selectLang(translationModule.email)"/>
        <Button @click="" :label="selectLang(translationModule.next)"/>
    </div>

</div>


<Footer />

</template>


<style scoped>
.email_stage{
    width: fit-content;
    height: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: end;
    gap: 1rem;
}
.container{
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4rem;
}

</style>