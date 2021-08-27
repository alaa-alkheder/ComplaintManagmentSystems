const express = require('express');
const router = express.Router();
const {status} = require('../models');
/**
 * get  from DB
 */
router.get('/all', async (req, res, next) => {
    // const f=await status.findAll({attributes:['id','status']});
    // throw new Error('BROKEN')
    const complaintPersint = 0.6;
    const complaintServicePersint = 0.3;
    const complaintManagmentPersint = 0.9;
    const complaintDepartmentPersint = {
        'managment': "5",
        'hr': "7",
        'local': "9",
        'security': "11",
    };

    const f = {
        'complaintPersint': complaintPersint,
        'complaintServicePersint': complaintServicePersint,
        'complaintManagmentPersint': complaintManagmentPersint,
        'complaintDepartmentPersint': complaintDepartmentPersint
    }
    res.status(200).send(f)
});


module.exports = router;