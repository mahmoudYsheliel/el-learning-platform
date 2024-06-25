import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-blue/theme.css'
import vue3GoogleLogin from 'vue3-google-login'
import { createPinia } from 'pinia';

import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia = createPinia();

app.use(vue3GoogleLogin, {
    clientId: '97713053876-lv3icpet4rr95q84t1jgf5fe8cquctqg.apps.googleusercontent.com'
  })


app.use(createPinia())
app.use(router)
app.use(PrimeVue);
app.use(pinia)
app.mount('#app')
