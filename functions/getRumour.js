import axios from 'axios'
import * as http from './http.js'
exports.handler = async (event, context, callback) => {
    const body = JSON.parse(event.body) || {}
    return axios({
            url: http.rumourUrl,
            method: 'get',
            params: body
        }).then(res => {
            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "text/html; charset=UTF-8"
                },
                body: JSON.stringify(res.data)
            }
        })
        .catch(err => {
            return {
                statusCode: 500,
                body: JSON.stringify(err)
            }
        })
}