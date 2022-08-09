"use strict";
var map = L.map('map').setView([54.805, 7.5], 3.5);

// Add base tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var gebirge = {
  "type": "FeatureCollection",
  "features": [
      {
          "type": "Feature",
          "properties": {
              "name": "Mont Blanc",
              "hoehe": "4810m",
              "url" : "https://de.wikipedia.org/wiki/Mont_Blanc",
              "beschreibung" : "Berg an der Grenze zwischen Frankreich und Italien"

          },
          "geometry": {
              "type": "Point",
              "coordinates": [
                  6.864325,
                  45.832544
              ]
          }
      
      }
  ]
}

L.geoJSON(gebirge).addTo(map);