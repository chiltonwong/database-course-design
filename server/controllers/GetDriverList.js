var knex = require('../config')
var GetDriverList=async (ctx, next) => {
    var result = await knex('DRIVER')
    console.log(result)
    ctx.body = {
        tableData:result
    }

}

module.exports = {
    'GET /API/v1/GetDriverList': GetDriverList
};
