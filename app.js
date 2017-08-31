var express          = require('express'),
      app           = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose");
//creating and connceting to the databse.

mongoose.connect("mongodb://localhost/camp_js");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// {name: "Mountain Hill",
//  image: "http://www.fishergroundcampsite.co.uk/data1/images/camp1.jpg",
//  description: "This is a huge camp!"
// }, function(err, campground){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("newly created campground");
//     console.log(campground);
//   }
// });




app.get("/", function(req, res){

res.render("landing");


});
//INDEX - SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req, res){

  Campground.find({},function(err, allCampgrounds){
    if(err){
    console.log(err);
    }
    else{
    res.render("index", {campgrounds : allCampgrounds});
    }
  });



});
//CREATE - add new campground to DB
app.get("/campgrounds/new", function(req, res){

res.render("new.ejs");

});
//NEW - Show form to create new campground
app.post("/campgrounds", function(req, res){
 var name = req.body.name;
 var image = req.body.image;
 var desc = req.body.description;
 var newCampground = {name: name, image: image, description: desc}
 Campground.create(newCampground, function(err, newlyCreated){
 if(err){
    console.log(err);
 }
 else{
 res.redirect("campgrounds");
 }
 });


});
//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
Campground.findById(req.params.id, function(err, foundCampground){
if(err){
  console.log(err);
}
else{
  res.render("show", {campground: foundCampground});
}
});


});
app.listen(3000, function(req, res){

console.log("campJS Server is running ...");

});
