const express = require('express');
const router = express.Router();
const employeeRoutes = './employeeRoutes';
const departmentRoutes = require('./departmentRoutes');
const roleRoutes = require('./roleRoutes');

router.use(require(employeeRoutes));

module.exports = router