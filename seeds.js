var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment"); 

var data = [
      {
        name: "Cloud's Rest",
        image: "images/1.jpg",
        description: "blah blah blah"
      },
      {
        name: "Desert Mesa",
        image: "images/2.jpg",
        description: "blah blah blah"
      },
      {
        name: "Canyon Floor",
        image: "images/3.jpg",
        description: "blah blah blah"
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
