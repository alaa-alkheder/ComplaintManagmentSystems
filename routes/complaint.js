const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const employee = require('../middleware/employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {validate} = require('../validation/userValidate');
const {generateAuthToken} = require('../JWT/token');
const {Complaint, Employee, User} = require('../models');
const Op = require('Sequelize').Op;


router.get('/customer/all', async (req, res) => {

    const comp = await Complaint.findAll({where: {type: "3"}});
    // console.log(comp)
    res.status(200).send(comp)
});

router.get('/:id', async (req, res) => {
    const comp = await Complaint.findAll({where: {userId: req.params.id}});
    // console.log(comp)
    res.status(200).send(comp)
});

router.get('/employee/all', async (req, res) => {
    const comp = await Complaint.findAll({where: {type: "2"}});
    // console.log(comp)
    res.status(200).send(comp)
});

router.get('/my/:id', async (req, res) => {
    const comp = await Complaint.findAll({where: {userId: req.params.id}})
    res.status(200).send(comp)
});

router.get('/services/get', auth, async (req, res) => {
    const user = await User.findAll({where: {email: req.token.email}})
    const employee = await Employee.findAll({where: {userId: user[0].id}})
    const comp = await Complaint.findAll({
        where: {
            [Op.and]: [
                {flow: {currentDep: {dep: employee[0].dataValues.department}}},
                {flow: {currentRole: {role: employee[0].dataValues.role}}},
                {type: "3"}
            ]
        }
    });
    res.status(200).send(comp)
});

router.get('/management/get', auth, async (req, res) => {
    const user = await User.findAll({where: {email: req.token.email}})
    const employee = await Employee.findAll({where: {userId: user[0].id}})
    const comp = await Complaint.findAll({
        where: {
            [Op.and]: [
                {flow: {currentDep: {dep: employee[0].dataValues.department}}},
                {flow: {currentRole: {role: employee[0].dataValues.role}}},
                {type: "2"}
            ]
        }
    });
    res.status(200).send(comp)
});

router.post('/customer/add', async (req, res) => {
    const {userId, data} = req.body;
    const status = 1;
    const flow = {"dep": ""};
    const type = "3"
    const comp = await Complaint.create({userId, data, status, flow, type});
    res.status(200).send(comp)
});

router.post('/employee/add', async (req, res) => {
    const {userId, data} = req.body;
    const status = 1;
    const flow = {"dep": ""};
    const type = "2"
    const comp = await Complaint.create({userId, data, status, flow, type});
    res.status(200).send(comp)
});

router.post('/replay', async (req, res) => {
    //complaintID,email,status,data
    const {id, status, email, data} = req.body;
    let comp = await Complaint.findOne({where: {id: id}})
    //new flow
    let flow = comp.dataValues.flow;


    for (e in comp.dataValues.flow.steps)
        if (comp.dataValues.flow.steps[e].id == parseInt(flow.currentStep)) {
            comp.dataValues.flow.steps[e].note = data
            comp.dataValues.flow.steps[e].status = status
            comp.dataValues.flow.steps[e].employee = email
        }
    //the complaint is reject
    if (status == "0") {
        comp.dataValues.flow.step = (parseInt(comp.dataValues.flow.step) + 2).toString()
        for (e in comp.dataValues.flow.steps) {
            if (parseInt(comp.dataValues.flow.steps[e].id) > parseInt(flow.currentStep)) {
                comp.dataValues.flow.steps[e].id = (parseInt(comp.dataValues.flow.steps[e].id) + 2).toString()
            }
        }
        for (e in comp.dataValues.flow.steps) {
            if (parseInt(comp.dataValues.flow.steps[e].id) == parseInt(parseInt(comp.dataValues.flow.currentStep))) {
                const temp = comp.dataValues.flow.steps[e];
                // temp.id = flow.currentStep;
                temp.id = (parseInt(comp.dataValues.flow.currentStep) + 2).toString()
                comp.dataValues.flow.steps.push(Object.assign({}, temp))
                temp.id = flow.currentStep;
            }
            if (parseInt(comp.dataValues.flow.steps[e].id) == parseInt(parseInt(comp.dataValues.flow.currentStep) - 1)) {
                const temp = comp.dataValues.flow.steps[e];
                // temp.id = flow.currentStep;
                temp.id = (parseInt(comp.dataValues.flow.currentStep) + 1).toString()
                comp.dataValues.flow.steps.push(Object.assign({}, temp))
                temp.id = flow.currentStep - 1;
            }


        }
        //todo test the complaint step is zero, the complaint foreword to user

    }

    //the complaint is Accept
    if (status == "1") {
        flow.currentStep = (parseInt(comp.flow.currentStep) + 1).toString();
    }


    for (e in comp.dataValues.flow.steps) {
        if (parseInt(comp.dataValues.flow.steps[e].id) == parseInt(parseInt(comp.dataValues.flow.currentStep))) {
        comp.dataValues.flow.currentDep=comp.dataValues.flow.steps[e].dep;
        comp.dataValues.flow.currentRole=comp.dataValues.flow.steps[e].role;
        }
    }

    //update flow
    comp.flow.deep = flow.toJSON
    comp.changed('flow', true)
    // const c = await comp.save();
    res.status(200).send(comp)
});


module.exports = router;