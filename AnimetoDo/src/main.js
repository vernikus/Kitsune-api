import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import storeReset from './stores/resetStore'

const app = createApp(App)
const pinia = createPinia()
pinia.use(storeReset)
app.use(router)
app.use(pinia)

app.mount('#app')
