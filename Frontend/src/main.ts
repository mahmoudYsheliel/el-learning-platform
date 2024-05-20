import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-blue/theme.css'
import { createPinia } from 'pinia';

import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia = createPinia();


app.use(createPinia())
app.use(router)
app.use(PrimeVue);
app.use(pinia)
app.mount('#app')
