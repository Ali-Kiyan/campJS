var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){

res.render("landing");


});

app.get("/campgrounds", function(req, res){

var campgrounds = [
    {name: "Salmonela Mountain", image: "/images/1.jpg"},
    {name: "Mountain Hill", image: "/images/2.jpg"},
    {name: "Mountain Goat's Rest", image: "/images/3.jpg"}
  ];
  res.render("campgrounds", {campgrounds : campgrounds});


});

app.listen(3000, function(req, res){

console.log("campJS Server is running ...");

});
