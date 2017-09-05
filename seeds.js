var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
      {
        name: "Cloud's Rest",
        image: "images/1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        name: "Desert Mesa",
        image: "images/2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        name: "Canyon Floor",
        image: "images/3.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }

]

      function seedDB(){
      //remove all campgrounds
          Campground.remove({}, function(err){
              if(err){
              console.log(err);
              }
              console.log("campgrounds have been removed !");
              //add a few campgrounds
              data.forEach(function(seed){

                    Campground.create(seed, function(err, campground){

                        if(err){
                          console.log(err);
                        }
                        else{
                          console.log("added a Campground");
                          //create a comment
                          Comment.create(
                            {
                            text: "This is lorem",
                            author: "Homer"
                          }, function(err, comment){
                              if(err){
                                console.log(err);
                              }
                              else{
                              campground.comments.push(comment);
                              campground.save();
                              console.log("comment created succesfully");
                              }
                          });
                        }

                    });

               });
          });

          // add a few comments(future)
      }
module.exports = seedDB;
