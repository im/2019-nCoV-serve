const faunadb = require('faunadb')
const chalk = require('chalk')
const q = faunadb.query


if (!process.env.FAUNADB_SECRET) {
    console.log(chalk.yellow('Required FAUNADB_SERVER_SECRET enviroment variable not found.'))
}

function initFaunaDB () {
    const client = new faunadb.Client({
        // secret: process.env.FAUNADB_SECRET
        secret: 'fnADjpWkahACCdvDbrO65L0JpWEhpZyfE06ssPAK'
    })

    client.query(q.CreateCollection({ name: 'posts' }))

    console.log(chalk.cyan('Your collections have been initilized successfully'))
}

initFaunaDB()


