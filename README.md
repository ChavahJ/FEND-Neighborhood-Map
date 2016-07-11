##To Run This Application##
####Either:####

Download this repository to your computer, and open the index.html file in any browser,

####Or:####

Go here.


##To Complete This Project##

1. [x] Review our course JavaScript Design Patterns.
2. [x] Download the Knockout framework.
3. [ ] Knockout must be used to handle list, filter, and any other information on the page that is subject to changing state.
4. [ ] Things that should not be handled by knockout: anything the map api is used for, creating markers, tracking their click events, making the map, refreshing the map.
5. [x] Write code required to add a full-screen map to your page using the Google Maps API. For sake of efficiency, the map API should be called only once.
6. [x] Write code required to display map markers identifying at least 5 locations that you are interested in within this neighborhood. Your app should display those locations by default when the page is loaded.
7. [x] Implement a list view of the set of locations defined in step 4.
8. [x] Provide a filter option that uses an input field to filter both the list view and the map markers displayed by default on load.
9. [x] The list view and the markers should update accordingly. Providing a search function through a third-party API is not enough to meet specifications.
10. [ ] Add functionality using third-party APIs to provide information when a map marker or list view entry is clicked (ex. Yelp reviews, Wikipedia, Flickr images, etc). Note that StreetView and Places don't count as an additional 3rd party API because they are libraries included in the Google Maps API. Please provide attribution to the data sources/APIs you use.
11. [ ] Add functionality to animate a map marker when either the list item associated with it or the map marker itself is selected.
12. [ ] Add functionality to open an infoWindow with the information described in step 7 when either a location is selected from the list view or its map marker is selected directly.
13. [ ] The app's interface should be intuitive to use. For example, the input text area to filter locations should be easy to locate. It should be easy to understand what set of locations is being filtered. Selecting a location via list item or map marker should cause the map marker to bounce or in some other way animate to indicate that the location has been selected and associated info window should open above map marker with additional information.
14. [ ] Error Handling: In case of error (e.g. in a situation where a third party api does not return the expected result) we expect your webpage to do one of the following: A message is displayed notifying the user that the data can't be loaded, OR There are no negative repercussions to the UI. Note: Please note that we expect students to handle errors if the browser has trouble initially reaching the 3rd-party site as well. It is important to handle errors to give users a consistent and good experience with the webpage. We strongly encourage you to explore ways to handle errors in the library you are using to make API calls.

##Project Criteria##

####Interface Design####
* Responsiveness: All application components render on-screen in a responsive manner.
* Usability: All application components are usable across modern desktop, tablet, and phone browsers.

####App Functionality####
* Filter Locations via Text Input: Includes a text input field that filters the map markers and list items to locations matching the text input. Filter function runs error-free.
* List View: A list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied. Clicking a location on the list displays unique information about the location, and animates its associated map marker (e.g. bouncing, color change.) List functionality is responsive and runs error free.
* Map and Markers: 	Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied. Clicking a marker displays unique information about a location in either an infoWindow or DOM element. Markers should animate when clicked (e.g. bouncing, color change.)

####App Architecture####
* Proper Use of Knockout: Code is properly separated based upon Knockout best practices (follow an MVVM pattern, avoid updating the DOM manually with jQuery or JS, use observables rather than forcing refreshes manually, etc). Knockout should not be used to handle the Google Map API. There are at least 5 locations hard-coded in the model.

####Asynchronous Data Usage####
* Asynchronous API Requests: Application utilizes the Google Maps API and at least one non-Google third-party API. All data requests are retrieved in an asynchronous manner.
* Error Handling: Data requests that fail are handled gracefully using common fallback techniques (i.e. AJAX error or fail methods). 'Gracefully' means the user isn’t left wondering why a component isn’t working. If an API doesn’t load there should be some visible indication on the page (an alert box is ok) that it didn’t load. Note: You do not need to handle cases where the user goes offline.

####Location Details Functionality####
* Additional Location Data: Functionality providing additional data about a location is provided. Information can be provided either in the marker’s infoWindow, or in an HTML element in the DOM (a sidebar, the list view, etc.) Provide attribution for the source of additional data. For example, if using Foursquare, indicate somewhere in your UI and in your README that you are using Foursquare data.
* Error Free: Application runs errors free.
* Usability: Functionality is presented in a usable and responsive manner.

####Documentation####
* README: A README file is included detailing all steps required to run successfully the application.
* Comments: Comments are present and effectively explain longer code procedures.
* Code Quality: Code is formatted with consistent, logical, and easy-to-read formatting as described in the [Udacity JavaScript Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html).
