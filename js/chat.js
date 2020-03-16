var socket= io();
var sendmsg=  document.querySelector("#send");
var msg= document.querySelector("#message");
var sendloc= document.querySelector("#location");
var messageTem= document.querySelector("#messageTemp").innerHTML;
var msgContainner= document.querySelector("#messages");
var allowed= false;


socket.on("message", (msg) =>{
  console.log(msg);
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

    socket.emit("message", { text: msg.value , loc:location },(error) => {
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
// for the private discussions
// parsing the URL
// inspired from https://www.developerdrive.com/turning-the-querystring-into-a-json-object-using-javascript/
function QueryStringToJSON() {
  var url=window.location.search;
  url=url.replace("+",""); // for the sapaces
  console.log(url.includes("+"));
  var pairs = url.slice(1).split('&');
  var result = {};
  pairs.forEach(function(pair) {
    pair.replace("+","");
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });

  return JSON.parse(JSON.stringify(result));
}

var {name , room} = QueryStringToJSON();
 socket.emit("join" , {name, room});
