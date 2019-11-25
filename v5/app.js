var express     = require("express"), 
    app         = express(),
    bodyParser  = require("body-parser");
//start v2
var mongoose    = require("mongoose");
//start v3
var Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");


//set mongoose to connect db
mongoose.connect("mongodb://localhost/yelp_camp_v5", {useNewUrlParser: true});

//get data in form
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

// Campground.create({
//     name: "Granite Hill", 
//     image: "https://www.photosforclass.com/download/flickr-2164766085",
//     description: "This is a huge granite hill, no bathrooms no water. Beautiful granite!"
// }, function(err, campground){
//     if(err){
//         console.log("OH NO!");
//         console.log(err);
//     } else{
//         console.log("NEWLY CREATE campground: ");
//         console.log(campground);
//     }
// });


// var campgrounds = [
//     {name: "Salmon Creek", image: "https://www.photosforclass.com/download/flickr-7121865553"},
//     {name: "Granite Hill", image: "https://www.photosforclass.com/download/flickr-2164766085"},
//     {name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/flickr-14465824873"}
// ];

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
    
});
// temporary link for test bootstrap4 navbar
app.get("/navbar", function(req, res){
    res.sendFile("navbar.html");
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;

    var newCampground = {name: name, image: image, description: desc};
    // create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            // redirect back to campgrounds page
            res.redirect("campgrounds");
        }
    });
});

//NEW - Show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

//SHOW - Show more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
            // console.log(foundCampground);
        }
    });
});

// ===================
// COMMENTs ROUTES
// ===================
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    // look up campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();

                    // redirect campground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    
    
    
});

app.listen(3000, function(){
    console.log("The YelpCamp server has started!");
});