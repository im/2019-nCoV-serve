import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ncovData: {},
        ncovCityData: [],
        rumourData: {}
    },
    mutations: {

    },
    actions: {
        getNcovData({ state }) {
            return axios.post(`/.netlify/functions/getNcov/`).then(res => {
                state.ncovData = res.data.newslist[0] || {}
            })
                .catch(err => {
                    return err
                })
        },
        getNcovCityData({ state }) {
            return axios.post(`/.netlify/functions/getNcovCity/`).then(res => {
                state.ncovCityData = res.data.newslist || []
            })
                .catch(err => {
                    return err
                })
        },
        getRumourData({ state }, params) {
            return axios.post(`/.netlify/functions/getRumour/`, params).then(res => {
                state.rumourData = res.data.newslist || []
            })
                .catch(err => {
                    return err
                })
        }
    }
})
