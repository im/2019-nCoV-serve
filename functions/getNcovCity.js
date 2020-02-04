import axios from 'axios'
import * as http from './http.js'
exports.handler = async (event, context, callback) => {
    return axios({
        url: http.ncovCityUrl,
        method: 'get'
    }).then(res => {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "text/html; charset=UTF-8"
            },
            body: JSON.stringify(res.data)
        }
    }).catch(err => {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    })
}