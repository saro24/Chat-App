var mustache= require("Mustache")

var express = require("express");
var app= express();
var port = 3000;
var http= require("http");
var path = require("path");
var socketio= require("socket.io");
var filter= require("bad-words");

var statics= path.join(__dirname);
app.use(express.static(statics))

var server = http.createServer(app);
var io= socketio(server);

var {generateMsg } = require("./js/util");

io.on("connection",(socket)=> {
  socket.emit("message", generateMsg("Start Sharing your thought" , " "));
  socket.broadcast.emit("message","a new user has joid the discussion");

  socket.on("sendMessage", (msg , callback) => {
    var filt= new filter();
    if(filt.isProfane(msg.text)) {
     return   callback("Profanity is not allowed");
    }
       io.emit("message",generateMsg(msg.text, 'https://google.com/maps?q='+msg.loc.lat+','+msg.loc.long));
      return  callback("Delivered")
  });

  socket.on("disconnect", ()=> {
     io.emit("message", generateMsg("a user has left the discussion"));
  })
})

server.listen(port, ()=> {
  console.log("the server is up on port",port);

});
