var mongoose    = require("mongoose");
var Comment     = require("./models/comment");
var Campground  = require("./models/campground");

var data = [
    {
        name: "Cloud's Rest",
        image: "http://goingtogetlost.com/wp-content/uploads/2016/07/clouds-rest-19-1024x621.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ducimus consectetur adipisci placeat voluptatem laboriosam corporis nemo dignissimos necessitatibus dolores iure saepe autem, iste dolor praesentium magnam nesciunt architecto quas vero natus. Reiciendis saepe eaque odio fuga asperiores velit corrupti iusto dolorem pariatur? Temporibus rem sit, nisi debitis neque obcaecati illum sint eos recusandae quaerat sequi vero, fugiat itaque quam aut! Et fugiat facilis quis laudantium commodi dolore, architecto, voluptatem repellendus, debitis consectetur labore cupiditate hic. Nisi tempora ut corporis omnis obcaecati minima enim culpa doloremque nemo, minus suscipit rem dolorem iure officia! Quo quibusdam accusamus nemo impedit magni dignissimos."
    },
    {
        name: "Desert Mesa",
        image: "https://i.pinimg.com/originals/62/10/5f/62105f5d691995f48208a2f7a45d0585.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ducimus consectetur adipisci placeat voluptatem laboriosam corporis nemo dignissimos necessitatibus dolores iure saepe autem, iste dolor praesentium magnam nesciunt architecto quas vero natus. Reiciendis saepe eaque odio fuga asperiores velit corrupti iusto dolorem pariatur? Temporibus rem sit, nisi debitis neque obcaecati illum sint eos recusandae quaerat sequi vero, fugiat itaque quam aut! Et fugiat facilis quis laudantium commodi dolore, architecto, voluptatem repellendus, debitis consectetur labore cupiditate hic. Nisi tempora ut corporis omnis obcaecati minima enim culpa doloremque nemo, minus suscipit rem dolorem iure officia! Quo quibusdam accusamus nemo impedit magni dignissimos."
    },
    {
        name: "Canyon Floor",
        image: "https://www.oars.com/wp-content/uploads/2015/12/gc-dory-phantom-whitmore-007.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ducimus consectetur adipisci placeat voluptatem laboriosam corporis nemo dignissimos necessitatibus dolores iure saepe autem, iste dolor praesentium magnam nesciunt architecto quas vero natus. Reiciendis saepe eaque odio fuga asperiores velit corrupti iusto dolorem pariatur? Temporibus rem sit, nisi debitis neque obcaecati illum sint eos recusandae quaerat sequi vero, fugiat itaque quam aut! Et fugiat facilis quis laudantium commodi dolore, architecto, voluptatem repellendus, debitis consectetur labore cupiditate hic. Nisi tempora ut corporis omnis obcaecati minima enim culpa doloremque nemo, minus suscipit rem dolorem iure officia! Quo quibusdam accusamus nemo impedit magni dignissimos."
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