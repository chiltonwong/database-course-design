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

var EndLeaseCalc=async (ctx, next) => {
    var result=await knex.schema.raw('PRO_LEASE_END '  + ctx.request.body.id  + ',' + '\''+date.format("yyyy-MM-dd")+'\'')

    ctx.body = {
        tableData:result
    }

    console.log(result)
}

module.exports = {
    'POST /API/v1/EndLeaseCalc': EndLeaseCalc
};
