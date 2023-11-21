// Developed by Jimmy

var map;

//---------------------------------------------------------------
// Function to get user's location dynamically every 5 seconds
// And see if it is within a specified radius, 
// if they have entered within the range, navigation button pops up
//
// <Source: Tech Tips MO1 version 2>
//---------------------------------------------------------------

function showMap() {
  // Defines and initiates basic mapbox data
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ';
  map = new mapboxgl.Map({
    container: 'map', // Container ID
    style: 'mapbox://styles/mapbox/streets-v11', // Styling URL
    center: [-123.001949, 49.249118], // Starting position 
    zoom: 13 // Starting zoom
  });

  // Add user controls to map, zoom bar
  map.addControl(new mapboxgl.NavigationControl());

  //------------------------------------------------
  // Add listener for when the map finishes loading.
  // After loading, we can add map features
  //------------------------------------------------
  map.on('load', () => {

    // Add interactive pins for the hikes
    addBinPin(map);

    // Add interactive pin for the user's location
    addUserPin(map);

  });
}

showMap();

//-----------------------------------------------------
// Add pin for showing where the Recycling bin is.
//------------------------------------------------------
function addBinPin(map) {
  map.loadImage(
    'https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-16-28668.png',
    (error, image) => {
      if (error) throw error;

      // Add the image to the map style.
      map.addImage('eventpin', image); // Pin Icon

      // Get the document ID from localStorage
      const docID = localStorage.getItem("docID");

      // READING information from "bins" collection in Firestore
      currentLocation = db.collection("bins").doc(docID);
      currentLocation.get().then(bin => {
        const features = []; // Defines an empty array for information to be added to

        lat = bin.data().lat;
        lng = bin.data().lng;
        console.log(lat, lng);
        coordinates = [lng, lat];
        console.log(coordinates);
        // Store the lat and lng in localStorage
        // localStorage.setItem("lat", lat);
        // localStorage.setItem("lng", lng);
        localStorage.setItem("street", bin.data().street);
        // Coordinates
        street_name = bin.data().street; // Event Name
        preview = bin.data().details; // Text Preview

        // Pushes information into the features array

        features.push({
          'type': 'Feature',
          'properties': {
            'description': `Destination: ${street_name}`
          },
          'geometry': {
            'type': 'Point',
            'coordinates': coordinates
          }
        });

        // Adds pins as a source of data for the map
        // "places" is the name of this array of features
        map.addSource('places', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': features
          }
        });

        // Creates a layer above the map displaying the pins
        map.addLayer({
          'id': 'places',
          'type': 'symbol',
          'source': 'places',
          'layout': {
            'icon-image': 'eventpin', // Pin Icon
            'icon-size': 0.1, // Pin Size
            'icon-allow-overlap': true // Allows icons to overlap
          }
        });

        // When one of the "places" markers are clicked,
        // create a popup that shows information 
        // Everything related to a marker is save in features[] array
        map.on('click', 'places', (e) => {
          // Copy coordinates array.
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;

          // Ensure that if the map is zoomed out such that multiple 
          // copies of the feature are visible, the popup appears over 
          // the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'places', () => {
          map.getCanvas().style.cursor = 'pointer';
        });

        // Defaults cursor when not hovering over the places layer
        map.on('mouseleave', 'places', () => {
          map.getCanvas().style.cursor = '';
        });
      });
    }
  );
}

