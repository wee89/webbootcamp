var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCOKPY0gnN5zmClQ1UH-qpq_Eq_7qchSAY', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);

// test GIT
 
// Using callback
geocoder.geocode('29 champs elysée paris', function(err, res) {
    if(err){
        console.log("Error from callback: " + err);
    }
    console.log(res);
});
 
// Or using Promise
geocoder.geocode('29 champs elysée paris')
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.log("error from Promise: " + err);
  });

  geocoder.geocode("Coffee Plus", function(err, data){
    if(err || !data){
        console.log("Error from get data " + err);
    }
    console.log(data);
  });

// const googleMapsClient = require('@google/maps').createClient({
//     key: 'AAIzaSyCOKPY0gnN5zmClQ1UH-qpq_Eq_7qchSAY'
// });

// // Geocode an address.
// googleMapsClient.geocode({
//     address: '1600 Amphitheatre Parkway, Mountain View, CA'
//   }, function(err, response) {
//     if (err) {
//         console.log("err");
//     } 
//         console.log(response.json.results);
//   });
