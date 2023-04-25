const bcrypt = require('bcrypt');
const pool = require('../dbConfig').pool;
const express = require('express');
const app = express();
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");

const initializePassport = require("../passportConfig") 

initializePassport(passport);

const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

app.use(flash());

app.use(
    session({
      // Key we want to keep secret which will encrypt all of our information
      secret: 'secret',
      // Should we resave our session variables if nothing has changes which we dont
      resave: false,
      // Save empty value if there is no vaue which we do not want to do
      saveUninitialized: false
    })
  );

app.use(passport.initialize());
  app.use(passport.session());

const pass_auth = 
    passport.authenticate("local", {
        successRedirect: '/riders/signin_suc',
        failureRedirect: '/riders/signin_error',
        failureMessage: true
    });
    

module.exports = pass_auth;