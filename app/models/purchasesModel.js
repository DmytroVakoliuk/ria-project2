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
            return new Promise((resolve, reject)=>{
                try {
                    // console.log(typeof(id));
                    let userId = Number(id);
                    memcached.get(userId, function (err, data) {
                        if (err) {
                            // console.log("Error");
                            reject(err);
                        } else {
                            let value = JSON.parse(data);
                            // console.log(value);
                            resolve(value.count.toString());
                        }
                    });
                }catch(e){
                    console.log("Catch");
                    reject(e);
                }
            });



/*            let userId = getUserId(req);

            memcached.get(userId, function (err, data) {
                if (data) {
                    let value = JSON.parse(data);
                    res.end(value.count.toString());
                } else {
                    // console.log('Cannot read data');
                    res.end("invalid data");
                }
            });*/

        },

        /**
         * @example curl -v -X POST "http://127.0.0.1:3000/users/2/purchases" -d '{"count":10}' -H "Content-Type: application/json"
         */

        postAction: (id, body)=>{
            return new Promise((resolve, reject)=>{
                try {
                    let count = JSON.stringify(body);
                    let userId = Number(getUserId(id));
                    memcached.add(userId, count, 1000, function (err) {
                        if (err) {
                            // console.log("Error");
                            reject(err);
                        } else {
                            // console.log(userId);
                            resolve(userId);
                        }
                    });
                }catch(e){
                    console.log("Catch");
                    reject(e);
                }
            })
        },




        /**
         * @example curl -v -X DELETE "http://127.0.0.1:3000/users/2/purchases"
         */
        deleteAction: function (req, res) {
            let userId = getUserId(req);
            if (userId) {
                memcached.get(userId, function (err, data) {
                    if (data) {
                        memcached.del(userId, function (err) {
                            console.log(err);
                            if (err) {
                                res.end('Error --> Cannot delete a value in memcached');
                            } else {
                                res.end("OK");
                            }
                        });
                    } else {
                        res.end("invalid data");
                    }
                });
            } else {
                res.end("Invalid userId");
            }
        }
    }
};