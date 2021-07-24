const express = require('express');
require('express-async-errors');
const winston= require ('winston');
const PostgresTransport = require('winston-postgres-transport');

const app=express();

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