var express          = require('express'),
      app           = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      Campground     = require("./models/campground"),
      Comment        = require("./models/comment"),
      seedDB        = require("./seeds");
//creating and connceting to the databse.

mongoose.connect("mongodb://localhost/camp_js");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
seedDB();



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
    res.render("campgrounds/index", {campgrounds : allCampgrounds});
    }
  });



});
//CREATE - add new campground to DB
app.get("/campgrounds/new", function(req, res){

res.render("campgrounds/new");

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
Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
if(err){
  console.log(err);
}
else{
  res.render("campgrounds/show", {campground: foundCampground});
}
});


});

//=============

//comments routes

//=============

app.get("/campgrounds/:id/comments/new", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
     if(err){
       console.log(err);
     }
     else{
       res.render("comments/new", {campground: campground});
     }
  });

});

app.post("/campgrounds/:id/comments", function(req, res){

       Campground.findById(req.params.id, function(err, campground){
         if(err){
           console.log(err);
           res.redirect("/campgrounds")
         }
         else{
           Comment.create(req.body.comment, function(err, comment){
             if(err){
               console.log(err);
             }
             else{
               campground.comments.push(comment);
               campground.save();
               res.redirect("/campgrounds/" + campground._id)
             }
           });
         }
       });

});




app.listen(3000, function(req, res){

console.log("campJS Server is running ...");

});
