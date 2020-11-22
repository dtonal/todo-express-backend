const mongoose = require('mongoose');
require('dotenv').config()

const connString = process.env.MONGO_CONNECTION
//require chalk module to give colors to console text
var chalk = require('chalk');

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;


const init = new Promise((resolve, reject) => {
    mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true }).then(resolve()).catch(err => reject(err))
    mongoose.connection.on('connected', function () {
        console.log(connected("Mongoose default connection is open to ", connString));
    });


    mongoose.connection.on('error', function (err) {
        console.log(error("Mongoose default connection has occured " + err + " error"));
    });

    mongoose.connection.on('disconnected', function () {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });

    mongoose.set('debug', true)
})

const dbConnection = {
    init: init
}

module.exports = dbConnection