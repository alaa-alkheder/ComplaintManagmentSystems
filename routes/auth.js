const Joi = require('joi');
var cors = require('cors')
// const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models');
const express = require('express');
const router = express.Router();
const { generateAuthToken } = require('../JWT/token');

router.post('/admin' ,async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("!!!!!!!!!" + req.body.email);
  let user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send('Invalid email.');
  // const validPassword = await bcrypt.compare(req.body.password, user.password);
  // if (!validPassword) return res.status(400).send('Invalid email or password.');
  // if (!(req.body.password===user.password)) return res.status(400).send('Invalid  password.');
  //check the role
  if (user.role != 1) return res.status(400).send('you do not have admin access.');
  const token = await generateAuthToken(user.email, user.role);
  res.header('x-auth-token', token).send(user);
});
router.post('/employee', async (req, res) => {

  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Expose-Headers", "Authorization");
  res.header("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header,x-auth-token");
  // res.header(HEADER_STRING, TOKEN_PREFIX + token); // HEADER_STRING == Authorization
  // res.set({"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods": "*","Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, x-auth-token'",});
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // console.log("!!!!!!!!!" + req.body.email);
  let user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send('Invalid email.');
  // const validPassword = await bcrypt.compare(req.body.password, user.password);
  // if (!validPassword) return res.status(400).send('Invalid email or password.');
  // if (!(req.body.password===user.password)) return res.status(400).send('Invalid  password.');
  //check the role
  if (user.role != 2) return res.status(400).send('you do not have admin access.');

  const token = await generateAuthToken(user.email, user.role);
  res.set('x-auth-token', token)
  // console.log(res.header.)

  res.send({'token':token,'user':user});
});
router.post('/customer', async (req, res) => {
  // console.log("!!!!!!!!!" + req.body.email);
  const { error } =  validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send('Invalid email.');
  // const validPassword = await bcrypt.compare(req.body.password, user.password);
  // if (!validPassword) return res.status(400).send('Invalid email or password.');
  if (!(req.body.password===user.password)) return res.status(400).send('Invalid  password.');
  //check the role
  // if (user.role != 3) return res.status(400).send('you do not have admin access.');

  const token = await generateAuthToken(user.email, user.role);

  res.header('x-auth-token', token).send({'token':token,'data':user});
});
function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;