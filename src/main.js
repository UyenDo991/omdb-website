import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Request interceptor
axios.interceptors.request.use((config) => {
  // Modify the request config here
  config.baseURL = 'https://api.themoviedb.org/3/'
  config.params = config.params || {}
  config.params['api_key'] = 'd4be06001b5bcf74a11f39b3995179c8'
  //   console.log("config:", config);
  return config
})

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    // Handle the response here
    //   console.log("response:", response);
    return response.data
  },
  (error) => {
    // Handle errors here
    console.error(error)
    return Promise.reject(error)
  }
)

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(pinia)
app.mount('#app')
//scroll menu
window.onscroll = function() {myFunction()};

var navbar_sticky = document.getElementById("navbar_sticky");
console.log('navbar_sticky');
console.log(navbar_sticky);
var sticky = navbar_sticky.offsetTop;
var navbar_height = document.querySelector('.navbar').offsetHeight;

function myFunction() {
  if (window.pageYOffset >= sticky + navbar_height) {
    navbar_sticky.classList.add("sticky")
  document.body.style.paddingTop = navbar_height + 'px';
  } else {
    navbar_sticky.classList.remove("sticky");
  document.body.style.paddingTop = '0'
  }
}
