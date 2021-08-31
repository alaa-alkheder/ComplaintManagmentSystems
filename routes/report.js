const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const {Complaint} = require('../models');
const Op = require('Sequelize').Op;

/**
 * get  from DB
 */
router.get('/all', async (req, res, next) => {


    const complaintCount = await Complaint.count()
    //count complaintPercentage
    const finishedComplaintCount = await Complaint.count({where: {status: 3}})
    const complaintPercentage = finishedComplaintCount / complaintCount;
    //count complaintServicePercentage

    const complaintServiceCount = await Complaint.count({
        where: {
            [Op.and]: [
                {status: 3},
                {type: "3"}
            ]
        }
    });
    //
    const complaintServicePercentage = complaintServiceCount / complaintCount;
    //
    const complaintManagementCount = await Complaint.count({
        where: {
            [Op.and]: [
                {status: 2},
                {type: "3"}
            ]
        }
    });
    //
    const complaintManagementPercentage = complaintManagementCount / complaintCount;

    //todo report complaintDepartmentPercentage
    const complaintDepartmentPercentage = {
        'management': "5",
        'hr': "7",
        'local': "9",
        'security': "11",
    };

    const f = {
        'complaintPercentage': {'finishedComplaintCount':finishedComplaintCount , 'complaintCount':complaintCount},
        'complaintServicePercentage': {'complaintServiceCount':complaintServiceCount ,'complaintCount':complaintCount},
        'complaintManagementPercentage': {'complaintManagementCount':complaintManagementCount , 'complaintCount':complaintCount},
        'complaintDepartmentPercentage': complaintDepartmentPercentage,
        'managementVSservices': {'complaintServiceCount':complaintServiceCount,'complaintManagementCount':complaintManagementCount}
    }
    res.status(200).send(f)
});



module.exports = router;