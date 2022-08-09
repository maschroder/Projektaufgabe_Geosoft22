"use strict";
var map = L.map('map',{drawControl: false}, {editable: true}).setView([54.805, 7.5], 3.5);

// Add base tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// FeatureGroup is to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    draw: {
        // disabling all shapes except for marker 
        circle: false,
        polygon: false,
        rectangle: false,
    },
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
        layer = e.layer;
    if (type === 'marker') {
        
    }
    // Do whatever else you need to. (save to db; add to map etc)
    map.addLayer(layer);
 });





L.geoJSON(gebirge).addTo(map);
setMarker(gebirge)


var popUps = new L.FeatureGroup();
map.addLayer(popUps);

function setMarker(my_results) {
  for (let i = 0; i < my_results.features.length; i++) {
    let feature = my_results.features[i];
      let coords = feature.geometry.coordinates
      let name = feature.properties.name
      let hoehe = feature.properties.hoehe
      let url = feature.properties.url
      let beschreibung = feature.properties.beschreibung
      let marker = L.marker([coords[1], coords[0]])
          .bindPopup("Name: " + name + '<br>' + "Höhe: " + hoehe + "m" + '<br>' + "Link: " + url + '<br>' + "Beschreibung: " + beschreibung)
        
          map.addLayer(marker)
      
  }
}
