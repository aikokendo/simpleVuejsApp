import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        ClientUser: 'gateway',
        ClientPass: 'secret',
        tokenUrl: 'http://192.168.99.100:4001/oauth/token',
        tokenExpiration: null 
    },
    mutations: {
        SET_USER_DATA(state, userData){
            state.user = userData
            state.tokenExpiration = (Date.now() / 1000) + parseInt(userData.expires_in);
            localStorage.setItem('user', JSON.stringify(userData))
            axios.defaults.headers.common['Authorization']=`Bearer ${userData.access_token}`
        },
        LOGOUT(){
            localStorage.removeItem('user')
            location.reload()
        },
        CLEAR_TOKEN_EXPIRATION(state){
            state.tokenExpiration = null
        }
    },
    actions: {
        login({ commit },credentials){
            var params = new URLSearchParams();
            params.append('username',credentials.username);
            params.append('password',credentials.password);
            params.append('grant_type','password')

            return axios.post(this.state.tokenUrl,params,{headers: this.getters.basicAuthHeader
                }).then(
                    ({data}) => {
                        commit('SET_USER_DATA', data)
                })
        },
        logout({ commit }){
            commit('LOGOUT');
        },
        refresh_token({commit}){
            // /* eslint-disable no-console */
            // console.log('refreshing token')
            // /* eslint-enable no-console */
            var params = new URLSearchParams();
            params.append('refresh_token',this.state.user.refresh_token);
            params.append('grant_type','refresh_token')
            return axios.post(this.state.tokenUrl,params,{headers: this.getters.basicAuthHeader
            }).then(
                ({data}) => {
                    commit('SET_USER_DATA', data)
            })
        }

    },
    getters: {
        loggedIn (state){
            return !!state.user;
        },
        basicAuthHeader(state){
            var basicAuth = 'Basic ' + btoa(state.ClientUser + ':' + state.ClientPass);
            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': basicAuth
            }
            return headers;
        },
        tokenExpiration(state){
            return state.tokenExpiration
        },
        userLoaded(state){
            return (state.user)
        }
    }
})