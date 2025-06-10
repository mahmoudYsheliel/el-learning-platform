<script setup lang="ts">
import Navbar from '@/components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import { useOrder, usePersonalInfo } from '@/stores/token';
import { ref, watch } from 'vue';
import { selectLang, translationModule } from '@/lib/Translate';
import InputText from 'primevue/inputtext';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import { HttpRequester } from '@/lib/APICaller';
const order = useOrder()
const personalInfo = usePersonalInfo()
const router = useRouter()


const userOrder = ref<any>(order.getOrder)
const firstName = ref(personalInfo.getInfo?.firstName)
const lastName = ref(personalInfo.getInfo?.lastName)
const email = ref(personalInfo.getInfo?.email)
const phone = ref()

const showErrorMessage = ref(false)

// const firstName = ref('Mahmoud')
// const lastName = ref('yasser')
// const email = ref(personalInfo.getInfo?.email)
// const phone = ref('01098365004')


const promoCode = ref('')
const initialAmount = ref(userOrder.value?.price)
const finalAmount = ref(userOrder.value?.price)
const title = ref<{ en: string, ar: string }>(userOrder.value?.title)
const promoCodeError = ref('')

function checkPhoneNumber(phoneNumber: string) {
    if (phoneNumber.startsWith('01') && phoneNumber.length == 11) {
        return true
    }
    return false
}

const pay = async () => {
    if (!( firstName.value && lastName.value && phone.value && checkPhoneNumber( phone.value))) {
        showErrorMessage.value = true
        return
    }
    let payURL = ''
    const paymentRequester = new HttpRequester('get_payment_link')
    const data = {
        type:order.getOrder?.type ,
        plan_course_id: order.getOrder?.id,
        promo_code: promoCode.value,
        first_name: firstName.value,
        last_name: lastName.value,
        phone_number: phone.value,
    }
    paymentRequester.callApi({ paymob_data: data }).then(res => {
        if (res?.success && res?.data?.link) {
            payURL = res?.data?.link
            window.open(payURL, '_blank')
        }
    })

}


function applyPromoCode() {
    const applyPromoCodeRequester = new HttpRequester('apply_promocode')
    applyPromoCodeRequester.callApi({ amount: initialAmount.value, promo_code: promoCode.value }).then(res => {
        if (res?.success && res?.data?.amount)
            finalAmount.value = res.data.amount
        else {
            finalAmount.value = initialAmount.value
            promoCodeError.value = res?.msg
        }

    })
}
watch(([promoCode,firstName,lastName,phone,email]), () => {
    promoCodeError.value = ''
    showErrorMessage.value = false
})


</script>


<template>
    <Navbar />
    <div id="checkout_container">
        <div id="contact_details">
            
            <h2>{{ selectLang(translationModule.contactDetails) }}</h2>
            <h4 style="color: var(--wrongAnswer);text-align: center;" v-if="showErrorMessage">{{ selectLang(translationModule.dataMissing) }}</h4>
            <div class="input_field">
                <p>{{ selectLang(translationModule.firstName) }}*</p>
                <InputText v-model="firstName" />
            </div>
            <div class="input_field">
                <p>{{ selectLang(translationModule.lastName) }}*</p>
                <InputText v-model="lastName" />
            </div>
            <div class="input_field">
                <p>{{ selectLang(translationModule.email) }}*</p>
                <InputText v-model="email" />
            </div>
            <div class="input_field">
                <p>{{ selectLang(translationModule.phone) }}*</p>
                <InputText maxlength="11" v-model="phone" />
            </div>
            <div style="display: flex;justify-content: end;">
                <Button style="margin-top: 2rem;" :label="selectLang(translationModule.continue)" @click="() => { pay() }" />
            </div>
        </div>
        <div id="checkout_details">
            <p><strong>{{ selectLang(translationModule.orderSummary) }}</strong></p>
            <p>{{ selectLang(translationModule.promoCode) }}</p>
            <InputText v-model="promoCode" />
            <div id="details">
                <div class="details_field">
                    <p>{{ selectLang(translationModule.courseTitle) }}:</p>
                    <p>{{ selectLang(title) }}</p>
                </div>
                <div class="details_field">
                    <p>{{ selectLang(translationModule.price) }}:</p>
                    <p>{{ finalAmount }} L.E</p>
                </div>
            </div>
            <Button style="width: 100%;margin-top: 2rem;" :label="selectLang(translationModule.checkout)" @click="() => { applyPromoCode() }" />
            <p style="color: red;text-align: center;">{{ promoCodeError }}</p>
        </div>

    </div>
    <Footer />

</template>


<style scoped>
.details_field {
    display: flex;
    justify-content: space-between;
}

#checkout_details {
    padding: 2rem;
}

#checkout_details {
    background-color: var(--grayBackground);
    border: 1px solid var(--borderColor);
    height: 30rem;
    border-radius: 0.5rem;
    margin-top: 8rem;
    width: 24rem;
    margin-bottom: 2rem;
}

h2,
p {
    color: var(--descriptionText);
}

input {
    width: 100%;
}

#contact_details {
    width: 40%;
}

#checkout_container {
    min-height: 80vh;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 5rem;
}

@media screen and (max-width:1200px) {
    #checkout_container {
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
    }

    #contact_details {
        width: 80%;
    }
}
</style>