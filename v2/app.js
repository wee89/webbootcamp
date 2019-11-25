var express     = require("express"), 
    app         = express(),
    bodyParser  = require("body-parser");
//start v2
var mongoose = require("mongoose");

//set mongoose to connect db
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});

//get data in form
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
    
});
// temporary link for test bootstrap4 navbar
app.get("/navbar", function(req, res){
    res.sendfile("navbar.html");
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
    res.render("new");
});

//SHOW - Show more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    })
});

app.listen(3000, function(){
    console.log("The YelpCamp server has started!");
});