module.exports = function (app) {
    const pModel = require("../models/purchasesModel")();

    return {

        post: async(ctx, next) => {
            let userId = await pModel.postAction(ctx.url, ctx.request.body);
            if (typeof userId === 'number') {
                ctx.status = 201;
                ctx.body = "Ok";
            } else {
                console.log('400: ' + userId);
                ctx.status = 400;
            }
        },

        get: async(ctx, next) => {
            try {
                ctx.body = await pModel.getAction(ctx.params.UserId);
                ctx.status = 200;
            } catch (e) {
                ctx.status = 400
            }

        },


        del: async(ctx, next) => {
            try {
                await pModel.deleteAction(ctx.params.userId)
                ctx.body = "Ok";
                ctx.status = 204;
            } catch (e) {
                ctx.status = 400
            }
        },
    }
};
