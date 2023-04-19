const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

//setting ejs view engine
app.set("view engine", "ejs");

//App configuration
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false}));
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

app.use('/riders/signup', require('./routes/rider_signup'));
app.use('/riders/signin', require('./routes/rider_signin'));


app.get('/', (req , res) => res.render('homepage'));
app.get('/ridenow', (req , res) => res.render('ridenow'));

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});