
module.exports = function (req, res, next) { 
    // 401 Unauthorized
    // 403 Forbidden 
     
    if (!( req.token.permission==3)) return res.status(403).send('Access denied,you do not have customer access.');
  
    next();
  }