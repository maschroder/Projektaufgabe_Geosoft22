const mapboxToken = "pk.eyJ1IjoibWFzY2hyb2RlciIsImEiOiJjbDdvcXF3MnQwMDFnM3ZwY3FpazMzbXh2In0.tUxJlLvBXq19DPAaYyDqHA";

const map = L.map('map').setView([54.508, 7.5], 3.5);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapboxToken
}).addTo(map);

var featureGroup = L.featureGroup().addTo(map);
/**
  * @desc function adds leaflet Draw draw controls to the map
  */
function addDrawControls() {
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
  */
 function addDrawEvents() {
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

    })};  


 /**
  * @desc clear Mountains
  * @desc removes all markers from the map when called
  */
  function clearMountains() {
    //empty the indices and featureGroups
    this.gebirgeIndex = [];
    this.gebirgeGroup.clearLayers();
  }    

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
});
map.addControl(directions, 'top-left')


var drawControl = new L.Control.Draw({
    edit: {
      featureGroup: featureGroup
    }
  }).addTo(map);

  map.on('draw:created', function(e) {
      featureGroup.addLayer(e.layer);
  });