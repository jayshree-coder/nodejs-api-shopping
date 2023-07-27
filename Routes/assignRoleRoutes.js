const express = require('express');
const assignRoleController = require('../controller/assignrole.controller.js');

const router = express.Router();

router.post('/', assignRoleController.assignrole);

module.exports = router;