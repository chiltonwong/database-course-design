var knex = require('../config')
var ChangeBookList=async (ctx, next) => {
    let book =ctx.request.body
    await knex('BOOK').where('Book_id',book.Book_id)
        .update({
            'Pick_time':book.Pick_time,
            'Flag':book.Flag
        })

    var result = await knex('BOOK')
    ctx.body = {
        tableData:result
    }

}

module.exports = {
    'POST /API/v1/ChangeBookList': ChangeBookList
};
