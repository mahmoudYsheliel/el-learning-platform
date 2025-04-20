import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import vue3GoogleLogin from 'vue3-google-login'
import { createPinia } from 'pinia';


import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

import App from './App.vue'
import router from './router'


const app = createApp(App)


app.use(vue3GoogleLogin, {
  clientId: '97713053876-84ql7loco3nemjdtn6ha01o3v8nlmldj.apps.googleusercontent.com',
  scope: 'openid profile email https://www.googleapis.com/auth/userinfo.profile'
})






const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    }
  }
});
app.use(createPinia())
app.component('QuillEditor', QuillEditor)

app.use(router)
//app.use(PrimeVue);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: false || 'none',
      
    }
  }
});
app.mount('#app')
