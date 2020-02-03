import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ncovData: {},
        ncovCityData: {}
    },
    mutations: {

    },
    actions: {
        getNcovData ({ state }) {
            return axios.post(`/.netlify/functions/getNcov/`).then(res => {
                state.ncovData = res.data.newslist[0] || {}
                console.log('state.ncovData: ', state.ncovData);
            })
            .catch(err => {
                return err
            })
        },
        getNcovCityData ({ state }) {
            return axios.post(`/.netlify/functions/getNcovCity/`).then(res => {
                state.ncovCityData = res.data.newslist || []
                console.log('state.getNcovCityData: ', state.ncovCityData);
            })
            .catch(err => {
                return err
            })
        }
    }
})
