const express = require('express');
const router = express.Router();
const {role}= require('../models');
const asyncMidleware=require('../middleware/async')
/**
 * get all forms from DB
 */
router.get('/all', async (req, res,next) => {
    const temp=await role.findAll();
    // throw new Error('BROKEN')
    res.status(200).send(temp)
});
/**
 * add new form to DB
 */
router.post('/add', async (req, res) => {
    const {name}=req.body;
    // add validation here
    const f=await role.create({name});
    res.status(200).send(f)
});

module.exports = router;