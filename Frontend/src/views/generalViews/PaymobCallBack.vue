<script setup lang="ts">
import Navbar from '@/components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import { ref, onMounted } from 'vue';
import { HttpRequester } from '@/lib/APICaller';
import  ProgressSpinner  from 'primevue/progressspinner';
 

const allParams = [
    'amount_cents',
    'created_at',
    'currency',
    'error_occured',
    'has_parent_transaction',
    'id',
    'integration_id',
    'is_3d_secure',
    'is_auth',
    'is_capture',
    'is_refunded',
    'is_standalone_payment',
    'is_voided',
    'order',
    'owner',
    'pending',
    'source_data.pan',
    'source_data.sub_type',
    'source_data.type',
    'success']

function isAllParamsContained(obj: { [key: string]: any }) {
    return allParams.every(k => { return k in obj })
}
function orderParams(obj: { [key: string]: any }) {
    let s = ''
    for (const param of allParams) {
        s = s + String(obj[param])
    }
    return s
}

onMounted(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const url = window.location.href;
    const queryString = url.split('?')[1]?.split('#')[0];
    const query = Object.fromEntries(new URLSearchParams(queryString));
    if (query.success !== 'true') {
        window.location.href = '/#/PaymobFailure'
    }
    else if (isAllParamsContained(query)) {
        const hmacString = orderParams(query)
        const data = {
            order_id: query['order'],
            hmac_str: hmacString,
            hmac_result: query['hmac'],
            success:  query['success']
        }
        const paymentVerificationRequest = new HttpRequester('verify_order')
        paymentVerificationRequest.callApi({ payment_verification: data }).then(res => {

            if (res?.success) {
                window.location.href = '/#/PaymobSuccess'
            } else {
                window.location.href = '/#/PaymobFailure'
            }
        })
    }
})
</script>


<template>
    <Navbar />
    <div id="main_paymob_callback">
        <ProgressSpinner style="width: 50%;"  strokeWidth="8" animationDuration=".5s"  />

    </div>

    <Footer />
</template>


<style scoped>
#main_paymob_callback{
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>