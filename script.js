"use strict";
var map = L.map('map').setView([54.805, 7.5], 3.5);

// Add base tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


L.geoJSON(gebirge).addTo(map);
setMarker(gebirge)

var busItems = new L.FeatureGroup();
map.addLayer(busItems);

function setMarker(my_results) {
  for (let i = 0; i < my_results.features.length; i++) {
    let feature = my_results.features[i];
      let coords = feature.geometry.coordinates
    console.log(coords)
      let marker = L.marker([coords[1], coords[0]])
          .bindPopup(feature.properties.name + '<br>' + "Höhe: " + feature.properties.hoehe + "m")
      busItems.addLayer(marker)
  }
}
