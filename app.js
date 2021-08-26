const express = require('express');
var cors = require('cors')
require('express-async-errors');
const winston= require ('winston');
const PostgresTransport = require('winston-postgres-transport');

const app=express();
app.use(cors({header:'*'}))
// Add headers
// app.use(function (req, res, next) {
//
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//
//     // Pass to next layer of middleware
//     next();
// });
winston.add(new winston.transports.File({ filename: 'error.log', level: 'error' }))
// winston.add(new PostgresTransport({ db: 'postgres://postgres:369258@localhost:5432/CMS_development', level: 'error' }))

require('./startup/routes')(app);
require('./startup/db')();

console.log(app.get('env'));

const port = process.env.PORT || 3000;
const server = app.listen(port,async () => {
    console.log(`Listening on port ${port}...`);
    console.log('******************************************************************************');

});
module.exports = server;