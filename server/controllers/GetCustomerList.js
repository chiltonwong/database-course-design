var knex = require('../config')
var GetCustomerList=async (ctx, next) => {
    var result = await knex('CUSTOMER')
    ctx.body = {
        tableData:result
    }

}

module.exports = {
    'GET /API/v1/GetCustomerList': GetCustomerList
};
