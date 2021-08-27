/*
//
const mongoose = require('mongoose');
mongoose.connect(db)
        .then(() =>
*/
const winston = require('winston');

const {sequelize} = require('../models');

module.exports =async function() {
await sequelize.authenticate();
// await sequelize.sync({froce:true});
//     console.log(ate().getTime())
winston.info(`Connected to  ...`);
console.log('database Connected!');
// console.log('******************************************************************************');
}
