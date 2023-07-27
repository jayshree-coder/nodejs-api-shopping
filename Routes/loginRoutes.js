const express = require('express');
const loginController = require('../controller/login.controller.js');

const router = express.Router();

router.post('/', loginController.login); // Update the route path to "/"

module.exports = router;