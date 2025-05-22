<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { onMounted, ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import { selectLang,translationModule } from '@/lib/Translate';
import { useLang } from '@/stores/token';

const lang = useLang()
const props = defineProps({
    show: Boolean,
})
const emits = defineEmits(['hide'])
const visible = ref(props.show)

const route = useRoute()
const router = useRouter()

const old_email = ref(route.params?.email as string)
const new_email = ref(route.params?.email as string)

function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function changeEmail() {
    const te = new TextEncoder()
    const encoded = te.encode(new_email.value)
    const charCode = String.fromCharCode(...encoded)
    router.push(`/verifyEmail/${btoa(charCode)}`).then(() => { window.location.reload() })
}
watch(() => props.show, () => {
    visible.value = props.show
})
onMounted(() => {
    const td = new TextDecoder()

    const ab = atob(route.params?.email as string)
    const utfArr = Uint8Array.from(ab, char => char.charCodeAt(0))
    old_email.value = td.decode(utfArr)
    new_email.value = td.decode(utfArr)
})

</script>


<template>
    <Dialog :class="{rtl:(lang.getLang == 'ar')}" @hide="emits('hide')" modal v-model:visible="visible" :header="selectLang(translationModule.changeEmail)" :pt="{ title: { style: 'color: var(--accent1); font-weight: bold;' } }">
        <div id="change_email_dialog">
            <div id="input_container">
                <strong>{{ selectLang(translationModule.email) }}</strong>
                <InputText id="email_input" v-model="new_email" />
            </div>
            <div id="btn_container">
                <Button :disabled="old_email === new_email || !isValidEmail(new_email)" :label="selectLang(translationModule.conf)" @click="changeEmail" />
            </div>

        </div>

    </Dialog>

</template>



<style scoped>
#email_input {
    width: clamp(12rem, 75%, 25rem);
}

#btn_container {
    margin-top: 2rem;
    display: flex;
    justify-content: end;
}

#input_container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 0.5rem;
}

#change_email_dialog {
    width: clamp(18rem, 75vw, 30rem);

}
</style>