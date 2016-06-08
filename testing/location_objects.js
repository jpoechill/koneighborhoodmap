// Utilizing objects, Neighborhood Map App

// Location object constructor
var Location = function (data) {
    this.name = data.name;
    this.description = data.description;
    this.long = data.long;
    this.lat = data.lat;
}

Location.prototype.sayHello = function() {
    console.log(this.name);
    console.log("Hello, World!");
};

Location.prototype.drawMarker = function(coords) {
    console.log("This is the draw marker function!");
};

Location.prototype.stopAnimation = function() {
    console.log("Hello, World!");
};


Location.prototype.ajax = function() {
    var self = this;
    console.log("Hello, World!");
};

var locations = [
    {
            name: "Grand Lake",
            description: "Beautiful theater with decent movie selection - free popcorn on weekdays!",
            long: 37.811539,
            lat: -122.247356
    },
    {
            name: "The Paramount",
            description: "Beautiful theater with decent movie selection - free popcorn on weekdays!",
            long: 37.827362,
            lat: -122.250927
    }
]

// var location_A = {
//     this.name = "AMC Baystreet",
//     this.description: "Movie theater with 3D.",
//     this.checkins: 123,
//     this.long: data.long,
//     this.lat: data.lat
// };

// var location_B = {
//     this.name = "Grand Lake",
//     this.description: "Movie theater by lake.",
//     this.checkins: 234,
//     this.long: data.long,
//     this.lat: data.lat
// };

// var location_C = {
//     this.name = "The Paramount",
//     this.description: "Movie theater in downtown.",
//     this.checkins: 235,
//     this.long: data.long,
//     this.lat: data.lat
// };

// All locations places
var placesList = [];

// console.log(locations);
// Create new Locations objects and add to array
locations.forEach (function(locations_model) {
    placesList.push(new Location(locations_model));
});

placesList.forEach(function(place) {
  place.sayHello();
});

// console.log(placesList);

// console.log("Hello, World!");