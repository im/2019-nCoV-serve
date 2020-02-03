import axios from 'axios'
import * as http from './http.js'
exports.handler = (event, context, callback) => {
    return axios({
            url: http.ncovUrl,
            method: 'get',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(res => {
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify(res.data)
            })
        })
        .catch(err => {
            return callback(null, {
                statusCode: 500,
                body: JSON.stringify(err)
            })
        })
}