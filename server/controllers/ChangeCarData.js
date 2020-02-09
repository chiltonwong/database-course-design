var knex = require('../config')
var ChangeCarList=async (ctx, next) => {
    let car =ctx.request.body
    await knex('CAR').where('Car_number',car.Car_number)
        .update({
            'Car_flag':car.Car_flag,
            'Car_price':car.Car_price,
            'Earnest_money':car.Earnest_money,
            'Car_deposit':car.Car_deposit
        })

    var result = await knex('CAR')
    ctx.body = {
        tableData:result
    }

}

module.exports = {
    'POST /API/v1/ChangeCarList': ChangeCarList
};
