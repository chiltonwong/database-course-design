var knex = require('../config')
var ChangeCustomerList=async (ctx, next) => {
    let customer =ctx.request.body
    await knex('CUSTOMER').where('Customer_id',customer.Customer_id)
        .update({
            'Customer_name':customer.Customer_name,
            'Customer_age':customer.Customer_age,
            'Customer_phone':customer.Customer_phone
        })

    var result = await knex('Customer')
    ctx.body = {
        tableData:result
    }

}

module.exports = {
    'POST /API/v1/ChangeCustomerList': ChangeCustomerList
};
