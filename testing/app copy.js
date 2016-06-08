// Javascript for Neighborhod Map App

// ** -- MODEL -- ** //
var model = {
    locations_names: ko.observableArray([]),
    locations: ko.observableArray([
        {
            name: "",
            id: 0,
            venue_id: "",
            marker: null,
            description: "Beautiful theater with decent movie selection - free popcorn on weekdays!",
            long: 37.811539,
            lat: -122.247356
        },
        {
            name: "",
            id: 1,
            venue_id: "",
            marker: null,
            description: "Reclining with enough room for people to get by without you budging.",
            long: 37.827362,
            lat: -122.250927
        },
        {
            name: "",
            id: 2,
            venue_id: "",
            marker: null,
            description: "Fun place to go, grab a snack, and enjoy a comfortable movie experience.",
            long: 37.813960,
            lat: -122.267457
        }
    ])
};

// ** -- VIEW MODEL -- ** //

var controller = {

    showthisMarker: function (marker) {
        marker.setVisible(true);
    },

    createContent_String: function (a, b, c, d, e, f, g){
        photo_with_image = "<img src=" + a +  ' width=\"26\" height=\"26\" style=\"margin-top:4px; margin-bottom:2px;\"> ';

        // Check if homepage exists
        if (f != "No homepage") {
            f = "<strong>Homepage:</strong> <a href=\'" + f + "\'>" + f + "</a><br />";
        } else {
            f = "";
        }

        // Create full content string
        contentString = $('<div><div><span><h4 style="margin-top: 0px; margin-bottom: 0px;">' +
        b + "<br />" + photo_with_image + '<br /><strong></h4>Description:</strong> ' +
        c + '</span><br /><p><strong>Address:</strong> ' +
        d + "<br /><strong>Phone Number:</strong> " +
        e + "<br />" +
        f + "<strong>Checkins:</strong> " +
        g + "</p></div></div>");

        return contentString;
    },

    init: function () {
        ko.applyBindings(model);
    },

    initMap: function () {
        var map;
        var infowindow = [];
        var self = this;

        // Generate markers for each location
        for (var i = 0, len = model.locations().length; i < len; i++) {
            var this_venue_id;

            var fsqrRequestTimeout = setTimeout(function() {
                alert("Could not receive full data from the foursquare. Please refresh and try again.");
            }, 10000);

            // Call ajax for each venue's ID
            (function(key){
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "https://api.foursquare.com/v2/venues/search?ll=" + model.locations()[key].long + "," + model.locations()[key].lat + "&oauth_token=X0ZIFSKLDPONPOQ3EMQLQFZDNYM1IMOAYUMWFDMXHE1ZCIVQ&v=20160529",
                    error: function () {
                        alert("There was an error receiving the API.");
                    },
                    success: function(data) {
                        // Grab venue ID for this lat/long
                        this_venue_id = data.response.venues[0].id;

                        // Update this model's venue id item
                        self.update_Locations_info(key, {venue_id: this_venue_id});

                        // Now make call for this venue's secondary detail
                        self.secondAjaxcall(key, this_venue_id);

                        // Clear time out Request
                        clearTimeout(fsqrRequestTimeout);
                    }
                });
            })(i);
        }
    },

    drawMarkers: function (n, map){
        var model_locs = model.locations()[n];

        contentString = controller.createContent_String(
            model_locs.photo, model_locs.name, model_locs.description,
            model_locs.address, model_locs.phonenumber, model_locs.url, model_locs.checkins
        );

        // Create an infoWindow
        infoWindow = new google.maps.InfoWindow({content: contentString[0], maxWidth: 500});

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(model.locations()[n].long, model.locations()[n].lat),
            animation: google.maps.Animation.DROP,
            map: map,
            info: contentString[0]
        });

        marker.addListener('click', toggleBounce);

        // Set the content of infoWindow
        infoWindow.setContent(marker.info);

        function toggleBounce() {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);}, 700);
        }

        // Add click event listener to marker which will open infoWindow
        google.maps.event.addListener(marker, 'click', function() {
            map.setCenter(marker.getPosition());
            infoWindow.setContent(this.info);
            infoWindow.open(map, this);
        });

        controller.update_Locations_info(n, {marker: marker});
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

    secondAjaxcall: function (i, v_id) {
        // Ajax call for venue Venue Info
        var self = this;

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.809874, lng: -122.268523},
          zoom: 13,
        });

        var fsqrRequestTimeout = setTimeout(function() {
            alert("There was an error receiving the API.");
        }, 8000);

        (function(key){
            $.ajax({
              type: "GET",
              dataType: "jsonp",
              url: "https://api.foursquare.com/v2/venues/" + v_id + "?oauth_token=X0ZIFSKLDPONPOQ3EMQLQFZDNYM1IMOAYUMWFDMXHE1ZCIVQ&v=20160529",
              error: function () {
                alert("There was an error receiving the API.");
              },
              success: function(data) {
                var ven_name = data.response.venue.name;
                var ven_phone = data.response.venue.contact.formattedPhone;
                var ven_address = data.response.venue.location.formattedAddress[0] + " " + data.response.venue.location.formattedAddress[1];
                var ven_url = data.response.venue.url;
                var ven_twitter = "@" + data.response.venue.contact.twitter;
                var ven_checkins = data.response.venue.stats.checkinsCount;

                var photo_url = [];
                photo_url[0] = data.response.venue.photos.groups[0].items[0].prefix + "240x240" + data.response.venue.photos.groups[0].items[0].suffix;

                // Create object template
                var repl_object = {
                    name: ven_name,
                    photo: photo_url,
                    address: ven_address,
                    phonenumber: ven_phone,
                    url: data.response.venue.url,
                    twitter: ven_twitter,
                    checkins: ven_checkins,
                };

                self.update_Locations_info(key, repl_object);

                model.locations_names.push(model.locations()[key]);

                // Create Markers
                self.drawMarkers(key, map);

                // Clear time out Request
                clearTimeout(fsqrRequestTimeout);
              }
            });
        })(i);
    }
};

// Run it!
controller.init();