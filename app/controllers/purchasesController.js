module.exports = function (app) {
    const pModel = require("../models/purchasesModel")();

    return {

        post: async(ctx, next) => {
            let userId = await pModel.postAction(ctx.url, ctx.request.body);
            if (typeof userId === 'number') {
                // console.log('2001: ' + userId);
                ctx.status = 201;
                // ctx.body = {"id": userId};
                ctx.body = "Ok";
            } else {
                console.log('400: ' + userId);
                ctx.status = 400;
            }
        },

        get: async(ctx, next) => {
            ctx.body = await pModel.getAction(ctx.params.UserId);
        },


        del: async(ctx, next) => {
            try {
                await pModel.deleteAction(ctx.params.userId)
                ctx.status = 204;
            } catch (e) {
                ctx.status = 400
            }
        },
    }
};
