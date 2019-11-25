var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");

//INDEX - Show all campgrounds
router.get("/", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});
// temporary link for test bootstrap4 navbar
router.get("/navbar", function(req, res){
    res.sendFile(__dirname + "/navbar.html");
});

//CREATE - add new campground to DB
router.post("/", function(req, res){
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
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

//SHOW - Show more info about one campground
router.get("/:id", function(req, res){
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

module.exports = router;