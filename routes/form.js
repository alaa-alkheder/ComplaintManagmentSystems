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

//get all forms via email
router.get('/department/:id', async (req, res,next) => {
        const f=await form.findAll({where:{department:req.params.id}});
        // throw new Error('BROKEN')
        res.status(200).send(f)
});router.get('/:id', async (req, res,next) => {
        const f=await form.findOne({where:{id:req.params.id}});
        // throw new Error('BROKEN')
        res.status(200).send(f)
});

router.get('/customer/all', async (req, res,next) => {
        const f=await form.findAll({where:{type:"3"}});
        // throw new Error('BROKEN')
        res.status(200).send(f)
});

router.get('/employee/all', async (req, res,next) => {
        const f=await form.findAll({where:{type:"2"}});
        // throw new Error('BROKEN')
        res.status(200).send(f)
});

/**
 * add new form to DB
 */
router.post('/add', async (req, res) => {
    console.log(req.body)
    const {name,type,department,cmpform,path}=req.body;
    console.log(path)
    // add validation here
    const f=await form.create({name,type,department,"signed":true,form:cmpform,path});
    res.status(200).send(f)
});

module.exports = router;