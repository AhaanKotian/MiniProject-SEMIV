const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { setTimeout } = require('timers/promises');
const io = new Server(server);

//setting ejs view engine
app.set("view engine", "ejs");

//App configuration
const sessionMiddleware = session({ secret: "secret", resave: false, saveUninitialized: false });
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false}));
app.use(flash());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));


//routes
app.use('/riders', require('./routes/rider_signup'));
app.use('/drivers', require('./routes/driver') );

//hardcoded routes
app.get('/', (req , res) => res.render('homepage.ejs'));
//app.get('/riders/ridenow', (req, res) => console.log(req.session.passport.user));

//socket
let passengerList = [];
io.on('connection', (socket) => {
  console.log('a user connected');

  //rider clicks find driver
  socket.on('ride requested', (msg) => {
    let passenger = {
        id: socket.request.user.id, 
        name: socket.request.user.name,
        pickup: msg.putext,
        dropoff: msg.dtext
      }
    passengerList.push(passenger);
    
    io.emit("passenger details", {passengerList});
  })
});



server.listen(PORT, () => {
    console.log('Server running on port', PORT);
});