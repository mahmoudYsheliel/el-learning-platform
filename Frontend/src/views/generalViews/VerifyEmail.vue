<script setup lang="ts">
import Navbar from '@/components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import Button from 'primevue/button';
import { ref, onMounted } from 'vue';
import { HttpRequester } from '@/lib/APICaller';
import { useRoute } from 'vue-router';
import ChangeEmailDialog from '@/components/dialogs/ChangeEmailDialog.vue';
import { selectLang, translationModule } from '@/lib/Translate';


const route = useRoute()
const timeToResend = ref(30)
const isResendDisabled = ref(true)
const showChangeEmailDialg = ref(false)
const email = ref('')
function formatTime(time: number) {
    if (time > 9)
        return `00:${time}`
    return `00:0${time}`
}

let requestVerificationEmail: () =>void


onMounted(() => {
    let resendTimeInterval = setInterval(decreseTimeToResend, 1000)
    const td = new TextDecoder()

    const ab = atob(route.params?.email as string)
    const utfArr = Uint8Array.from(ab , char => char.charCodeAt(0))
    email.value = td.decode(utfArr)
    function decreseTimeToResend() {
        if (timeToResend.value == 0) {
            clearInterval(resendTimeInterval)
            isResendDisabled.value = false
        }
        else {
            timeToResend.value -= 1
        }
    }
    requestVerificationEmail = () => {
        timeToResend.value = 30
        isResendDisabled.value = true
        resendTimeInterval = setInterval(decreseTimeToResend, 1000)
        new HttpRequester('get_verify_email_link').callApi({ email: email.value }).then(res => { console.log(res) })
    }

    requestVerificationEmail()

    
})


</script>


<template>
    <ChangeEmailDialog @hide="showChangeEmailDialg = false" :show="showChangeEmailDialg" />
    <Navbar />
    <div id="verify_email_container">
        <h1> {{ selectLang(translationModule.verifyEmail) }} </h1>

        <img id="verefy_email_image" src="/public/images/emailVerification.png" alt="">
        <p>{{ selectLang(translationModule.checkVerificationEmail) }}</p>
        <p> <strong>{{ email }}</strong></p>
        <div id="btn_container">
            <Button :disabled="isResendDisabled" :label="`${selectLang(translationModule.resend)} ${formatTime(timeToResend)}`" @click="requestVerificationEmail" />
            <Button :label="selectLang(translationModule.changeEmail)" @click="showChangeEmailDialg = true"/>
        </div>

    </div>

    <Footer />



</template>


<style scoped>
#btn_container {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    margin-top: 2rem;
    justify-content: space-around;
    width: 100%;
}

p {
    margin: 0;
    padding: 0;
}

#verefy_email_image {
    width: 15rem;
}

h1 {
    margin: 0;
    padding: 0;
    color: var(--header);
}

#verify_email_container {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-block: 4rem;
    width: 60%;
    margin-inline: auto;
    background-color: var(--grayBackground);
    border-radius: 2rem;

}
</style>