var express          = require('express'),
      app           = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      Campground     = require("./models/campground"),
      Comment        = require("./models/comment"),
      User           = require("./models/user"),
      seedDB         = require("./seeds");
//requiring routes
var   commentRoutes   = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes      = require("./routes/index");

//creating and connceting to the databse.

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/camp_js");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// seedDB(); //seed database


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

// customized middleware
// it passes the currentUser in every routes
//it will call this function in every routes
app.use(function(req, res, next){

  res.locals.currentUser = req.user;
  next();
});
//router use
app.use("/", indexRoutes);
// appending /campgrounds to the begining of all routes provided in campgroundRoutes
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

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



app.listen(3000, function(req, res){

console.log("campJS Server is running ...");

});
