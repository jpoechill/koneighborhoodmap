// Javascript for Neighborhod Map App
/*jshint -W089 */

// ** -- MODEL -- ** //
var model = {
    isToggled: false,
    app_name: ko.observable("PO's Movie Theaters"),
    sorted: ko.observable(0),
    query: ko.observable(''),
    locations_names: ko.observableArray([]),
    locations: ko.observableArray([
        {
            name: "",
            id: 0,
            venue_id: "",
            marker: null,
            photos: null,
            description: "Beautiful theater with decent movie selection - free popcorn on weekdays!",
            address: null,
            phonenumber: "No phone",
            url: "No homepage",
            twitter: null,
            checkins: null,
            long: 37.811539,
            lat: -122.247356
        },
        {
            name: "",
            id: 1,
            venue_id: "",
            marker: null,
            photos: null,
            description: "Reclining with enough room for people to get by without you budging.",
            address: null,
            phonenumber: "No phone",
            url: "No homepage",
            twitter: null,
            checkins: null,
            long: 37.827362,
            lat: -122.250927
        },
        {
            name: "",
            id: 2,
            venue_id: "",
            marker: null,
            photos: null,
            description: "Fun place to go, grab a snack, and enjoy a comfortable movie experience.",
            address: null,
            phonenumber: "No phone",
            url: "No homepage",
            twitter: null,
            checkins: null,
            long: 37.813960,
            lat: -122.267457
        },
        {
            name: "",
            id: 3,
            venue_id: "",
            marker: null,
            photos: null,
            description: "Very clean and organized lobby, includes bar separate of candy and popcorn area.",
            address: null,
            phonenumber: "No phone",
            url: "No homepage",
            twitter: null,
            checkins: null,
            long: 37.833407,
            lat: -122.291631
        },
        {
            name: "",
            id: 4,
            venue_id: "",
            marker: null,
            photos: null,
            description: "Elaborate art deco architecture, good occasional history tour of it.",
            address: null,
            phonenumber: "No phone",
            url: "No homepage",
            twitter: null,
            checkins: null,
            long: 37.809874,
            lat: -122.268523
        },
        {
            name: "",
            id: 5,
            venue_id: "",
            marker: null,
            photos: null,
            description: "Large venue with a pretty distinct interior styling. Street parking is a bit sketchy though.",
            address: null,
            phonenumber: "No phone",
            url: "No homepage",
            twitter: null,
            checkins: null,
            long: 37.784373,
            lat: -122.236023
        },
        {
            name: "",
            id: 6,
            venue_id: "",
            marker: null,
            photos: null,
            description: "Theater complex with multiple screens featuring new release films, plush seating & concession stand.",
            address: null,
            phonenumber: "No phone",
            url: "No homepage",
            twitter: null,
            checkins: null,
            long: 37.796034,
            lat: -122.277372
        }
    ])
};

// ** -- VIEW MODEL -- ** //

