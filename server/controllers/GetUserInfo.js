var knex = require('knex')({
    client: 'mssql',
    connection: {
        host : '127.0.0.1',
        user : 'dbuser',
        password : 'dbuser12345',
        database : 'db'
    }
});

var GetUserInfo=async (ctx, next) => {
    var token=ctx.query.token
    const proving = require('../token/proving');
    if (token){
        let res = proving(token);
        if (res && res.exp <= new Date()/1000){
            ctx.body = {
                message: 'token过期',
                code:3
            };
        } else {
            var result = await knex('USERS').where('token',token).first()

            ctx.body = {
                user_id:result.user_id,
                access:result.access,
                name:result.name,
                avatar:result.avatar,
                token:result.token
            }
            console.log(result)
        }
    } else{  // 没有取到token
        ctx.body = {
            msg:'没有token',
            code:0
        }
    }
}

module.exports = {
    'GET /API/v1/GetUserInfo': GetUserInfo
};
