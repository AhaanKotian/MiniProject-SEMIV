const express = require('express');
const router = express.Router();
const form_validation = require('../middleware/SUdriver').form_validation;
const pass_auth = require('../middleware/SUdriver').pass_auth;

router.get('/', (req, res) => res.render("driverui"));

//signup routes for driver
router.post('/signup', form_validation);
router.get('/signup_error', (req, res) => res.render("driverui", JSON.parse(req.query.valid)));
router.get('/signup_suc',  (req, res) => res.render("driverui", JSON.parse(req.query.valid)));


//signin routes for driver
router.post('/signin', pass_auth);

router.get('/signin_error', (req, res) => {
        const SI_err = req.session.messages || [];
        req.session.messages = null;
        res.render("driverui", {SI_err});
    }
);

router.get('/signin_suc', (req, res) => {
    const user = req.session.passport.user;
    res.render("driverui", {user});
}
);


//sign out route for rider
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });


//drivenow if user is logged in
router.get('/drivenow', (req , res) => res.render('drivenow'));

//after driver accepts ride
router.get('/riderfound', (req, res) => res.render('riderfound'));


module.exports = router;