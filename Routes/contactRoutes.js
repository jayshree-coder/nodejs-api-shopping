const express = require('express');
const router = express.Router();
const contactController = require('../controller/contact.controller');

// GET contact details
router.get('/', contactController.getContactDetails);

module.exports = router;