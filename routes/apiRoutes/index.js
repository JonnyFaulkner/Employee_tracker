const express = require('express');
const router = express.Router();
const employeeRoutes = './employeeRoutes';

router.use(require(employeeRoutes));

module.exports = router