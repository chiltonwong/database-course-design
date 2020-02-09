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

var GetHomeList=async (ctx, next) => {
    var count1 = Array.from(await knex('CUSTOMER')).length
    var count2= Array.from(await knex('BOOK').where('Lift_car','未提车')).length
    var count3=Array.from(await knex('LEASE').where('Return_car','已还车')).length
    var count4=Array.from(await knex.schema.raw('EXEC PRO_CUSTOMER_DELAY' + '\''+date.format("yyyy-MM-dd")+'\'')).length
    var inforCardData = [
        { title: '用户数目', icon: 'md-person-add', count: count1, color: '#2d8cf0' },
        { title: '新增预定', icon: 'md-chatbubbles', count: count2, color: '#E46CBB' },
        { title: '已完成订单', icon: 'md-map', count: count3, color: '#9A66E4' },
        { title: '需催还订单', icon: 'md-help-circle', count: count4, color: '#ff9900' }
    ]
    var barData={
        Mon:0,
        Tue:0,
        Wed:0,
        Thu:0,
        Fri:0,
        Sat:0,
        Sun:0,
    }
    for( var i=0 ; i!= 7 ; i++ ){
        switch((new Date(date.getTime()-i*24*60*60*1000)).getDay()){
            case 0:
                barData['Sun']=(await knex.schema.raw('EXEC PRO_LEASE_RENTAL' + '\'' + (new Date(date.getTime()-i*24*60*60*1000)).format("yyyy-MM-dd")+'\''))[0]['']
                break
            case 1:
                barData['Mon']=(await knex.schema.raw('EXEC PRO_LEASE_RENTAL' + '\'' + (new Date(date.getTime()-i*24*60*60*1000)).format("yyyy-MM-dd")+'\''))[0]['']
                break
            case 2:
                barData['Tue']=(await knex.schema.raw('EXEC PRO_LEASE_RENTAL' + '\'' + (new Date(date.getTime()-i*24*60*60*1000)).format("yyyy-MM-dd")+'\''))[0]['']
                break
            case 3:
                barData['Wed']=(await knex.schema.raw('EXEC PRO_LEASE_RENTAL' + '\'' + (new Date(date.getTime()-i*24*60*60*1000)).format("yyyy-MM-dd")+'\''))[0]['']
                break
            case 4:
                barData['Thu']=(await knex.schema.raw('EXEC PRO_LEASE_RENTAL' + '\'' + (new Date(date.getTime()-i*24*60*60*1000)).format("yyyy-MM-dd")+'\''))[0]['']
                break
            case 5:
                barData['Fri']=(await knex.schema.raw('EXEC PRO_LEASE_RENTAL' + '\'' + (new Date(date.getTime()-i*24*60*60*1000)).format("yyyy-MM-dd")+'\''))[0]['']
                break
            case 6:
                barData['Sat']=(await knex.schema.raw('EXEC PRO_LEASE_RENTAL' + '\'' + (new Date(date.getTime()-i*24*60*60*1000)).format("yyyy-MM-dd")+'\''))[0]['']
                break
            default:
                break
        }
    }
    console.log(typeof JSON.parse(JSON.stringify(barData)))
    ctx.body = {
        'inforCardData':inforCardData,
        'barData':JSON.parse(JSON.stringify(barData))
    }

}

module.exports = {
    'GET /API/v1/GetHomeList': GetHomeList
};
