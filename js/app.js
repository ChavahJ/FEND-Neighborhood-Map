/*
* MODEL: your application’s stored DATA. Collections of models are collections of data.
* There should be at least 5 locations hard-coded in the model.
* http://stackoverflow.com/questions/20857594/knockout-filtering-on-observable-array
* Model decides content of the application.
*/

var listOfStops = [
    {
        name: "Kehillos Yaakov Synagogue",
        lat: 31.714564,
        lng: 34.990076,
        streets: ['arugot', 'kishon', 'sorek', 'uriya', 'miha'],
        description: "Just above the the corner of Kishon and Sorek. The first stop. ETA is 8:40 AM."
    },
    {
        name: "Bar Col",
        lat: 31.714856,
        lng: 34.993992,
        streets: ['sorek', 'nahshon', 'lakhish'],
        description: "Just after the corner where the bottom of Lachish and Sorek meet. The second stop. ETA is 8:41 AM."
    },
    {
        name: "Top of Ayalon Park",
        lat: 31.713816,
        lng: 34.996277,
        streets: ['sorek', 'lakhish'],
        description: "Just after where the top of Lachish intersects with Sorek. The third stop. ETA is 8:42 AM."
    },
    {
        name: "Top of Ayalon Street",
        lat: 31.712900,
        lng: 34.997843,
        streets: ['ayalon', 'dolev', 'achzib', 'refa\'im'],
        description: "Where Ayalon and Dolev intersect, near Best Market. The fourth stop. ETA is 8:43 AM."
    },
    {
        name: "North Dolev",
        lat: 31.715687,
        lng: 34.998155,
        streets: ['dolev', 'katlav', 'ktalav', 'timna'],
        description: "Just before Dolev and Katlav meet. The fifth stop. ETA is 8:44 AM."
    },
    {
        name: "Top of Dolev",
        lat: 31.712247,
        lng: 34.999441,
        streets: ['dolev', 'mata', 'shimshon', 'el al', 'alexander'],
        description: "Just before the corner of Dolev and Shimshon. The sixth stop. ETA is 8:45 AM."
    },
    {
        name: "Bottom of Shimshon",
        lat: 31.714460,
        lng: 35.000503,
        streets: ['shimshon', 'hayarden'],
        description: "Just before Shimshon intersects with HaYarden. The seventh stop. ETA is 8:46 AM."
    },
    {
        name: "HaYarden",
        lat: 31.710867,
        lng: 35.001394,
        streets: ['hayarden', 'refa\'im', 'maor'],
        description: "Just after the corner of HaYarden and Refa'im. The eighth stop. ETA is 8:46 AM."
    },
    {
        name: "HaYarkon",
        lat: 31.707981,
        lng: 34.998087,
        streets: ['hayarkon', 'luz'],
        description: "At the midpoint between HaYarden and Luz. The ninth stop. ETA is 8:47 AM."
    },
    {
        name: "Bottom of Ayalon Park",
        lat: 31.711840,
        lng: 34.990501,
        streets: ['kishon', 'ayalon', 'no\'am', 'gilo', 'ramot', 'luz', 'shaham'],
        description: "After the corner of Ayalon and Kishon. The tenth stop. ETA is 8:48 AM."
    },
    {
        name: "Grill Burger",
        lat: 31.712675,
        lng: 34.988595,
        streets: ['kishon', 'shaham', 'tse\'elim', 'tsefat', 'arugot'],
        description: "On the corner of Kishon and Tse'elim. The eleventh stop. ETA is 8:49 AM."
    },
    {
        name: "Hever",
        lat: 31.713287,
        lng: 34.982389,
        streets: ['tse\'elim', 'hever', 'ein gedi', 'hebron', 'kiryat arba', 'tiberias'],
        description: "After the roundabout where Tse'elim and Hever intersect. The final stop. ETA is 8:50 AM."
    }
];

/*
* VIEW: your application’s bindings.
* Implement a list view of the set of locations defined above.
*/

var Stop = function(data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.streets = ko.observableArray(data.streets);
    this.description = ko.observable(data.description);
}

//GOOGLE MAPS API
var map;
//create an infowindow outside of the loop so only one window is open at a time
var infowindow;
var marker;
var position = {lat: this.lat, lng: this.lng};

function initMap() {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 31.714564, lng: 34.990076},
        zoom: 16,
    });
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
    self.listOfStops = ko.observableArray([]);
    self.markers= [];
    self.currentStop = ko.observable();
    self.searchStops = ko.observable('');

    // In case of error webpage does one of the following:
    // A message is displayed notifying the user that the data can't be loaded,
    // OR There are no negative repercussions to the UI.
    function googleError() {
        alert("The Google Maps application has encountered an error.  Please try again later.");
    };

    listOfStops.forEach(function(item){
        //create new markers
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(self.lat, self.lng ),
            map: self.googleMap,
            animation: google.maps.Animation.DROP,
            title: self.name
        });

        self.markers.push(marker);
        self.listOfStops.push( new Stop(item) );
    });

    //determine which infoWindow is showing and which marker is bouncing
    self.setCurrentStop = function(data) {
        self.currentStop(data);
    };

    self.filteredStops = ko.computed(function () {
        var search = self.searchStops().toLowerCase();
        if(!search) {
            return self.listOfStops();
        } else {
            return ko.utils.arrayFilter(self.listOfStops(), function(item) {
                return item.streets.indexOf(search) !== -1;
            });
        }
    }, self);
}

function loadMap() {
  initMap();
  ko.applyBindings(new ViewModel());
}
