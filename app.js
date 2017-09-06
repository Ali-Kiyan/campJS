var express          = require('express'),
      app           = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      Campground     = require("./models/campground"),
      Comment        = require("./models/comment"),
      User           = require("./models/user"),
      seedDB        = require("./seeds");
//creating and connceting to the databse.

mongoose.connect("mongodb://localhost/camp_js");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
seedDB();


// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "This is CampJS",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
     if(err){
       console.log(err);
     }
     else{
       res.render("comments/new", {campground: campground});
     }
  });

});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){

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

//=========

//AUTH ROUTE

//=========


//SHOW REGISTER FORM

app.get("/register", function(req, res){

res.render("register");
});

//HANDLE SIGN UP LOGIC
app.post("/register", function(req, res){
  var newUser = new User({username:req.body.username});
  //provided by local mongoose package
  User.register(newUser, req.body.password,function(err, user){
   if(err){
     console.log(err);
     //to get out of the entire call back
     return res.render("reigster");
   }
     passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
     });
  });
});


// show login form

app.get("/login", function(req, res){

res.render("login");

});
// passport.authenticate is a middleware
app.post("/login", passport.authenticate("local",
 {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
  }), function(req, res){
});

app.get("/logout", function(req, res){

req.logout();
res.redirect("/campgrounds");

});

//isLoggedIn middleware
function isLoggedIn(req, res, next){

    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");

}

app.listen(3000, function(req, res){

console.log("campJS Server is running ...");

});
