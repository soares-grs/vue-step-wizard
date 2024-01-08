import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

createApp(App).use(FloatingVue).mount('#app')
