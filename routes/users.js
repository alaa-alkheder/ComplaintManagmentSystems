const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const employee = require('../middleware/employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { validate } = require('../validation/userValidate');
const {generateAuthToken} = require('../JWT/token');
const { User } = require('../models');



router.get('/me', auth,async (req, res) => {
    try {  //search for user
        const user = await User.findAll({
            where: {
                email: req.token.email
            }
        });
        //send data to client
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).send(user);
    }


});
router.get('/all',admin ,async (req, res) => {
    try {
        const user = await User.findAll();
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).send(user);
    }

});
router.get('/:email', [admin],async (req, res) => {
    try {  //search for user
        const user = await User.findAll({
            where: {
                email: req.params.email
            }
        });
        //send data to client
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).send(user);
    }


});
router.post('/customer', async (req, res) => {
    //Check validation + return 400
    let {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //get Data from req.body
    const { firstName, lastName, email, phone, password, role } = req.body;
    //Check duplicate email + return 400
    try {
        const temp = await User.findAll({ where: { email: req.body.email } });
        if (temp.length > 0) return res.status(400).send('User already registered.');
        //encrypt password
        // const salt = await bcrypt.genSalt(10);
        // password = await bcrypt.hash(req.body.password, salt);
        //Save user in DB
        role=3;
      const  user = await User.create({ firstName, lastName, email, phone, password, role });

  const token =await generateAuthToken(email,role);
        // //send data to client
        res.header('x-auth-token', token).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }        // //generate auth token
  
});
router.post('/admin',admin, async (req, res) => {
    //Check validation + return 400
    let {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //get Data from req.body
    const { firstName, lastName, email, phone, password, role } = req.body;
    //Check duplicate email + return 400
    try {
        const temp = await User.findAll({ where: { email: req.body.email } });
        if (temp.length > 0) return res.status(400).send('User already registered.');
        //encrypt password
        // const salt = await bcrypt.genSalt(10);
        // password = await bcrypt.hash(req.body.password, salt);
        //Save user in DB
        role=1;
      const  user = await User.create({ firstName, lastName, email, phone, password, role });

  const token =await generateAuthToken(email,role);
        // //send data to client
        res.header('x-auth-token', token).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }        // //generate auth token
  
});
router.post('/employee',admin, async (req, res) => {
    //Check validation + return 400
    let {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //get Data from req.body
    const { firstName, lastName, email, phone, password, role } = req.body;
    //Check duplicate email + return 400
    try {
        const temp = await User.findAll({ where: { email: req.body.email } });
        if (temp.length > 0) return res.status(400).send('User already registered.');
        //encrypt password
        // const salt = await bcrypt.genSalt(10);
        // password = await bcrypt.hash(req.body.password, salt);
        //Save user in DB
        role=2;
      const  user = await User.create({ firstName, lastName, email, phone, password, role });

  const token =await generateAuthToken(email,role);
        // //send data to client
        res.header('x-auth-token', token).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }        // //generate auth token
  
});
/**
 *
 * @put {/email}
 */
router.put('/blockUser', async (req, res) => {
    //check email is found
    try {
        let user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(400).send('User not found.');
        // //change status of user
        if (req.body.block === 'true') {
            user.block = true;
            await user.save();
            res.send('user ' + req.body.email + ' is Blocked')
            }else {
            user.block = false; await user.save();
            res.send('user ' + req.body.email + ' is un Blocked')
            }

        } catch (error) {
            console.log(error);
        }
    })
module.exports = router;
