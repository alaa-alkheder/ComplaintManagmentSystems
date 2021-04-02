const config = require('config');
const jwt = require('jsonwebtoken');
async function generateAuthToken(Email,Permission) {
 const token = jwt.sign({email: Email, permission: Permission}, config.get('jwtPrivateKey'));
 return token;}
 
exports.generateAuthToken=generateAuthToken;