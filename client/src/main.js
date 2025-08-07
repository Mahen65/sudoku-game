import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = '/api'
// Set up axios to use the base URL for API requests
const app = createApp(App)
app.config.globalProperties.$http = axios
app.use(router).mount('#app')

