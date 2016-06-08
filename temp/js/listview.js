// Javascript for Neighborhood Mapp App

var model = {
    locations: ko.observableArray([
        {
            name: "Jack Smith"
        },
        {
            name: "Jill Jones"
        },
        {
            name: "Jane Chung"
        }
    ]),
};

// ** -- OCTOPUS -- ** //

var controller = {
    init: function () {
        controller.query.subscribe(controller.search);

        ko.applyBindings(controller);
    },


    query: ko.observable(''),

    // Local array for locations to be held
    locations: ko.observableArray([model.locations]),

    // location_names: ko.observableArray([model.locations]),

    search: function(value) {
        controller.locations.removeAll();

        // if (value == '') return;

        for (var location in model.locations()) {
            // console.log(model.locations()[location].name);

            // Each location's name to lowercase
            // console.log(model.locations()[location].name.toLowerCase());

            // Current value of user's input search
            // console.log(value);

            if (model.locations()[location].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                // Local observable array
                controller.locations.push(model.locations()[location]);
            }
        };
    }
};


controller.init();