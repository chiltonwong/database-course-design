var knex = require('../config')
var ChangeLeaseList=async (ctx, next) => {
    let lease =ctx.request.body
    await knex('LEASE').where('Lease_id',lease.Lease_id)
        .update({
            'End_time':lease.End_time,
            'Return_car':lease.Return_car,
            'Flag':lease.Flag
        })

    var result = await knex('LEASE')
    ctx.body = {
        tableData:result
    }

}

module.exports = {
    'POST /API/v1/ChangeLeaseList': ChangeLeaseList
};
