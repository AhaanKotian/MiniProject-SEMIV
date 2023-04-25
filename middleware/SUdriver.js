const bcrypt = require('bcrypt');
const pool = require('../dbConfig').pool;
const express = require('express');
const app = express();
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport").Passport;
const passport2 = new passport();
const initializePassport = require("../passportConfig2") 

initializePassport(passport2);

const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


app.use(
    session({
      // Key we want to keep secret which will encrypt all of our information
      secret: 'secret2',
      // Should we resave our session variables if nothing has changes which we dont
      resave: false,
      // Save empty value if there is no vaue which we do not want to do
      saveUninitialized: false
    })
  );

// app.use(passport.initialize);
// app.use(passport.session);

app.use(flash());

//SIGNUP
const form_validation = async (req, res, next) => {
    let { name, email, vno, vmodel, phone, password, password2} = req.body;

    let errors = [];

    if(!name || !email || !password || !password2 || !vno || !vmodel || !phone)
    {
        errors.push({message: "Please enter all fields"});
    }
    
    if(password.length < 6)
    {
        errors.push({message: "Password should be at least 6 characters long"});
    }

    if(password != password2)
    {
        errors.push({message: "Passwords do not match"});
    }

    if(!email.match(mailformat))
    {
        errors.push({message: "Please enter valid email"});
    }

    if(phone.length != 10)
    {
        errors.push({message: "Phone no. should be 10 digits long"});
    }

    if(errors.length > 0)
    {
        var string = encodeURIComponent(JSON.stringify({errors}));
        res.redirect('/drivers/signup_error?valid=' + string);
        return;
        //res.status(400).render('homepage', { errors });
    }
    else
    {
        let hashedPassword = await bcrypt.hash(password, 10);
        
        pool.query(
            `SELECT * FROM drivers
            WHERE email = $1`, [email], (err, results) => {
                if (err){
                    throw err;
                }

                if(results.rows.length > 0){
                    errors.push({message: "Email already exists"});
                    var string = encodeURIComponent(JSON.stringify({errors}));
                    res.redirect('/drivers/signup_error?valid=' + string);
                    return;
                }
                else
                {
                    pool.query(
                        `SELECT * FROM drivers
                        WHERE vno = $1`, [vno], (err, results) => {
                            if (err){
                                throw err;
                            }

                            if(results.rows.length > 0){
                                errors.push({message: "Vehicle already exists"});
                                var string = encodeURIComponent(JSON.stringify({errors}));
                                res.redirect('/drivers/signup_error?valid=' + string);
                                return;
                            }
                            else
                            {
                                pool.query(
                                    `INSERT INTO drivers (name, email, vno, vmodel, phone, password)
                                    VALUES ($1, $2, $3, $4, $5, $6)
                                    RETURNING id, password`, [name, email, vno, vmodel, phone, hashedPassword],
                                    (err, results) => {
                                        if(err){
                                            throw err;
                                        }   
                                        console.log(results.rows);
                                        let SUsuccess = [];
                                        SUsuccess.push({name: name});
                                        var string = encodeURIComponent(JSON.stringify({SUsuccess}));
                                        res.redirect('/drivers/signup_suc?valid=' + string);
                                        return;                          
                                    }
                                )
                            }
                        }
                    )
                    
                }
            }
        )
    }
};



//SIGNIN
app.use(passport2.initialize());
app.use(passport2.session());

const pass_auth = 
    passport2.authenticate("local", {
        successRedirect: '/drivers/signin_suc',
        failureRedirect: '/drivers/signin_error',
        failureMessage: true
    });
    
module.exports = {form_validation, pass_auth};