var knex = require('../config')
var GetBookList=async (ctx, next) => {
    var result = await knex('BOOK')
    ctx.body = {
        tableData:result
    }

}

module.exports = {
    'GET /API/v1/GetBookList': GetBookList
};
