import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-blue/theme.css'
import vue3GoogleLogin from 'vue3-google-login'
import { createPinia } from 'pinia';

import App from './App.vue'
import router from './router'


const app = createApp(App)


app.use(vue3GoogleLogin, {
    clientId: '97713053876-84ql7loco3nemjdtn6ha01o3v8nlmldj.apps.googleusercontent.com',
    scope: 'openid profile email https://www.googleapis.com/auth/userinfo.profile'
  })


app.use(createPinia())
app.use(router)
app.use(PrimeVue);
app.mount('#app')
