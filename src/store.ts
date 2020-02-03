import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ncovData: {}
    },
    mutations: {

    },
    actions: {
        getNcovData ({ state }) {
            return axios.post(`/.netlify/functions/getNcov/`).then(res => {
                state.ncovData = res.data.newslist[0] || {}
                console.log('res.data: ', res.data);
                console.log('state.ncovData: ', state.ncovData);
            })
            .catch(err => {
                return err
            })
        }
    }
})
