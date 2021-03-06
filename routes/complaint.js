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
const {form} = require('../models');
const Op = require('Sequelize').Op;
const {status} = require('../models');

router.get('/customer/all', async (req, res) => {

    const comp = await Complaint.findAll({where: {type: "3"}});
    // console.log(comp)
    res.status(200).send(comp)
});

router.get('/:id', async (req, res) => {
    var reply = "no replay now !!!"

    const comp = await Complaint.findOne({
        attributes: ['data', 'status', 'createdAt', 'flow'],
        where: {id: req.params.id}
    });
    var progress=(parseInt(comp.flow.currentStep) / parseInt(comp.flow.step));
    // console.log(comp.status)
    if (comp.status == 1) {
        progress=0;
    }

    if (comp.status == 3) {
        const currentStep = comp.flow.currentStep;
        for (e in comp.flow.steps) {
            // console.log(comp.flow.steps[e].id)
            if (parseInt(comp.flow.steps[e].id) == parseInt(currentStep)) {
                reply = (comp.flow.steps[e].note).toString();
            }
        }
    }
    const st = await status.findOne({attributes: ['status'], where: {id: comp.status}});
    // console.log(comp)
    const temp = {
        'status': st.status,
        'title': comp.data.title,
        'description': comp.data.description,
        'createdAt': comp.createdAt,
        'reply': reply,
        'progress': progress
    }
    res.status(200).send(temp)
});

router.get('/employee/all', async (req, res) => {
    const comp = await Complaint.findAll({where: {type: "2"}});
    // console.log(comp)2
    res.status(200).send(comp)
});

router.get('/my/:id', async (req, res) => {
    const comp = await Complaint.findAll({
        attributes: ['id', 'data', 'status', 'createdAt'],
        where: {userId: req.params.id}
    })
    res.status(200).send(comp)
});

router.get('/services/get', auth, async (req, res, next) => {
    console.log(req.header('x-auth-token'))
    const user = await User.findAll({where: {email: req.token.email}})
    const employee = await Employee.findAll({where: {userId: user[0].id}})
    const comp = await Complaint.findAll({
        where: {
            [Op.and]: [
                {flow: {currentDep: (employee[0].dataValues.department)}},
                {flow: {currentRole: employee[0].dataValues.role}},
                {type: "3"},
                {status:{[Op.ne]: 4}}
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
                {flow: {currentDep: employee[0].dataValues.department}},
                {flow: {currentRole: employee[0].dataValues.role}},
                {type: "2"},
                {status:{[Op.ne]: 4}}
            ]
        }
    });

    res.status(200).send(comp)
});

router.post('/customer/add', async (req, res) => {
    const {userId, data} = req.body;
    const path = await form.findOne({where: {type: "3"}})
    const status = 1;
    const flow = buildFlow(path.dataValues.path);
    flow.step=2;
    const type = "3"
    const comp = await Complaint.create({userId, data, status, flow, type, 'form': 1});
    res.status(200).send(comp)
});

router.post('/management/add', auth, async (req, res) => {
    const {formID, data} = req.body;

    // console.log(formID)
    const userId = await User.findOne({attributes: ['id'], where: {email: req.token.email}})
    const path = await form.findOne({where: {id:formID}})
    const status = "1";
    const flow = buildFlow(path.dataValues.path)
    const type = "2"

    const comp = await Complaint.create({
        'userId': parseInt(userId.dataValues.id),
        data,
        status,
        flow,
        type,
        'form': formID
    });
    res.status(200).send(comp)
});

