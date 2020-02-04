import Vue from 'vue'
import App from './App.vue'
import router from './vuex/router'
import store from './store'
import Axios from 'axios'

// import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created(){
    const userString = localStorage.getItem('user')
    if (userString){
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA',userData)
    }

    //intercept request, check if token needs refreshing.
    Axios.interceptors.request.use((config) => {
      let originalRequest = config
      if(this.$store.getters.isTokenExpired) {
        this.$store.dispatch('refresh_token')
        return Promise.resolve(originalRequest)
      }
      return config
    })

    //intercept responses, if we have an 401 unathorized response,
    // we should logout.
    //this protects against fake tokens
    Axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401){
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
    })
  },
  render: h => h(App),
}).$mount('#app')
