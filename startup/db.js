/*
const winston = require('winston');
const mongoose = require('mongoose');
mongoose.connect(db)
        .then(() => winston.info(`Connected to ${db}...`));
*/


const {sequelize} = require('../models');

module.exports =async function() {
     
await sequelize.authenticate();
console.log('database Connected!');
}
