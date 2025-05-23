<script setup lang="ts">
import Navbar from '@/components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import { useOrder, usePersonalInfo } from '@/stores/token';
import { ref } from 'vue';
import { selectLang, translationModule } from '@/lib/Translate';
import InputText from 'primevue/inputtext';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
const order = useOrder()
const personalInfo = usePersonalInfo()
const router = useRouter()


const userOrder = ref<any>(order.getOrder)
const firstName = ref(personalInfo.getInfo?.firstName)
const lastName = ref(personalInfo.getInfo?.lastName)
const email = ref(personalInfo.getInfo?.email)
const phone = ref()
function checkPhoneNumber(phoneNumber: string) {
    if (phoneNumber.startsWith('01') && phoneNumber.length == 1) {
        return true
    }
    return false
}



</script>


<template>
    <Navbar />
    <div id="checkout_container">
        <div id="contact_details">
            <h2>{{ selectLang(translationModule.contactDetails) }}</h2>
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
        </div>
        <div id="checkout_details">
            <p><strong>{{ selectLang(translationModule.orderSummary) }}</strong></p>
            <p>{{ selectLang(translationModule.promoCode) }}</p>
            <InputText />
            <div id="details">
                <div class="details_field">
                    <p>{{ selectLang(translationModule.courseTitle) }}:</p>
                    <p>{{selectLang(userOrder?.courseTitle) }}</p>
                </div>
                <div class="details_field">
                    <p>{{ selectLang(translationModule.price) }}:</p>
                    <p>{{userOrder?.coursePrice }} L.E</p>
                </div>
            </div>
            <Button style="width: 100%;margin-top: 2rem;" :label="selectLang(translationModule.checkout)" @click="router.push('/ThankYou')"/>
        </div>

    </div>
    <Footer />

</template>


<style scoped>
.details_field{
    display: flex;
    justify-content: space-between;
}
#checkout_details{
    padding: 2rem;
}
#checkout_details{
    background-color: var(--grayBackground);
    border: 1px solid var(--borderColor);
    height: 30rem;
    border-radius: 0.5rem;
    margin-top: 8rem;
    width: 24rem;
}
h2,p {
    color: var(--descriptionText);
}
input{
    width: 100%;
}
#contact_details{
    width: 40%;
}
#checkout_container {
    min-height: 80vh;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: start;   
}
@media screen and (max-width:1200px) {
    #checkout_container{
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #contact_details{
        width: 80%;
    }
}
</style>