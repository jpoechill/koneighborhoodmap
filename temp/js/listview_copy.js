// Javascript for Neighborhood Mapp App

var model = {
    app_name: ko.observable("Search Title"),
    query: ko.observable(''),
    locations: ko.observableArray([
        {
            name: "Grand Lake Theatre"
        },
        {
            name: "Piedmont Theatre"
        },
        {
            name: "The New Parkway Theater"
        }
    ]),
    locations2: ko.observableArray([])
};

// ** -- OCTOPUS -- ** //

var controller = {
    init: function () {

        model.query.subscribe(controller.search);

        ko.applyBindings(model);
    },

    query: ko.observable(''),

    locations: model.locations,

    sayHello: function (value) {
        console.log ("Input value: " + value);
        // console.log ("Hello, World!");
    },

    search: function() {
        var self = this;

        //creates array for the locations to be held
        this.locationList = ko.observableArray([]);


        // locations = model.locations;

        // model.locations(model.locations2.slice(0));

        // bird = controller.locations.removeAll();

        // for (var x in bird) {
        //     console.log(bird[x].name);
        // }

        // return function () {
        //     // console.log("Hello, World!");
        //     // console.log(controller.locations()[0]);

        //     // Remove all locations
        //     controller.locations.removeAll();

        //     // console.log(model.locations());
        //     // console.log(bird);
        // }(model.locations());
        // for (var x in bird) {
        //     console.log(controller.locations()[x]);
        // }



        // console.log (locations()[0].name);

        // locations.removeAll();

        // console.log (model.locations);

        // console.log(locations.removeAll());

        // console.log (bird);
        // console.log (locations());

        // for(var x in model.locations) {
        //     console.log(model.locations[x].name);
        //     // console.log(locations[x].name());

        //   // if(locations[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        //   //   locations.push(locations[x]);
        //   // }
        // }
    }
};

// ** -- viewModel // Model locations -- ** //

// $(function() {

// var locations = [
//   {name:"Grand Lake Theater"},
//   {name:"The Paramount"},
//   {name:"AMC Baystreet 16"},
// ];

// ** -- viewModel -- ** //

// var viewModel = {
//       // locations: ko.observableArray(locations),
//       query: ko.observable(''),

//       search: function(value) {
//         // remove all the current beers, which removes them from the view
//         viewModel.locations.removeAll();

//         for(var x in locations) {
//           if(locations[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
//             viewModel.locations.push(locations[x]);
//           }
//         }
//       }
// };

// viewModel.query.subscribe(viewModel.search);
// ko.applyBindings(viewModel);


  // $(function() {
  //   var beers = [
  //     {name:"Dragon's Milk",  brewery:"New Holland Brewing Company",  style:"Imperial Stout"},
  //     {name:"Oberon",         brewery:"Bell's",                       style:"Wheat"},
  //     {name:"El Molé Ocho",   brewery:"New Holland Brewing Company",  style:"Mole Ale"},
  //   ];

  //   var viewModel = {
  //     beers: ko.observableArray(beers),

  //     query: ko.observable(''),

  //     search: function(value) {
  //       viewModel.beers.removeAll();
  //       for(var x in beers) {
  //         if(beers[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
  //           viewModel.beers.push(beers[x]);
  //         }
  //       }
  //     }
  //   };

  //   viewModel.query.subscribe(viewModel.search);

  //   ko.applyBindings(viewModel);
  // });

controller.init();