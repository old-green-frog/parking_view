import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import * as bootstrap from 'bootstrap';


window.bootstrap = bootstrap;

axios.defaults.baseURL = 'http://localhost:8080/'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const app = createApp(App)

app.use(router)

app.mount('#app')
