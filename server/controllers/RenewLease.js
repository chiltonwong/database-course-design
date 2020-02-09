var knex = require('../config')
var date = new Date();

Date.prototype.format = function(format)
{
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond  postman
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length==1 ? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}

var RenewLease=async (ctx, next) => {
    var result= await knex.schema.raw('PRO_LEASE_RENEW '  + ctx.request.body.id  + ',' + '\''+ctx.request.body.date+'\'')

    ctx.body = {
        tableData:result
    }

}

module.exports = {
    'POST /API/v1/RenewLease': RenewLease
};