router.post('/replay', async (req, res) => {
    //complaintID,email,status,data
    const {id, status, email, data} = req.body;
    let comp = await Complaint.findOne({where: {id: id}})
    comp.status = 2;
    //new flow
    let flow = comp.dataValues.flow;


    for (e in comp.dataValues.flow.steps)
        if (comp.dataValues.flow.steps[e].id == parseInt(flow.currentStep)) {
            comp.dataValues.flow.steps[e].note = data
            comp.dataValues.flow.steps[e].status = status
            comp.dataValues.flow.steps[e].employee = email
            comp.dataValues.flow.steps[e].valid = "true"
        }
    //the complaint is reject
    if (status == "5") {
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
        flow.currentStep = (parseInt(comp.flow.currentStep) + 1).toString();
    }

    //the complaint is Accept
    console.log("=======  " + status == "6")
    if (status == "6") {
        flow.currentStep = (parseInt(comp.flow.currentStep) + 1).toString();
    }


    for (e in comp.dataValues.flow.steps) {
        if (parseInt(comp.dataValues.flow.steps[e].id) == parseInt(parseInt(comp.dataValues.flow.currentStep))) {
            comp.dataValues.flow.currentDep = comp.dataValues.flow.steps[e].dep;
            comp.dataValues.flow.currentRole = comp.dataValues.flow.steps[e].role;
        }
    }

    //update flow
    comp.flow.deep = flow.toJSON
    comp.changed('flow', true)

    if (parseInt(comp.flow.step) < parseInt(comp.flow.currentStep)) {
        //the complaint is finish
        comp.status = '3';
        comp.flow.currentDep = '0'
        comp.flow.currentRole = '0'
    }
    const c = await comp.save();
    // console.log('----------------------------------------------------------', comp)
    // for (e in comp.flow.steps)
    //     console.log(comp.flow.steps[e])
    //     console.log('+++++++++sdfdsfsdf' + comp.flow.steps.length)
    res.status(200).send(c)
});

router.post('/customer/forward', async (req, res) => {

    //check the complaint
    //check the department
    //
    // new node to flow
    //get [complaintID, new department , role] from body
    const {compID, newDep, newRole, employee} = req.body;
    //get complaint where id is equal compId
    // console.log("******************", req.body)
    const comp = await Complaint.findOne({where: {id: compID}})
    // console.log(comp.dataValues.flow.steps.length)
    for (e in comp.dataValues.flow.steps)
        if (parseInt(comp.dataValues.flow.steps[e].id) == parseInt(parseInt(comp.dataValues.flow.currentStep))) {
            comp.dataValues.flow.steps[e].employee = employee;
        }
    //define the new flow
    const temp = {
        "id": (parseInt(comp.flow.currentStep) + 1).toString(),
        "dep": newDep,
        "role": newRole,
        "employee": "",
        "date": "",
        "status": "",
        "note": ""
    }
    comp.dataValues.flow.currentStep = (parseInt(comp.flow.currentStep) + 1).toString();
    comp.dataValues.flow.currentDep = newDep;
    comp.dataValues.flow.currentRole = newRole;
    // comp.dataValues.flow.step = (parseInt(comp.flow.step) + 1).toString();
    comp.dataValues.flow.steps.push(Object.assign({}, temp))
    //todo enable save the comp after foreword
    comp.changed('flow', true)
    const c= await comp.save()
    for(e in  comp.dataValues.flow.steps)
    console.log( comp.dataValues.flow.steps[e])
    res.status(200).send(c)
});

router.post('/remove', async (req, res) => {
    const {id} = req.body;
    //get complaint where id is equal compId
    const comp = await Complaint.findOne({where: {id: id}})
    comp.status = 4;
    const temp = await comp.save();
    res.status(200).send(temp)
});

function buildFlow(path) {
    const steps = []
    const nodes = (path.toString()).split(":")
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i].split(",")
        const myObj = {
            "id": i + 1,
            "valid": "false",
            "employee": "",
            "date": "",
            "data": "",
            "status": "",
            "dep": node[0],
            "role": node[1]
        };
        steps.push(Object.assign({}, myObj))
    }
    const node = nodes[0].split(",")
    const flow = {
        "step": nodes.length,
        "currentStep": "1",
        "currentDep": node[0],
        "currentRole": node[1],
        "steps": steps
    }
    return flow;
}

module.exports = router;
