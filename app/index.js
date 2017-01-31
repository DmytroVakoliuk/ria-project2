"use strict";

const Koa = require("koa");
const app = new Koa();
const config = require("../config/default");






//
// let server = http.createServer(function (req, res) {
//
//     if (req.url.split("/").splice(3).shift() == 'purchases') {
//         try{
//             require(`./controllers/purchasesController`)[`${req.method.toLocaleLowerCase()}Action`](req, res);
//         } catch (e) {
//             console.log(e);
//             res.end("Error");
//         }
//     } else {
//         try {
//             require(`./controllers/${req.url.split("/").splice(1).shift()}Controller`)
//                 [`${req.method.toLocaleLowerCase()}Action`](req, res);
//         } catch (e) {
//             console.log(e);
//             res.end("Error");
//         }
//     }
//
// });


require("./middleware/router")(app);


app.listen(config.server.port);