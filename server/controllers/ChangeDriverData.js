var knex = require('../config')
var ChangeDriverList=async (ctx, next) => {
    let driver =ctx.request.body
    await knex('DRIVER').where('Driver_id',driver.Driver_id)
        .update({
            'Driver_name':driver.Driver_name,
            'Driver_age':driver.Driver_age,
            'Driver_phone':driver.Driver_phone,
            'Driver_flag':driver.Driver_flag
        })

    var result = await knex('DRIVER')
    ctx.body = {
        tableData:result
    }

}

module.exports = {
    'POST /API/v1/ChangeDriverList': ChangeDriverList
};
