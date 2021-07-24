const express = require('express');
const router = express.Router();
const {form}= require('../models');
const asyncMidleware=require('../middleware/async')
/**
 * get all forms from DB
 */
router.get('/all', async (req, res,next) => {
        const f=await form.findAll();
        // throw new Error('BROKEN')
        res.status(200).send(f)
});
/**
 * add new form to DB
 */
router.post('/add', async (req, res) => {
    const {name,type,department,signed,cmpform,path}=req.body;
    // add validation here
    const f=await form.create({name,type,department,signed,form:cmpform,path});
    res.status(200).send(f)
});

module.exports = router;