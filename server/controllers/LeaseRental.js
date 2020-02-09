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

var LeaseRental=async (ctx, next) => {
    console.log(ctx.request.body)
    var result=0
    if(ctx.request.body.flag==1||ctx.request.body.startDate==ctx.request.body.endDate)
        result = (await knex.schema.raw('PRO_LEASE_RENTAL ' + '\''+ctx.request.body.startDate+'\''))[0]['']
    else {
        for(var i=0;i!=(new Date(ctx.request.body.endDate)).getDate()-(new Date(ctx.request.body.startDate)).getDate()+1;i++){
            var date=new Date((new Date(ctx.request.body.startDate)).getTime()+i*24*60*60*1000).format('yyyy-MM-dd')
            var money =(await knex.schema.raw('PRO_LEASE_RENTAL ' + '\''+date+'\''))[0]['']

            result+=money
        }
    }
    console.log(result)
    ctx.body = {
        tableData:result
    }

}

module.exports = {
    'POST /API/v1/LeaseRental': LeaseRental
};
