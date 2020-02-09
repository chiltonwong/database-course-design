var knex = require('../config')
var Login=async (ctx, next) => {
    console.log(ctx.request.body)
    const addtoken = require('../token/addtoken');
    var result = await knex('USERS').where('name',ctx.request.body.userName).first()
    console.log(result)

    var token=addtoken({user: result.name, password: result.userpwd})
    var result2=await knex('USERS').update({'token':token}).where('name',ctx.request.body.userName)
    if(typeof result!='undefined') {
        if (result.userpwd == ctx.request.body.password) {
            ctx.body = {
                code: 20000,
                token: token
            }
        } else
            ctx.body = {
                code: 60204,
                message: 'Account and password are incorrect.'
            }
    }
    else{
        console.log('something wrong')
    }
}
module.exports = {
    'POST /API/v1/Login': Login
};
