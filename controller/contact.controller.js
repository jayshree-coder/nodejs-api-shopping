
const express = require("express");
const Contact = require("../models/contact.model");
const router = express.Router();


router.get("", async (req, res) => {
  try {
    const contacts = await Contact.find().select("id").lean().exec();
    return res.status(200).send(contacts);
    } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", async (req, res) => {
    try {
        const { fullname, email, phone } = req.body;
        const ipAddress = req.headers['x-client-ip'] || req.connection.remoteAddress;
        console.log('requet id', req.socket.remoteAddress);
        console.log('requet id', req.ip);
        
        const contact = await Contact.create({
          fullname,
          email,
          phone,
          ipAddress,
        });
        console.log('>>>>>>>>>>>>>>>>>>>>>>>', contact);
        const response = {
            message: 'Data submitted successfully',
            contact: contact
          };
    
        return res.status(200).send(response);
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
});

module.exports = router;