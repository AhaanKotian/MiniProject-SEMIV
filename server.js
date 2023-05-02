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
app.get('/', (req , res) => res.render('riderfound.ejs'));
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

  //driver accepts ride
  socket.on('accept ride', (msg) => {
    rideId = Object.values(msg)[0];
    riderId = Object.values(msg)[1];
    
    for(let i = 0; i < passengerList.length; i++)
    {
      if(passengerList[i].rideId == rideId)
      {
        passengerList.splice(i, 1);
      }
    }

    io.emit("driver details", {rideId, riderId});
    io.emit('passenger details', {passengerList});

  });


  //rider disconnects or reloads
  socket.on('disconnect', () => {
    console.log("A user disconnected");

    try{
      for(let i=0; i<passengerList.length; i++)
      {
        if(passengerList[i].id == socket.request.user.id)
        {
          passengerList.splice(i, 1);
          io.emit('passenger details', {passengerList});
          break;
        }
      }
    }
    catch(err){
      console.log("nothing to see here");
    }
  })

  //driver available
  socket.on('driver available', () => {
    io.emit('driver available');
  })

});

//emit passenger details
setInterval( () => io.emit('passenger details', {passengerList}), 6000);


server.listen(PORT, () => {
    console.log('Server running on port', PORT);
});