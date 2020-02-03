import axios from 'axios'
const url = `http://api.tianapi.com/txapi/ncovcity/index?key=45fa3cbde8554285c1677e2ecc3168fd`
exports.handler = (event, context, callback) => {
    return axios({
            url: url,
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
                body: err
            })
        })
}