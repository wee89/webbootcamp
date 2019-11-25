var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//get data in form
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://www.photosforclass.com/download/flickr-7121865553"},
    {name: "Granite Hill", image: "https://www.photosforclass.com/download/flickr-2164766085"},
    {name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/flickr-14465824873"}
];

app.get("/", function(req, res){
    res.render("landing");
});
app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});
// temporary link for test bootstrap4 navbar
app.get("/navbar", function(req, res){
    res.sendfile("navbar.html");
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    // // redirect back to campgrounds page
    res.redirect("campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(3000, function(){
    console.log("The YelpCamp server has started!");
});