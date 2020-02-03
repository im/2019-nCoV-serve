import client, { q } from './faunadb'

exports.handler = (event, context, callback) => {
    const body = JSON.parse(event.body)
    const id = body.postId || null;
    const data = body.postData
    return client.query(q.Update(q.Ref(q.Collection("posts"), id),{ data: data }))
        .then(ret => {
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify(ret)
            })
        }).catch(error => {
            return callback(null, {
                statusCode: 500,
                body: JSON.stringify(error)
            })
        })
}