//-----------------------------------------------------
// Add pin for showing where the user is.
//------------------------------------------------------
function addUserPin(map) {

  // Adds user's current location as a source to the map
  navigator.geolocation.getCurrentPosition(position => {
    const userLocation = [position.coords.longitude, position.coords.latitude];
    const data = {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': userLocation
        },
        'properties': {
          'description': 'Your location'
        }
      }]
    };
    console.log(userLocation);
    if (userLocation) {
      if (!map.getSource('userLocation')) {
        map.addSource('userLocation', {
          'type': 'geojson',
          'data': data
        });
      } else {
        map.getSource('userLocation').setData(data);
      }

      // Creates a layer above the map displaying the pins
      // Add a layer showing the places.
      if (!map.getLayer('userLocation')) {
        map.addLayer({
          'id': 'userLocation',
          'type': 'circle', // what the pins/markers/points look like
          'source': 'userLocation',
          'paint': { // customize colour and size
            'circle-color': 'black',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });
      }

      // Map On Click function that creates a popup displaying the user's location
      map.on('click', 'userLocation', (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the userLocation layer.
      map.on('mouseenter', 'userLocation', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Defaults
      // Defaults cursor when not hovering over the userLocation layer
      map.on('mouseleave', 'userLocation', () => {
        map.getCanvas().style.cursor = '';
      });
    }
  });
}

//---------------------------------------------------------------
// Function to regularly call addUserPin 
// and re-place the location of the User every 5 seconds
//---------------------------------------------------------------
function moveUserDot() {
  addUserPin(map);
}
setInterval(moveUserDot, 5000);

//---------------------------------------------------------------
// Function to get user's location dynamically every 5 seconds
// And see if it is within a specified radius, 
// if they have entered within the range, navigation button pops up
//
// <Source: Tech Tips B04>
//---------------------------------------------------------------
function getGeolocation() {
  if ("geolocation" in navigator) {
    // Check if geolocation is supported
    navigator.geolocation.getCurrentPosition(function (position) {
      // This function is the success callback

      // Get current time
      let now = new Date();
      let time = now.toLocaleTimeString(); // Converts the time to a string using locale conventions.
      console.log(time);

      // Extract lat and long
      var lat = position.coords.latitude;
      var long = position.coords.longitude
      console.log("Latitude: " + lat);
      console.log("Longitude: " + long);

      var targetlat = localStorage.getItem("lat");
      var targetlong = localStorage.getItem("lng");

      // Calculate distance in meters, and get radius input
      var d = getDistanceInMeters(lat, long, lat, long);
      // We assume when users have reached within 10 meters, they have reached the destination
      var radius = 10;

      // Display it to console to check whether the function works successfully.
      console.log("distance: " + d + " meters; " + time + ": " + lat + ", " + long);

      /**
       * Check if user's position is within radius
       * If it is within radius, then a navigation buttons pops up to guide them to the rewards.html to claim rewards 
       * after they have recycled (We trust the user to do this, no validation function so far).
       */
      if (d < radius) {
        createButton();
      }

    }, function (error) {
      // This function is the error callback
      console.error("Error occurred: " + error.message);
    });
  } else {
    // Geolocation isn’t available
    console.error("Geolocation is not supported by this browser.");
  }
}

/** 
 * Run getGeolocation immediately once first in case 
 * our users are already within in the range when they load the page
 */
getGeolocation();

/** 
 * Call getGeolocation every 5 seconds using nested setTimeout.
 */
setInterval(getGeolocation, 5000);

//--------------------------------------------------------
// Function takes 2 points (long and lat)
// converts it to distance, and calculates the distance 
// (absolute value between the two points)
//
// <Source: Tech Tips B04>
//--------------------------------------------------------
function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000; // Distance in meters
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "bookmarks" array
// Then it will change the bookmark icon from the hollow to the solid version. 
//-----------------------------------------------------------------------------


//---------------------------------------------------------------
// A DOM event that pops up a navigation button below the map.
//---------------------------------------------------------------
function createButton() {
  let parentNode = document.getElementById("main-body");
  let referenceNode = document.getElementById("accordionFlush");
  let newNode = document.createElement("div");
  newNode.setAttribute("class", "position-relative mb-3");
  newNode.innerHTML = `<button type="button" onclick="location.href='./rewards.html'" class="btn btn-outline-success position-absolute top-0 start-50 translate-middle">Start Recycling</button>`;
  parentNode.insertBefore(newNode, referenceNode);
}





















