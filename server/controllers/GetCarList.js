var knex = require('../config')
var GetCarList=async (ctx, next) => {
    var result = await knex('CAR')
    ctx.body = {
        tableData:result
    }

}

module.exports = {
    'GET /API/v1/GetCarList': GetCarList
};
