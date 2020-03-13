var socket= io();
var sendmsg=  document.querySelector("#send");
var msg= document.querySelector("#message");
var sendloc= document.querySelector("#location");
var messageTem= document.querySelector("#messageTemp").innerHTML;
var msgContainner= document.querySelector("#messages");
var allowed= false;

socket.on("welcomeMsg", (welcomeMessage)=> {
  console.log(welcomeMessage);
})
socket.on("message", (msg) =>{
 if(msg.text.trim()!==""){
 var html = Mustache.render(messageTem , {
   message:  msg.text,
    createdAt:moment(msg.createdAt).format("h:m a"),
    location:msg.location
 });
  msgContainner.insertAdjacentHTML('beforeend', html);
}else {
 return;
}
});

sendmsg.addEventListener("click" , () => {
  sendmsg.disabled=true;
  navigator.geolocation.getCurrentPosition((data)=> {
   var location= {lat:data.coords.latitude, long:data.coords.longitude};

  socket.emit("sendMessage", { text: msg.value , loc:location },(error) => {
     sendmsg.disabled= false;
     msg.value=" ";
     if(error) {
      console.log(error);
      }
      console.log("Delivered");
   });
 })
});

sendloc.addEventListener("click" , ()=> {
 if(!allowed) {
  allowed = false;
} else {
 allowed= true;
}
});
