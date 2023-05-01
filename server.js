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
// const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
// io.use(wrap(sessionMiddleware));
// io.use(wrap(passport.initialize()));
// io.use(wrap(passport.session()));


//routes
app.use('/riders', require('./routes/rider_signup'));
app.use('/drivers', require('./routes/driver') );

//hardcoded routes
app.get('/', (req , res) => res.render('homepage.ejs'));
//app.get('/riders/ridenow', (req, res) => console.log(req.session.passport.user));

//---SOCKET STUFF BEGINS---
const passengerList = [];
let k12 = 0;

io.on('connection', (socket) => {
  console.log('a user connected');
  
  //rider clicks find driver
  socket.on('ride requested', (msg) => {
    msg.pushStatus = "No";
    msg.rideId = ++k12;
    passengerList.push(msg);
    console.log("Passenger List", passengerList);    
  })

  //rider details are pushed to driver
  socket.on('push status', (msg) => {
    pL = Object.values(msg)[0];
    for(let i = 0; i < pL.length; i++)
    {
      for(let j = 0; j < passengerList.length; j++)
      {
        if(pL[i].rideId == passengerList[j].rideId)
        {
          passengerList[j].pushStatus = "Yes";
        }
      }
    }
  });

});

//emit passenger details
setInterval( () => io.emit('passenger details', {passengerList}), 6000);


server.listen(PORT, () => {
    console.log('Server running on port', PORT);
});