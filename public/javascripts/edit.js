async function main() {
  const mountains = await getMountain();
  fillTable(mountains);
  setMarker(mountains)
}

/**
* @desc get Mountains
* @desc fetches all Mountains from server
*/
var data;
async function getMountain() {
  const response = await fetch('/gebirge').then(
    response => response.json()
  ).then(data => {
    return data
  }).catch((error) => {
    console.error('Error:', error);
  });;
  return response;
}

/**
* @desc Tabelle für gespeicherte Gebirge erstellen
* @param data Featurecollection fetched from server
*/
function fillTable(data) {
  const tableBody = document.getElementById("tableBody");
  let tableHTML = ""

  for (gebirge of data.features) {
    tableHTML += `
    <tr>
    <td>${gebirge.properties.name}</td>
    <td>${gebirge.geometry.coordinates[1]}, ${gebirge.geometry.coordinates[0]}</td>
    <td>${gebirge.properties.hoehe}</td>
    <td>${gebirge.properties.url}</td>
    <td>${gebirge.properties.beschreibung}</td>
    <td>${gebirge._id}</td>
    <td><input type="checkbox" name="deleteID" value="${gebirge._id}"></td>
    </tr>
    `
  }

  tableBody.innerHTML = tableHTML;
}

/**
* @desc Zu löschende Spalte auswählen und löschen
*/
async function submitData() {
  const tableRows = document.getElementsByName("deleteID");

  let toDelete = [];

  for (row of tableRows) {
    if (row.checked) {
      toDelete.push(row.value);
    }
  }

  const formData = new FormData();
  formData.append('ids', toDelete);

  let redirect = await fetch('/gebirge', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: toDelete })
  })
  //reload to update
  location.reload(true);
}

// Mapbox Karte für gespeicherte Gebirge erstellen:

mapboxgl.accessToken = 'pk.eyJ1IjoiZHNlbiIsImEiOiJjbDZtOTZ0bnIwNWh0M2VxcWtqZGlna3h4In0.UoeEOBdUWQvYtDYZuapNgg';


const map = new mapboxgl.Map({
  container: 'map',
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v11',
  // lat/lon musste vertauscht werden
  center: [7.5, 54.508],
  zoom: 3.5
});

map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken
  }),
  'top-right'
);


// Die in der Tabelle gespeicherten Gebirge auf der Mapbox Karte mit einem Marker anzeigen lassen
var saved = [];
function setMarker(data) {
  for (gebirge of data.features) {
    let coords = gebirge.geometry.coordinates
    console.log(coords)
    saved.push(coords);
    console.log(saved)
    const marker1 = new mapboxgl.Marker()
      .setLngLat([coords[0], coords[1]])
      .addTo(map);

  }
}


/* Hier haben wir versucht die Marker beim Klicken in der Tabelle hervorzuheben.
Die Funktion müsste in edit.ejs Datei in Zeile 35 mit zum Beispiel onclick="onMapClick()" aufgerufen werden.
Das klappt aber noch nicht ganz
*/

/*
function addRowHandlers() {
  var table = document.getElementById("deleteTable");
  var rows = table.getElementsByTagName("th");
  for (i = 1; i < rows.length; i++) {
    row = table.rows[i];
    row.onclick = function(){
      new mapboxgl.Popup()
        .setLngLat(coords[0], coords[1])
        .setHTML('<h1>Hello World!</h1>')
        .addTo(map);
    };
  }
}
*/

/*
function onMapClick(e) {
  var popup = L.popup()
  .setLatLng(e.latlng)
  .setContent("<table><tr><td>Cell 1</td><td>Cell 2</td></tr></table>")
  .openOn(map);
  var lat = marker.getLatLng().lat;
  var lng = marker.getLatLng().lng;
};
*/



