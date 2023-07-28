const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');

const contactController = require("./controller/contact.controller.js");
const loginRoutes = require('./Routes/loginRoutes.js');
const refreshRoutes = require('./Routes/refreshRoutes.js'); // Update the require statement
const assignRoleRoutes = require('./Routes/assignRoleRoutes.js'); // Add the new route

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/contact", contactController);
app.use("/privateget/contact", contactController);
app.use("/login", loginRoutes);

app.use("/refresh", refreshRoutes); 
app.use('/assignrole', assignRoleRoutes);


module.exports = app;