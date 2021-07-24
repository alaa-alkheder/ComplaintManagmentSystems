
const winston = require('winston');

module.exports = function(err, req, res, next){
  winston.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug 
  // silly
    console.log("!!!!!!"+err)
  res.status(500).send('Something failed.');
}
