var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){

    // is user logged in
    if(req.isAuthenticated()){
      Campground.findById(req.params.id, function(err, foundCampground){
          if(err){
            res.redirect("back");
          }else{
            // does own the campground
            //we use mongoose function to check the equality because user._id (string) and author.id(object) are not the same type
            if(foundCampground.author.id.equals(req.user._id)){
            next();
            }else {
              res.redirect("back");
            }
          }
      });
    }
    else {
      res.redirect("back");
    }
}
middlewareObj.checkCommentOwnership = function(req, res, next){
    // is user logged in
    if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id, function(err, foundComment){
          if(err){
            res.redirect("back");
          }else{
            // does own the comment
            //we use mongoose function to check the equality because user._id (string) and author.id(object) are not the same type
            if(foundComment.author.id.equals(req.user._id)){
            // route_handler
            next();
            }else {
              res.redirect("back");
            }
          }
      });
    }
    else {
      res.redirect("back");
    }
}


  //isLoggedIn middleware
middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "Please Login First!");
  res.redirect("/login");
}
module.exports = middlewareObj;
