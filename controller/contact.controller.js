const express = require('express');
const Contact = require('../models/contact.model');
const cryptoJS = require('crypto-js');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('', authMiddleware, async (req, res) => {
  try {
    // Your existing code to fetch contacts
    const contacts = await Contact.find().select('-_id fullname email phone').lean().exec();
    return res.status(200).send(contacts);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});



router.post("", async (req, res) => {
  try {
    const { fullname, email, phone } = req.body;
    const ipAddress = req.headers["x-client-ip"] || req.connection.remoteAddress;

    const contact = await Contact.create({
      fullname,
      email,
      phone,
      ipAddress,
    });

    // Encrypt the contact data
    const encryptedData = cryptoJS.AES.encrypt(JSON.stringify(contact), "your-secret-key").toString();

    const response = {
      message: "Data submitted successfully",
      contact: encryptedData,
    };

    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;