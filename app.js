var express          = require('express'),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      mongoClient    = require('mongodb').MongoClient,
      flash          = require("connect-flash"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      methodOverride = require("method-override")
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
//backup url in case of loss of any env varibales
var dbURL = process.env.DATABASEURL || "mongodb://localhost/camp_js"
mongoose.connect(dbURL, { useMongoClient: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
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
//it adds currentUser to every sigle of our templetes
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
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

//backup port in case of any sort of loss

var port = process.env.PORT || 5000

app.listen(port, function(req, res){

console.log("campJS Server is running ...");

});
