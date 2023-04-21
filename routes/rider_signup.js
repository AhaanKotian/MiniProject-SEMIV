const express = require('express');
const router = express.Router();
const form_validation = require('../middleware/SU_validation'); //signup form validation
const pass_auth = require('../middleware/SI_validation'); //passport authentication

//signup routes for rider
router.post('/signup', form_validation);
router.get('/signup_error', (req, res) => res.render("homepage", JSON.parse(req.query.valid)));
router.get('/signup_suc',  (req, res) => res.render("homepage", JSON.parse(req.query.valid)));


//signin routes for rider
router.post('/signin', pass_auth);

router.get('/signin_error', (req, res) => {
        const SI_err = req.session.messages || [];
        req.session.messages = null;
        res.render("homepage", {SI_err});
    }
);

router.get('/signin_suc', (req, res) => {
    const user = req.session.passport.user;
    res.render("homepage", {user});
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


  //ridenow if user is logged in
  router.get('/ridenow', (req , res) => res.render('ridenow'));

module.exports = router;