var controller = {
    search: function (value) {
        model.locations_names.removeAll();

        if (value === "") {
            controller.showallMarkers();
        } else {
            controller.removeallMarkers();
        }

        for (var location in model.locations()) {
            if (model.locations()[location].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                // Local observable array
                model.locations_names.push(model.locations()[location]);
                controller.showthisMarker(model.locations()[location].marker);
            }
        }
    },

    showthisMarker: function (marker) {
        marker.setVisible(true);
    },

    removeallMarkers: function () {
        for (var marker in model.locations()) {
            model.locations()[marker].marker.setVisible(false);
        }
    },

    showallMarkers: function () {
        for (var marker in model.locations()) {
            model.locations()[marker].marker.setVisible(true);
        }
    },

    showInfo: function () {

    },

    listviewClick: function (){
        for (var i = 0, len = model.locations().length; i < len; i ++){
            if (i !== this.id){
                // model.locations()[i].marker.setVisible(false);
            } else {
                model.locations()[i].marker.setVisible(true);
            }
        }

        google.maps.event.trigger(model.locations()[this.id].marker, 'click');
    },

    fireAll: function (){
        for (var i = 0, len = model.locations().length; i < len; i ++) {
            google.maps.event.trigger(model.locations()[i].marker, 'click');
        }
    },

    checkWindowresize: function () {
        var w = window.outerWidth;

        if (w <= 400 && model.isToggled === true) {
            $("#wrapper").toggleClass("toggled");
            model.isToggled = false;
        } else {
            model.isToggled = false;
        }
    },

    setupJquery: function () {
        // Menu toggles
        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");

            if (model.isToggled === false){
                model.isToggled = true;
            } else {
                model.isToggled = false;
            }

        });
    },

    sortItems_byname: function (){
        // Sort by name (alphabetical)
        var objects_sorted = model.locations_names().sort(
            function(a, b){
            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();

            console.log("Sorting: " + model.sorted());

            if (nameA < nameB) {//sort string ascending
                return -1;
            }
            if (nameA > nameB) {
                return 1;//default return value (no sorting)
            }
        });

        // Check if already sorted, and reverse if so
        if (model.sorted() === 0) {
            console.log(model.sorted());
            model.sorted(1);
            model.locations_names(objects_sorted);
        } else if (model.sorted() == 1) {
            console.log(model.sorted());
            model.sorted(0);
            model.locations_names(objects_sorted.reverse());
        }
    },

    createContent_String: function (a, b, c, d, e, f, g, h){
        var photos_markup = "";

        for (var i in a) {
            photos_markup = photos_markup + "<img src=" + a[i] +  ' width=\"96\" height=\"96\" style=\"margin-top:4px; margin-bottom:2px;\"> ';
        }

        // Check if homepage exists

        f != "No homepage" ? f = "<strong>Homepage:</strong> <a href=\'" + f + "\'>" + f + "</a><br />" : f = "";

        // Create full content string
        contentString = $('<div><div><span><h4 style="margin-top: 0px; margin-bottom: 0px;">' +
        b + "<br />" + photos_markup + '<br /><strong></h4>Description:</strong> ' +
        c + '</span><br /><p><strong>Address:</strong> ' +
        d + "<br /><strong>Phone Number:</strong> " +
        e + "<br />" +
        f + "<strong>More Details:</strong> <a href=\"https://foursquare.com/venue/" +
        g + "\">https://foursquare.com/venue/" + g +"</a><br /><strong>Checkins:</strong> " +
        h + "</p></div></div>");

        return contentString;
    },

    init: function () {
        this.setupJquery();
        model.query.subscribe(controller.search);
        ko.applyBindings(model);
    },

    // Set up map
    initMap: function () {
        var self = this;

        // Generate markers for each location
        for (var i = 0, len = model.locations().length; i < len; i++) {
            var this_venue_id;

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
                    }
                });
            })(i);
        }
    },

    drawMarkers: function (n, map){
        var model_locs = model.locations()[n];

        contentString = controller.createContent_String(
            model_locs.photos, model_locs.name, model_locs.description, model_locs.address,
            model_locs.phonenumber, model_locs.url, model_locs.venue_id, model_locs.checkins
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
        for (var i in partial_object) {
            keys.push(i);
        }

        // Sort through standing object, and replace var per matching key
        for (var r in local) {
            for (var t = 0; t <= keys.length; t++){
                // If match found
                if (r == keys[t]) {
                    // Replace key with var
                    local[r] = partial_object[keys[t]];
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
                var ven_twitter = "@" + data.response.venue.contact.twitter;
                var ven_checkins = data.response.venue.stats.checkinsCount;

                var photo_urls = [];
                var get_photo;

                photo_count = data.response.venue.photos.count;
                if (photo_count > 5) {
                    photo_count = 5;
                }

                for (var i = 0; i < photo_count; i++) {
                    get_photo = data.response.venue.photos.groups[0].items[0].prefix + "240x240" + data.response.venue.photos.groups[0].items[i].suffix;
                    photo_urls.push(get_photo);
                }

                // Create object template
                var repl_object = {
                    name: ven_name,
                    photos: photo_urls,
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
              }
            });
        })(i);
    }
};

// Run it!
controller.init();