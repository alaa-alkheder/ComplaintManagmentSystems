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
const { Department } = require('../models');
// const { Employee } = require('../models');
router.get('/all' ,async (req, res) => {
    try {
        const dep = await Department.findAll();
        res.json({ dep });
    } catch (error) {
        console.log(error);
        res.status(500).send(user);
    }
});
router.get('/getChildren/:parent' ,async (req, res) => {
    try {
        const parent= await Department.findOne({
            where:{name:req.params.parent}
        });
        if (!parent) return res.status(400).send('Department not found.');
        const children= await Department.findAll({
            where:{parent:parent.id}
        });
        res.send(children);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }        // //generate auth token
});
router.get('/getParent/:parent' ,async (req, res) => {
    try {
        const dep= await Department.findOne({
            where:{name:req.params.parent}
        });
        if (!dep) return res.status(400).send('Department not found.');
        const parent= await Department.findOne({
            where:{id:dep.parent}
        });
        res.send(parent);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }        // //generate auth token
});
router.get('/getDepartment/:name' ,async (req, res) => {
    try {
        const dep= await Department.findOne({
            where:{name:req.params.name}
        });
        if (!dep) return res.status(400).send('Department not found.');
        res.send(dep);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }        // //generate auth token
});
router.post('/addDepartment', async (req, res) => {
    //Check validation + return 400
    // let {error} = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    //get Data from req.body
    const { name,supervisor } = req.body;
    //Check parent + return 400
    try {
        const parent= await Department.findOne({
            where:{
                name:req.body.parent
            }

        });
        
        if (parent.length > 0) return res.status(400).send('Department not found.');
        //save dep in database
      const  dep = await Department.create({ name,parent:parent.id,supervisor });
        // //send data to client
        res.send(dep);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }        // //generate auth token
});
router.put('/edit/supervisor', async (req, res) => {
    //check email is found
    try {
        let department = await Department.findOne({ where: { name: req.body.DepName } });
        if (!department) return res.status(400).send('Department not found.');
        //change status of department
        //!!!!check the name is not empty
        //!!!!check the in not registered
            department.supervisor =req.body.supervisor;
           let temp= await department.save();
        //    console.log(temp);
            res.send('Department ' + req.body.DepName + ' is editing supervisor to the name  '+temp.supervisor);

        } catch (error) {
            console.log(error);
        }
});
router.put('/edit/name', async (req, res) => {
    //check email is found
    try {
        let department = await Department.findOne({ where: { name: req.body.oldName } });
        if (!department) return res.status(400).send('Department not found.');
        //change status of department
        //!!!!check the name is not empty
        //!!!!check the in not registered
            department.name =req.body.newName;
           await department.save(); 
            res.send('Department ' + req.body.oldName + ' is editing to the name '+department.name)

        } catch (error) {
            console.log(error);
        }
});
router.put('/edit/block', async (req, res) => {
    //check email is found
    try {
        let department = await Department.findOne({ where: { name: req.body.name } });
        if (!department) return res.status(400).send('Department not found.');
        // //change status of department
        if (req.body.block === 'true') {
            department.block = true;
            await department.save();
            res.send('Department ' + req.body.email + ' is Blocked')
            }else {
            department.block = false; 
            await department.save();
            res.send('Department ' + req.body.email + ' is un Blocked')
            }

        } catch (error) {
            console.log(error);
        }
});



module.exports = router;
