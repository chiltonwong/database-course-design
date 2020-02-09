var knex = require('../config')
var GetLeaseList=async (ctx, next) => {
    var result = await knex('LEASE')
    ctx.body = {
        tableData:result
    }

}

module.exports = {
    'GET /API/v1/GetLeaseList': GetLeaseList
};
