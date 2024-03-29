import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routes/router'

createApp(App)
//Add the line below to the file to instantiate it
.use(createPinia())
.use(router)
.mount('#app')
