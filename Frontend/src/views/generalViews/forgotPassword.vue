<script setup lang="ts">
import Navbar from '@/components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InputOtp from 'primevue/inputotp';
import Button from 'primevue/button';
import { ref } from 'vue';
import { selectLang, translationModule } from '@/lib/Translate';



const email = ref()
const pass = ref()
const confirmPass = ref()
const OTP = ref()
const stage = ref('OTP') // email , OTP , pass  , success

</script>

<template>
    <Navbar />
    <div class="container">
        <div class="email_stage" v-if="stage == 'email'">
            <div class="email_stage_wrapper">
                <h3 class="header">{{ selectLang(translationModule.forgeotPass) }}</h3>
                <p>{{ selectLang(translationModule.enterEmail) }}</p>
                <InputText :placeholder="selectLang(translationModule.email)" />
                <Button @click="" :label="selectLang(translationModule.next)" />
            </div>
        </div>
        <div class="otp_stage" v-if="stage == 'OTP'">
            <div class="email_stage_wrapper">
                <h3 class="header">{{ selectLang(translationModule.verification) }}</h3>
                <p>{{ selectLang(translationModule.enterCode) }}</p>
                <InputOtp v-model="OTP" style="align-self: center;" />
                <Button @click="" :label="selectLang(translationModule.next)" />
                <span style="align-self: center;color: var(--text);">{{ selectLang(translationModule.didnotReceive) }}
                    <strong style="cursor: pointer;color: var(--accent1);">{{ selectLang(translationModule.resend) }}</strong>
                </span>
            </div>
        </div>
        <div class="rest_pass" v-if="stage == 'pass'">
            <div class="email_stage_wrapper">
                <h3 class="header">{{ selectLang(translationModule.updatePass) }}</h3>
                <p>{{ selectLang(translationModule.setPass) }}</p>
                <Password toggleMask v-model="pass" :placeholder="selectLang(translationModule.pass)" style="align-self: center;">
                    <template #header>
                        <h6>Pick a password</h6>
                    </template>
                    <template #footer>
                        <Divider />
                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                            <li>At least one lowercase</li>
                            <li>At least one uppercase</li>
                            <li>At least one numeric</li>
                            <li>Minimum 8 characters</li>
                        </ul>
                    </template>
                </Password>
                <Password class="input" v-model="confirmPass" :feedback="false" toggleMask :placeholder="selectLang(translationModule.confirmPass)" style="align-self: center;" />
                <Button @click="" :label="selectLang(translationModule.next)" />
            </div>
        </div>
        <div class="success" v-if="stage == 'success'">
            <div class="email_stage_wrapper">
                <h3 class="header">{{ selectLang(translationModule.succeess) }}</h3>
                <i class="pi pi-check pass"></i>
                <p>{{ selectLang(translationModule.passReseted) }}</p>
                <Button :label="selectLang(translationModule.next)" />
            </div>
        </div>
    </div>
    <Footer />
</template>


<style scoped>
p {
    color: var(--text);
}

.pass {
    color: var(--accent1);
    border: 0.75rem solid #01ABFF40;
    border-radius: 100%;
    width: fit-content;
    font-size: 4rem;
    padding: 1rem;
    font-weight: bolder;
    align-self: center;
}

.header {
    color: var(--accent1);
    margin: 0;
}

.email_stage_wrapper {
    background-color: var(--primary);

    border-radius: 0.5rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.email_stage,.success,.rest_pass,.OTP,.otp_stage {
    height: 90%;
    width: 90%;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: var(--grayBackground);
    padding-inline: 5rem;
}

.container {
    min-height: 80vh;
    height: 40rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>