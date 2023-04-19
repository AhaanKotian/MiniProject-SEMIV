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

// app.use(passport.initialize);
// app.use(passport.session);

app.use(flash());


const form_validation = async (req, res, next) => {
    let { input_name, input_email, input_pass, input_pass2 } = req.body;

    let errors = [];

    if(!input_name || !input_email || !input_pass || !input_pass2)
    {
        errors.push({message: "Please enter all fields"});
    }
    
    if(input_pass.length < 6)
    {
        errors.push({message: "Password should be at least 6 characters long"});
    }

    if(input_pass != input_pass2)
    {
        errors.push({message: "Passwords do not match"});
    }

    if(!input_email.match(mailformat))
    {
        errors.push({message: "Please enter valid email"});
    }

    if(errors.length > 0)
    {
        res.status(400).render('homepage', { errors });
    }
    else
    {
        let hashedPassword = await bcrypt.hash(input_pass, 10);
        
        pool.query(
            `SELECT * FROM riders_signup
            WHERE email = $1`, [input_email], (err, results) => {
                if (err){
                    throw err;
                }

                if(results.rows.length > 0){
                    errors.push({message: "Email already exists"});
                    res.render("homepage", {errors});
                }
                else
                {
                    pool.query(
                        `INSERT INTO riders_signup (name, email, password)
                        VALUES ($1, $2, $3)
                        RETURNING id, password`, [input_name, input_email, hashedPassword],
                        (err, results) => {
                            if(err){
                                throw err;
                            }
                            console.log(results.rows);
                            let SUsuccess = [];
                            SUsuccess.push({status: "success"});
                            SUsuccess.push({name: input_name});
                            //req.flash('success_msg', "You are now registered. Please log in");
                            res.render("homepage", {SUsuccess});
                        }
                    )
                }
            }
        )
    }
};



module.exports = form_validation;