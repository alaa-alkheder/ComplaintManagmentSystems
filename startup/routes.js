const express = require('express');
const users = require('../routes/users');
const form = require('../routes/form');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const department = require('../routes/department');
const status = require('../routes/status');
const complaint = require('../routes/complaint');
const role = require('../routes/role');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/department', department);
    app.use('/api/form', form);
    app.use('/api/status', status);
    app.use('/api/complaint', complaint);
    app.use('/api/role', role);
    app.use(error)
}