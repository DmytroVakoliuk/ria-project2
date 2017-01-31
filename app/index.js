"use strict";

const Koa = require("koa");
const app = new Koa();
const config = require("../config/default");

require("./middleware/router")(app);


app.listen(config.server.port);