var mustache= require("Mustache")
var express = require("express");
var app= express();
var port = 3000;
var http= require("http");
var path = require("path");
var socketio= require("socket.io");
var filter= require("bad-words");
var {addUser , findUser, removeUser, getUserRoom } = require("./js/user.js")

var statics= path.join(__dirname);
app.use(express.static(statics))

var server = http.createServer(app);
var io= socketio(server);

var {generateMsg } = require("./js/util");
io.on("connection",(socket)=> {
  socket.on("join" , ({name , room}, callback)=>{
  var data = addUser({id: socket.id , name , room});
   if(data.error) {
   return callback(data.error);
  }
  socket.join(data.user.room);
   socket.emit("message", generateMsg("Start Sharing your thought" , " ", "Admin"));
  socket.broadcast.to(data.user.room).emit("message",generateMsg( data.user.name+" has joid the discussion","", data.user.name));
  io.to(data.user.room).emit("room", { room:data.user.room , users:getUserRoom(data.user.room)})

      callback()
   })

  socket.on("message", (msg , callback) => {
    console.log(socket.id);
    var user= findUser(socket.id);
    var filt= new filter();
    if(filt.isProfane(msg.text)) {
     return   callback("Profanity is not allowed");
    }
     console.log(user);
       io.to(user.room).emit("message",generateMsg(msg.text, 'https://google.com/maps?q='+msg.loc.lat+','+msg.loc.long , user.name));
      return  callback("Delivered");
  });

  socket.on("disconnect", ()=> {
    var user = removeUser(socket.id) ;
    console.log(user);
    if(user) {
      io.to(user.room).emit("message", generateMsg( user.name+" has left the discussion","" , "Admin"));
      io.to(user.room).emit("room", { room:user.room , users:getUserRoom(user.room)})

    }

  })
})

server.listen(port, ()=> {
    console.log("the server is up on port",port);

});
