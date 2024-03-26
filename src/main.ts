import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

createApp(App)
//Add the line below to the file to instantiate it
.use(createPinia())
.mount('#app')
