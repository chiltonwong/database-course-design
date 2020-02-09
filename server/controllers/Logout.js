var Logout=async (ctx, next) => {
    ctx.body = null
}
module.exports = {
    'POST /API/v1/Logout': Logout
}
