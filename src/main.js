import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Request interceptor
axios.interceptors.request.use((config) => {
  // Modify the request config here
  config.baseURL = "http://www.omdbapi.com/";
  config.params = config.params || {};
  config.params["apikey"] = "183e6416";
//   console.log("config:", config);
  return config
})

// Response interceptor
axios.interceptors.response.use((response) => {
  // Handle the response here
//   console.log("response:", response);
  return response.data
}, (error) => {
  // Handle errors here
  console.error(error)
  return Promise.reject(error)
})

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
