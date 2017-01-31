"use strict";

module.exports = function(app) {
    const Router = require('koa-router');
    const router = new Router();
    const bodyParser = require('koa-bodyparser');


    let myController = require("../controllers/purchasesController")(app);


    /**
     * @example curl -v -X GET "http://127.0.0.1:3000/users/1/purchases"
     */
    router.get("/users/:UserId/purchases", myController.get);

    /**
     * @example curl -v -X POST "http://127.0.0.1:3000/users/2/purchases" -d '{"count":10}' -H "Content-Type: application/json"
     */
    router.post('/users/:userId/purchases', bodyParser(), myController.post);

    /**
     * @example curl -v -X DELETE "http://127.0.0.1:3000/users/1/purchases"
     */
    router.del("/users/:userId/purchases", myController.del);

    app.use(async(ctx, next) => {
        try {
            await next();
        } catch (e) {
            ctx.body = JSON.stringify({message: e.message});
            ctx.status = 500;
        }
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
};
















