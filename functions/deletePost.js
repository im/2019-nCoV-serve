import client, { q } from './faunadb'

exports.handler = (event, context, callback) => {
    const body = JSON.parse(event.body)
    const id = body.postId || null;
    return client.query(q.Delete(q.Ref(q.Collection("posts"), id)))
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
