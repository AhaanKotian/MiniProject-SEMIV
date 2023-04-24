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
      // Save empty value if there is no value which we do not want to do
      saveUninitialized: false
    })
  );
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use('/riders', require('./routes/rider_signup'));

//hardcoded routes
app.get('/', (req , res) => res.render('drivenow.ejs'));

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});