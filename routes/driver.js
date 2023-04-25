const express = require('express');
const router = express.Router();
const form_validation = require('../middleware/SUdriver').form_validation;

router.get('/', (req, res) => res.render("driverui"));
router.post('/signup', form_validation);
router.get('/signup_error', (req, res) => res.render("driverui", JSON.parse(req.query.valid)));
router.get('/signup_suc',  (req, res) => res.render("driverui", JSON.parse(req.query.valid)));

module.exports = router;