<script setup lang="ts">
import Navbar from '@/components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InputOtp from 'primevue/inputotp';
import Button from 'primevue/button';
import { ref, onMounted, watch } from 'vue';
import { selectLang, translationModule } from '@/lib/Translate';
import { HttpRequester } from '@/lib/APICaller';
import { useRoute, useRouter } from 'vue-router';
import Options from '@/components/general/Options.vue';

const email = ref()
const pass = ref()
const confirmPass = ref()
const OTP = ref()
const token = ref()
const stage = ref('email') // email , OTP , pass  , success
const counter = ref(30)
const route = useRoute()
const router = useRouter()
const errorMsg = ref()

onMounted(() => {
    token.value = route.params?.token
    if (token.value) {
        stage.value = 'pass'
    }
})

function formatTime(time: number) {
    if (time > 9)
        return `00:${time}`
    return `00:0${time}`
}

function testValidPass(password: string) {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const isLongEnough = password.length >= 8;

    return hasUpper && hasLower && hasDigit && isLongEnough;
}
function reduceCounter() {
    if ( counter.value>0)
        counter.value = counter.value - 1
    if (counter.value !== 0)
        setTimeout(reduceCounter, 1000)
}

function getForgetPassEmail() {
    const requester = new HttpRequester('get_forget_pass_email')
    requester.callApi({ email: email.value }).then(res => {
        if (res?.success) {
            if( stage.value =='email')
                reduceCounter()
            stage.value = 'OTP'
        }
        else
            errorMsg.value = translationModule.userNotExist
    })
}
function send_otp() {
    const requester = new HttpRequester('send_token_using_otp')
    requester.callApi({ otp: OTP.value }).then(res => {
        if (res?.success) {
            stage.value = 'pass'
            token.value = res?.data?.token
        }
        else
            errorMsg.value = translationModule.wrongOTP
    })
}

function sendChangePassword() {
    if (!testValidPass(pass.value)) {
        errorMsg.value = translationModule.weakPass
    }
    else if (pass.value !== confirmPass.value) {
        errorMsg.value = translationModule.diffPass
    }
    else {
        const requester = new HttpRequester('reset_pass')
        requester.callApi({ password: pass.value, token: token.value }).then(res => {
            if (res?.success) {
                stage.value = 'success'

            }
        })
    }
}

watch(([stage,pass,email,confirmPass,OTP]), () => {
    errorMsg.value = null
})
</script>

<template>
    <Navbar />
    <Options style="margin-top: 4.75rem;margin-bottom: 3.75rem;" />

    <div class="container">
        <div class="stage_wrapper">
            <img style="position: absolute;top: 13%;left: 0;" src="/public/images/Vector 636.png" alt="">
            <img style="position: absolute;top: 85%;right: 20%;" src="/public/images/Vector 637.png" alt="">
            <img style="position: absolute;top: 23.5%;left: 18% ;" src="/public/images/Ellipse 1184.png" alt="">
            <img style="position: absolute;top: 8%;left: 70%;" src="/public/images/Ellipse 1185.png" alt="">



            <div class="stage" v-if="stage == 'email'">
                <h3 class="header">{{ selectLang(translationModule.forgeotPass) }}</h3>
                <p>{{ selectLang(translationModule.enterEmail) }}</p>
                <div style="width: 100%;">
                    <p style="margin: 0;padding: 0;color: #153060;"><strong>{{ selectLang(translationModule.email) }}</strong></p>
                    <InputText style="width: 100%;margin-bottom: 1.75rem;" :placeholder="selectLang(translationModule.email)" v-model="email" />
                </div>
                <h4 style="color:red; margin-inline:auto" v-if="errorMsg">{{ selectLang( errorMsg) }}</h4>

                <Button @click="getForgetPassEmail" :label="selectLang(translationModule.continue)" />
            </div>
            <div class="stage" v-if="stage == 'OTP'">
                <h3 class="header">{{ selectLang(translationModule.verification) }}</h3>
                <p>{{ selectLang(translationModule.enterCode) }}</p>
                <InputOtp :length="6" v-model="OTP" style="align-self: center"  />
                <p style="font-size: 1.125rem;font-weight: 400;margin-block: 1.75rem;margin-inline: auto;color: #F2451C;"> {{ formatTime(counter) }} </p>
                <h4 style="color:red; margin-inline:auto" v-if="errorMsg">{{ selectLang( errorMsg) }}</h4>

                <Button @click="send_otp" :label="selectLang(translationModule.continue)" />
                <span style="align-self: center;color: var(--text);margin-top: 2.25rem;">{{ selectLang(translationModule.didnotReceive) }}
                    <span @click="getForgetPassEmail" style="cursor: pointer;color:#F2451C;">{{ selectLang(translationModule.resend) }}</span>
                </span>
            </div>
            <div class="stage" v-if="stage == 'pass'">
                <h3 class="header">{{ selectLang(translationModule.newPass) }}</h3>
                <p>{{ selectLang(translationModule.setPass) }}</p>
                <p style="margin: 0;color: var(--accent1);">{{ selectLang(translationModule.newPass) }}</p>
                <Password class="password" toggleMask v-model="pass" :placeholder="selectLang(translationModule.pass)" >
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
                </Password >
                <p style="margin: 0;color: var(--accent1);">{{ selectLang(translationModule.confirmPass) }}</p>

                <Password class="password" v-model="confirmPass" :feedback="false" toggleMask :placeholder="selectLang(translationModule.confirmPass)" />
                <h4 style="color:red; margin-inline:auto" v-if="errorMsg">{{ selectLang( errorMsg) }}</h4>

                <Button @click="sendChangePassword" :label="selectLang(translationModule.updatePass)" />
            </div>
            <div class="stage" v-if="stage == 'success'">

                <img src="/public/images/thnaksIcon.png" class="pass" alt="">
                <h3 style="margin-inline:auto ;font-size: 1.125rem;" class="header">{{ selectLang(translationModule.succeessfully) }}</h3>
                <p style="margin-inline:auto;margin-top: 0;">{{ selectLang(translationModule.passReseted) }}</p>
                <h4 style="color:red; margin-inline:auto" v-if="errorMsg">{{ selectLang( errorMsg) }}</h4>

                <Button :label="selectLang(translationModule.continue)" @click="router.push('/login')" />
            </div>
        </div>
    </div>
    <Footer />
</template>


<style scoped>
button {
    height: 4rem;
    background-color: var(--accent1);
    border: none;
    font-weight: 700;
}
.password{
    margin-bottom: 1.75rem;
}

p {
    color: var(--text);
    margin-bottom: 2.25rem;
}

.pass {
    width: 11.5rem;
    margin-inline: auto;
    margin-bottom: 2.25rem;
}

.header {
    color: var(--accent1);
    margin: 0;
    font-weight: 4 00;
    font-size: 1.7rem;
    margin-bottom: 2.25rem;
}

.stage {
    background-color: var(--primary);
    width: 50%;
    border-radius: 0.5rem;
    padding: 5.75rem 4.25rem;
    display: flex;
    flex-direction: column;
    z-index: 2;
}

.stage_wrapper {

    position: relative;
    height: 60rem;
    width: 90%;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--grayBackground);
    padding-top: 10rem;
    margin-bottom: 6.5rem;
    z-index: 20;
}

.container {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media screen and (max-width:1200px) {
    .stage {
        width: 80%;
    }
}

@media screen and (max-width:710px) {
    .stage {
        width: 100%;
    }

    .stage_wrapper {
        width: 100%;
    }

}
</style>