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
const { Complaint } = require('../models');
const Op = require('Sequelize').Op;

    //todo add router
router.get('/all',async (req,res)=>{
   const comp=await Complaint.findAll();
    console.log(comp)
   res.status(200).send(comp)
});

router.get('/my/:id',async (req,res)=>{
   const comp=await Complaint.findAll({where:{userId:req.params.id}})
   res.status(200).send(comp)
});

router.get('/employee/:dep/:role',async (req,res)=>{
   const comp=await Complaint.findAll({where:({flow:{step1:{dep:req.params.dep}}},{flow:{step1:{role:req.params.role}}})})
   res.status(200).send(comp)
});



module.exports = router;