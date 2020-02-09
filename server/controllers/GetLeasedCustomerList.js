var knex = require('../config')
var GetLeasedCustomerList=async (ctx, next) => {
    var result=await knex.schema.raw('EXEC PRO_CUSTOMER_LEASE')

    ctx.body = {
        tableData:result
    }

    console.log(result)
}

module.exports = {
    'GET /API/v1/GetLeasedCustomerList': GetLeasedCustomerList
};
