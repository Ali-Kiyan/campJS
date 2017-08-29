var express = require('express');
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
var campgrounds = [
    {name: "Salmonela Mountain", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}
  ];

app.get("/", function(req, res){

res.render("landing");


});

app.get("/campgrounds", function(req, res){


  res.render("campgrounds", {campgrounds : campgrounds});


});

app.get("/campgrounds/new", function(req, res){

res.render("new.ejs");

});

app.post("/campgrounds", function(req, res){
 var name = req.body.name;
 var image = req.body.image;
 var newCampground = {name: name, image: image}
 campgrounds.push(newCampground);
 res.redirect("campgrounds");

});

app.listen(3000, function(req, res){

console.log("campJS Server is running ...");

});
