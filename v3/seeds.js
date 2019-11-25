var mongoose    = require("mongoose");
var Comment     = require("./models/comment");
var Campground  = require("./models/campground");

var data = [
    {
        name: "Cloud's Rest",
        image: "http://goingtogetlost.com/wp-content/uploads/2016/07/clouds-rest-19-1024x621.jpg",
        description: "Blah blah blah1"
    },
    {
        name: "Desert Mesa",
        image: "https://i.pinimg.com/originals/62/10/5f/62105f5d691995f48208a2f7a45d0585.jpg",
        description: "Blah blah blah2"
    },
    {
        name: "Canyon Floor",
        image: "https://www.oars.com/wp-content/uploads/2015/12/gc-dory-phantom-whitmore-007.jpg",
        description: "Blah blah blah3"
    }
]
function seedDB(){
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Removed campgrounds!");
        }
        //add a few campgrounds
        data.forEach(function(seed, index){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("added a campground");
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer" + index
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save(function(err, data){
                                    if(err){
                                        console.log(err);
                                    }else{
                                        // console.log(data);
                                        console.log("Passed");
                                    }
                                });
                                console.log("Created new comment");
                            }  
                        }
                    );
                }
            });
        });
    });
}

module.exports = seedDB;