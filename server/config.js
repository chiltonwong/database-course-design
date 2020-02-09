var knex = require('knex')({
    client: 'mssql',
    connection: {
        host : '127.0.0.1',
        user : 'dbuser',
        password : 'dbuser12345',
        database : 'db'
    }
});

module.exports = knex
