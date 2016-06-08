// Javascript for Cat Clicker App
var model = {
    app_name: ko.observable("Po's Movie Theaters"),
    locations: ko.observableArray([
        {
            name: "Grand Lake Theatre",
            venue_id: "123",
            description: "Beautiful theater with decent movie selection - free popcorn on weekdays!",
            long: 37.811539,
            lat: -122.247356
        },
        {
            name: "Piedmont Theatre",
            venue_id: "",
            description: "Reclining with enough room for people to get by without you budging.",
            long: 37.827362,
            lat: -122.250927
        },
        {
            name: "The New Parkway Theater",
            venue_id: "",
            description: "Fun place to go, grab a snack, and enjoy a comfortable movie experience.",
            long: 37.813960,
            lat: -122.267457
        },
        {
            name: "AMC Bay Street 16",
            venue_id: "",
            description: "Very clean and organized lobby, includes bar separate of candy and popcorn area.",
            long: 37.833407,
            lat: -122.291631
        },
        {
            name: "The Paramount Theatre",
            venue_id: "",
            description: "Elaborate art deco architecture, good occasional history tour of it.",
            long: 37.809874,
            lat: -122.268523
        },
        {
            name: "The Palace Theatre",
            venue_id: "",
            description: "Large venue with a pretty distinct interior styling. Street parking is a bit sketchy though.",
            long: 37.784373,
            lat: -122.236023
        }
    ])
};

// ** -- OCTOPUS -- ** //
var controller = {
    init: function () {
        this.setup_jq();
        this.sayHello();

        // model = ko.observableArray()
        ko.applyBindings(model);
    },

    update_Locations_info: function(index, new_attr) {
        // Clone/duplicate objects
        var local = jQuery.extend(true, {}, model.locations()[index]);
        var partial_object = jQuery.extend(true, {}, new_attr);

        // Set up keys to be replaced
        var keys = [];
        for (i in partial_object) {
            keys.push(i);
        }

        // Sort through standing object, and replace var per matching key
        for (i in local) {
            for (var t = 0; t <= keys.length; t++){
                // If match found
                if (i == keys[t]) {
                    // Replace key with var
                    local[i] = partial_object[keys[t]];
                }
            }
        }

        // Make change
        model.locations.replace(model.locations()[index], local);
    },

    sortItems_byname: function (){
        // Sort by name (alphabetical)
        objects_sorted = model.locations().sort(
            function(a, b){
            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();

            console.log("Sorting: " + model.sorted());

            if (nameA < nameB) {//sort string ascending
                // model.sorted(1);
                return -1;
            }
            if (nameA > nameB) {
                return 1;
                return 0; //default return value (no sorting)
            }
        });

        // Check if sorted, and reverse if so
        if (model.sorted() == 0) {
            console.log(model.sorted());
            model.sorted(1);
            model.locations(objects_sorted);
        } else if (model.sorted() == 1) {
            console.log(model.sorted());
            model.sorted(0);
            model.locations(objects_sorted.reverse());
        }
    },

    generateMarkers: function (n, map){
        contentString = $('<div><div><span>' +
        '<h4>' + model.locations()[n].name + '</h4>'+
        model.locations()[n].description + '</span><br /><p>' + "<strong>" + model.locations()[n].venue_id +
        "</strong></p></div></div>");

        //Create an infoWindow
        infoWindow = new google.maps.InfoWindow({content: contentString[0]});

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(model.locations()[n].long, model.locations()[n].lat),
            map: map,
            info: contentString[0]
        });
        //set the content of infoWindow
        infoWindow.setContent( marker.info );

        //add click event listener to marker which will open infoWindow
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(this.info);
            infoWindow.open(map, this);
        });
    },

    secondAjaxcall: function (i, v_id) {
            // Ajax call for venue Venue Info
        (function(key){
            $.ajax({
              type: "GET",
              dataType: "jsonp",
              url: "https://api.foursquare.com/v2/venues/" + v_id + "?oauth_token=X0ZIFSKLDPONPOQ3EMQLQFZDNYM1IMOAYUMWFDMXHE1ZCIVQ&v=20160529",
              success: function(data) {
                // aJaxInfo.name = data.response.groups;
                // console.log(v_id);
                // console.log("Hello, World!");
                // aJaxInfo.location = data.response.groups.venue.location.formattedAddress;
                // aJaxInfo.check_ins = data.response.groups.venue.stats.checkinsCount;
                // aJaxInfo.photos = "";
                // aJaxInfo.description = "";
                // console.log(data);
              }
            });
        })(i);
    },

    initMap: function () {
        var map;
        var infowindow = [];
        var self = this;

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.809874, lng: -122.268523},
          zoom: 13,
        });

        // Generate markers
        for (var i = 0; i < model.locations().length; i++) {
            var this_venue_id;

            // Ajax call for venue ID
            (function(key){
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    // data: model.locations[i],
                    url: "https://api.foursquare.com/v2/venues/search?ll=" + model.locations()[key].long + "," + model.locations()[key].lat + "&oauth_token=X0ZIFSKLDPONPOQ3EMQLQFZDNYM1IMOAYUMWFDMXHE1ZCIVQ&v=20160529",
                    success: function(data) {
                        this_venue_id = data.response.venues[0].id;
                        // model.locations()[key].venue_id = this_venue_id;
                        // console.log(this_venue_id);
                        // console.log(model.locations[key].name);
                        // console.log("Name: " model.locations()[key].name + ", Long: " + model.locations()[key].long + ", " + ", Lat: " + model.locations()[key].lat);
                        console.log("Venue Name: " + data.response.venues[0].name);
                        console.log("Longitude: " +  model.locations()[key].long + " Latitude: " + model.locations()[key].lat);
                        console.log("ID: " + this_venue_id);

                        self.update_Locations_info(key, {venue_id: this_venue_id});

                        // console.log(model.locations()[key].venue_id);

                        self.generateMarkers(key, map);

                        self.secondAjaxcall(key, this_venue_id);
                    }
                });
            })(i);
        }
    }
};
