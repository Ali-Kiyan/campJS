var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){

res.render("landing");


});




//SHOW REGISTER FORM

router.get("/register", function(req, res){
res.render("register");
});

//HANDLE SIGN UP LOGIC
router.post("/register", function(req, res){

  var newUser = new User({username: req.body.username});
  //provided by local mongoose package
  User.register(newUser, req.body.password, function(err, user){
   if(err){
     //here we are using return so flash messages is not working here
     //  req.flash("error", errormsg);
     //to get out of the entire call back
     return res.render("register", {error: err.message});
   }
     passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to CampJS " + user.username);
      res.redirect("/campgrounds");
     });
  });
});


// show login form

router.get("/login", function(req, res){

res.render("login");

});
// passport.authenticate is a middleware
//handling login logic
router.post("/login", passport.authenticate("local",
 {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
  }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){

req.logout();
req.flash("success", "Successfully logged out");
res.redirect("/campgrounds");

});
module.exports = router;
