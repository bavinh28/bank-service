import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import '@/assets/style/tailwind.css'
import '@/axios/axios.ts'

createApp(App).use(store).use(router).use(Antd).mount('#app')
