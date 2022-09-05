/** Class containing all methods for handling the map display on page */
class MapInterface {
  constructor(params) {
    //initialise the map view from the given coordinates
    if (params.mapid === undefined ||
      params.baseMap === undefined ||
      params.baseMap.tileLayer === undefined
    ) {
      console.log("couldn't initialise map-interface. invalid parameters");
      return false;
    }

    let mapid = params.mapid;
    let view = params.view || [0, 0];
    let zoom = params.zoom || 6;
    let baseMap = params.baseMap;

    this.map = L.map(mapid).setView(view, zoom);

    //add basemaps
    this.baseMapLayer = L.tileLayer(
      baseMap.tileLayer, {
      maxZoom: baseMap.maxZoom || 15,
      attribution: baseMap.attribution || ""
    }
    );
    this.baseMapLayer.addTo(this.map);

    this.drawnItem = false;
    this.drawnItems = new L.FeatureGroup().addTo(this.map);

    this.addDrawControls();
    this.addDrawEvents();
  }

  /**
  * @desc function adds leaflet Draw draw controls to the map
  */
  addDrawControls() {
    this.drawControl = new L.Control.Draw({
      draw: {
        polyline: false,
        polygon: false,
        circle: false,
        rectangle: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: this.drawnItems
      }
    });
    this.map.addControl(this.drawControl);
  }

  /**
  * @desc function adds leaflet Draw Events.
  * In this case only the reactangle is considered.
  */
  addDrawEvents() {
    let drawnItems = this.drawnItems;
    let mapInterface = this;
    this.map.on(L.Draw.Event.CREATED, function (e) {
      var type = e.layerType;
      var layer = e.layer;

      if (type === "marker") {
        this.drawnItem = layer;
        drawnItems.addLayer(layer);
        console.log("created marker");
        var popupString = `
          <form name="createGebirge" action="/gebirge" method="post" onsubmit="return pruefen()">
            <input id="name" name="name" value="" placeholder="name">
            <input type="hidden" id="lat" name="lat" value="${layer._latlng.lat}">
            <input type="hidden" id="lng" name="lng" value="${layer._latlng.lng}">
            <input id="hoehe" name="hoehe" value="" placeholder="hoehe">
            <input id="url" name="url" value="" placeholder="url">
            <input id="beschreibung" name="beschreibung" value="" placeholder="beschreibung">
            <input type="submit" value="Submit">
          </form>
        `;
        layer.bindPopup(popupString).openPopup();
      }

    });
  }

  async pruefen() {
    a = document.createGebirge
    if (a.url.value.startsWith("de.wikipedia.org/wiki/")) { 
      let myObject = await fetch(a.url.value);
      let myText = await myObject.text();
      console.log(myText);
     }
     // if true: snippet aus Wikipedia Artikel anzeigen
     
  }

// Code von einer Website über Wikipedia API:
  httpRequest(){
   //Create a new object to interact with the server
var xhr = new XMLHttpRequest();
var url = a.url.value.startsWith("de.wikipedia.org/wiki/");
// Provide 3 arguments (GET/POST, The URL, Async True/False)
xhr.open('GET', url, true);
// Once request has loaded...
xhr.responseType = 'json';
xhr.onload = function() {
    // Parse the request into JSON
    var data = xhr.response;
    // Log the data object
    console.log(data);
    // Log the page objects
    console.log(data.query.pages)
    // Loop through the data object
    // Pulling out the titles of each page
    for (var i in data.query.pages) {
        console.log(data.query.pages[i].title);
    }
}
// Send request to the server asynchronously
xhr.send();



  }

 

  /**
  * @desc clear Mountains
  * @desc removes all markers from the map when called
  */
  clearMountains() {
    //empty the indices and featureGroups
    this.gebirgeIndex = [];
    this.gebirgeGroup.clearLayers();
  }




/**
 * @desc Shows the position of the user in the textarea
 * @param {*} position Json object of the user
 */
 showPosition(position) {
  var x = document.getElementById("userPosition");
  //"Skeleton" of a valid geoJSON Feature collection
  let outJSON = { "type": "FeatureCollection", "features": [] };
  //skelly of a (point)feature
  let pointFeature = {"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": []}};
  pointFeature.geometry.coordinates = [position.coords.longitude, position.coords.latitude];
  //add the coordinates to the geoJson
  outJSON.features.push(pointFeature);
  x.innerHTML = JSON.stringify(outJSON);
}


// Funktionen, um Browserstandort zu ermitteln und einen Marker auf der Map hinzuzufügen

getLocation() {
  x = document.getElementById("location");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }

}

showPosition(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;

  myLocation = [lat,lng]
  // adding a green icon
  var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
console.log(myLocation)
 new L.marker(myLocation, {icon: greenIcon}).addTo(map).bindPopup("Ich bin hier");
}


 mainMapInterface = new MapInterface(
  {
    mapid: "map",
    view: [54.508, 7.5],
    zoom: 3.5,
    baseMap: {
      tileLayer: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  }
);
}