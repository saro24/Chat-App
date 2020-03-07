var express = require("express");
var app= express();
var port = 3000;
var path = require("path")
var hbs = require("hbs")

var htmlViewpath= path.join(__dirname+"/templates/views");
var cssViewpath= path.join(__dirname+ "/templates/views/style");

app.set('view engine', 'hbs');
app.set('views',htmlViewpath);

app.use("/style",express.static(cssViewpath))

app.get("/chat", (req, res)=> {
 res.render("index")
})

app.listen(port, ()=> {
  console.log("the server is up on port",port);

});
