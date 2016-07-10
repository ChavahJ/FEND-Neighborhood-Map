/*
* MODEL: your application’s stored DATA. Collections of models are collections of data.
* There should be at least 5 locations hard-coded in the model.
* http://stackoverflow.com/questions/20857594/knockout-filtering-on-observable-array
* Model decides content of the application.
*/

var allStops = [
    {
        name: "Kehillos Yaakov Synagogue",
        lat: 31.714564,
        lng: 34.990076,
        streets: ['arugot', 'kishon', 'sorek', 'uriya', 'miha'],
        description: "<strong>First Stop:</strong> Just above the the corner of Kishon and Sorek. ETA is 8:40 AM."
    },
    {
        name: "Bar Col",
        lat: 31.714856,
        lng: 34.993992,
        streets: ['sorek', 'nahshon', 'lakhish'],
        description: "<strong>Second Stop:</strong> Just after the corner where the bottom of Lachish and Sorek meet. ETA is 8:41 AM."
    },
    {
        name: "Top of Ayalon Park",
        lat: 31.713816,
        lng: 34.996277,
        streets: ['sorek', 'lakhish'],
        description: "<strong>Third Stop:</strong> Just after where the top of Lachish intersects with Sorek. ETA is 8:42 AM."
    },
    {
        name: "Top of Ayalon Street",
        lat: 31.712900,
        lng: 34.997843,
        streets: ['ayalon', 'dolev', 'achzib', 'refa\'im'],
        description: "<strong>Fourth Stop:</strong> Where Ayalon and Dolev intersect, near Best Market. ETA is 8:43 AM."
    },
    {
        name: "North Dolev",
        lat: 31.715687,
        lng: 34.998155,
        streets: ['dolev', 'katlav', 'ktalav', 'timna'],
        description: "<strong>Fifth Stop:</strong> Just before Dolev and Katlav meet. ETA is 8:44 AM."
    },
    {
        name: "Top of Dolev",
        lat: 31.712247,
        lng: 34.999441,
        streets: ['dolev', 'mata', 'shimshon', 'el al', 'alexander'],
        description: "<strong>Sixth Stop:</strong> Just before the corner of Dolev and Shimshon. ETA is 8:45 AM."
    },
    {
        name: "Bottom of Shimshon",
        lat: 31.714460,
        lng: 35.000503,
        streets: ['shimshon', 'hayarden'],
        description: "<strong>Seventh Stop:</strong> Just before Shimshon intersects with HaYarden. ETA is 8:46 AM."
    },
    {
        name: "HaYarden",
        lat: 31.710867,
        lng: 35.001394,
        streets: ['hayarden', 'refa\'im', 'maor'],
        description: "<strong>Eighth Stop:</strong> Just after the corner of HaYarden and Refa'im. ETA is 8:46 AM."
    },
    {
        name: "HaYarkon",
        lat: 31.707981,
        lng: 34.998087,
        streets: ['hayarkon', 'luz'],
        description: "<strong>Ninth Stop:</strong> At the midpoint between HaYarden and Luz. ETA is 8:47 AM."
    },
    {
        name: "Bottom of Ayalon Park",
        lat: 31.711840,
        lng: 34.990501,
        streets: ['kishon', 'ayalon', 'no\'am', 'gilo', 'ramot', 'luz', 'shaham'],
        description: "<strong>Tenth Stop:</strong> After the corner of Ayalon and Kishon. ETA is 8:48 AM."
    },
    {
        name: "Grill Burger",
        lat: 31.712675,
        lng: 34.988595,
        streets: ['kishon', 'shaham', 'tse\'elim', 'tsefat', 'arugot'],
        description: "<strong>Eleventh Stop:</strong> On the corner of Kishon and Tse'elim. ETA is 8:49 AM."
    },
    {
        name: "Hever",
        lat: 31.713287,
        lng: 34.982389,
        streets: ['tse\'elim', 'hever', 'ein gedi', 'hebron', 'kiryat arba', 'tiberias'],
        description: "<strong>Final Stop:</strong> After the roundabout where Tse'elim and Hever intersect. ETA is 8:50 AM."
    }
];

/*
* VIEW: your application’s bindings.
* Implement a list view of the set of locations defined above.
*/
//GOOGLE MAPS API
var map, marker, infowindow;
//create an infowindow outside of the loop so only one window is open at a time
function initMap() {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 31.714564, lng: 34.990076},
        zoom: 16,
    });
}

var Stop = function(data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.streets = ko.observableArray(data.streets);
    this.description = ko.observable(data.description);

    infowindow = new google.maps.InfoWindow();

    marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(data.lat, data.lng),
        animation: google.maps.Animation.DROP
    });

    marker.addListener('click', function() {
        infowindow.setContent('<h3>'+data.name+'</h3>' + '<p>' + data.description + '</p>');
        infowindow.open(map, this);
    });

    marker.isVisible = ko.observable(true);
}

/*
* VIEW MODEL/CONTROLLER: a pure-code representation of the data and operations on a UI.
* Implement a list view of the set of locations defined above.
* Provide a filter option that uses an input field to filter both the list view and the map markers displayed by default on load.
* The list view and the markers should update accordingly.
*/
var ViewModel = function() {
    var self = this;
    self.googleMap = map;
    self.allStops = ko.observableArray([]);
    self.filteredStops = ko.observableArray([]);
    self.markers = [];
    self.currentStop = self.allStops[0];
    self.searchOfStops = ko.observable(""); //holds query

    allStops.forEach(function(item){
            self.allStops.push( new Stop(item) );
        });

    self.filteredStops = ko.computed(function () {
        var search = self.searchOfStops().toLowerCase();
        if(!search) {
            return self.allStops();
        } else {
            return ko.utils.arrayFilter(self.allStops(), function(item) {
                if (item.streets.indexOf(search) !== -1) {
                    item.marker.setVisible(true);
                    return true;
                } else {
                    item.marker.setVisible(false);
                    return false;
                }
            });
        }
    }, self);

    self.setCurrentStop = function(data) {
        self.currentStop(data);
    };
}

function loadMap() {
  initMap();
  ko.applyBindings(new ViewModel());
}

// In case of error webpage does one of the following:
// A message is displayed notifying the user that the data can't be loaded,
// OR There are no negative repercussions to the UI.
function googleError() {
    alert("The Google Maps application has encountered an error.  Please try again later.");
};
