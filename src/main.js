import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Vue3Lottie from 'vue3-lottie'

const app = createApp(App)
app.use(Vue3Lottie) // プラグインを使用
app.mount('#app')
