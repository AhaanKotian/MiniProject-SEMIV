const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

//setting ejs view engine
app.set("view engine", "ejs");

//App configuration
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false}));

app.use('/riders/signup', require('./routes/rider_signup'));

app.get('/', (req , res) => res.render('homepage'));
app.get('/ridenow', (req , res) => res.render('ridenow'));

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});