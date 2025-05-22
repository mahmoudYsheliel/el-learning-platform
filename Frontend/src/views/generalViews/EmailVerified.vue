<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { HttpRequester } from '@/lib/APICaller';
import { usePersonalInfo } from '@/stores/token';
import { useToken } from '@/stores/token';
import { selectLang, translationModule } from '@/lib/Translate';
const route = useRoute()
const router = useRouter()
const verificationToken = ref()
const token = useToken()
const personalInfo = usePersonalInfo()

onMounted(() => {
    verificationToken.value = route.params?.token
    new HttpRequester('verify_email').callApi({ token: verificationToken.value }).then(res => {
        console.log(res)
        if (res?.access_token) {
            token.addToken(res?.access_token)
            personalInfo.addInfo({
                userType: res?.data?.info?.user_type,
                notifications: res?.data?.info?.notifications,
                id: res?.data?.info?.id,
                firstName: res?.data?.info?.first_name,
                lastName: res?.data?.info?.last_name,
                email: res?.data?.info?.email,
                gender: res?.data?.info?.gender,
            });
            router.push("/");
        }
    });
})

</script>


<template>
    <div style="display: flex;justify-content: center;align-items: center;width: 100vw;height: 100vh;" >
        <h1 style="color: #ee4444;"> {{ selectLang(translationModule.linkExpired) }}</h1>
    </div>

</template>