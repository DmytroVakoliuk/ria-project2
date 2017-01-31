"use strict";

const Memcached = require("memcached"),
    Q = require("q");

let memcached = new Memcached('localhost:11211');

function getUserId(req) {
    return req.split('/')[2];
}

module.exports = function () {
    return {
        /**
         * @example curl -v -X GET "http://127.0.0.1:3000/users/2/purchases"
         */
        getAction: (id) => {
            return new Promise((resolve, reject) => {
                try {
                    // console.log(typeof(id));
                    let userId = Number(id);
                    memcached.get(userId, function (err, data) {
                        if (err) {
                            // console.log("Error");
                            reject(err);
                        } else {
                            try {
                                // users = JSON.parse(content.toString())
                                let value = JSON.parse(data);
                                resolve(value.count.toString());

                            } catch (e) {
                                reject("error");
                            }

                            // console.log(value);
                        }
                    });
                } catch (e) {
                    console.log("Catch");
                    reject(e);
                }
            });

        },

        /**
         * @example curl -v -X POST "http://127.0.0.1:3000/users/2/purchases" -d '{"count":10}' -H "Content-Type: application/json"
         */

        postAction: (id, body) => {
            return new Promise((resolve, reject) => {
                try {
                    let count = JSON.stringify(body);
                    let userId = Number(getUserId(id));
                    memcached.add(userId, count, 1000, function (err) {
                        if (err) {
                            // console.log("Error");
                            reject(err);
                        } else {
                            resolve(userId);
                        }
                    });
                } catch (e) {
                    console.log("Catch");
                    reject(e);
                }
            })
        },


        /**
         * @example curl -v -X DELETE "http://127.0.0.1:3000/users/2/purchases"
         */
        deleteAction: (id) => {
            return new Promise((resolve, reject) => {
                try {
                    let userId = Number(id);
                    if (userId) {
                        memcached.get(id, function (err, data) {
                            if (data) {
                                memcached.del(id, function (err) {
                                    console.log(err);
                                    if (err) {
                                        reject('Error --> Cannot delete a value in memcached');
                                    } else {
                                        resolve("OK");
                                    }
                                });
                            } else {
                                reject("invalid data");
                            }
                        });
                    } else {
                        reject("Invalid userId");
                    }
                } catch (e) {
                    console.log("Catch");
                    reject(e);
                }
            })
        }
    }
};
