const express = require('express');
var cors = require('cors')
require('express-async-errors');
const winston= require ('winston');
const PostgresTransport = require('winston-postgres-transport');

const app=express();
app.use(cors({header:'*'}))
/
winston.add(new winston.transports.File({ filename: 'error.log', level: 'error' }))
winston.add(new winston.transports.File({ filename: 'wrong.log', level: 'warn' }))
winston.add(new winston.transports.File({ filename: 'info.log', level: 'info' }))
winston.add(new winston.transports.File({ filename: 'http.log', level: 'http' }))
winston.add(new winston.transports.File({ filename: 'wrong.log', level: 'warn' }))

require('./startup/routes')(app);
require('./startup/db')();

console.log(app.get('env'));

const port = process.env.PORT || 3000;
const server = app.listen(port,async () => {
    console.log(`Listening on port ${port}...`);
    console.log('******************************************************************************');

});
module.exports = server;