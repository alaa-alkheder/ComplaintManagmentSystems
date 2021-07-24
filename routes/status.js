const express = require('express');
const router = express.Router();
const {status}= require('../models');
const asyncMidleware=require('../middleware/async')
/**
 * get all status from DB
 */
router.get('/all', async (req, res,next) => {
    const f=await status.findAll();
    // throw new Error('BROKEN')
    res.status(200).send(f)
});
/**
 * add new status to DB
 */
router.post('/add', async (req, res) => {
    const {name}=req.body;
    console.log(name)
    // add validation here
    const f=await status.create({status:name});
    res.status(200).send(f)
});

module.exports = router;