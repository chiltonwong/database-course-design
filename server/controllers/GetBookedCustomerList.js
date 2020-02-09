var knex = require('../config')

var GetBookedCustomerList=async (ctx, next) => {
    var result=await knex.schema.raw('EXEC PRO_CUSTOMER_BOOK')

    ctx.body = {
        tableData:result
    }

    console.log(result)
}

module.exports = {
    'GET /API/v1/GetBookedCustomerList': GetBookedCustomerList
};
