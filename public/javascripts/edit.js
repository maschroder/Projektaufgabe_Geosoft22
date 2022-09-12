async function main(){
  const mountains = await getMountain();
  fillTable(mountains);
  setMarker(mountains)
}

/**
* @desc get Mountains
* @desc fetches all Mountains from server
*/
var data;
async function getMountain(){
  const response = await fetch('/gebirge').then(
    response => response.json()
  ).then(data => {
    return data
  }).catch((error) => {
    console.error('Error:', error);
  });;
  return response;
}
//setMarker(data)

/**
* @desc fill table
* @param data Featurecollection fetched from server
*/
function fillTable(data){
  const tableBody = document.getElementById("tableBody");
  let tableHTML = ""

  for(gebirge of data.features){
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
* @desc look at table and submit the delete request
*/
async function submitData(){
  const tableRows = document.getElementsByName("deleteID");

  let toDelete = [];

  for(row of tableRows){
    if(row.checked){
      toDelete.push(row.value);
    }
  }

  const formData = new FormData();
  formData.append('ids', toDelete);

  let redirect = await fetch('/gebirge', {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ids: toDelete})
  })
  //reload to update
  location.reload(true);
}

// Mapbox Karte für gespeicherte Gebirge erstellen:

const mapboxToken = "pk.eyJ1IjoibWFzY2hyb2RlciIsImEiOiJjbDdvcXF3MnQwMDFnM3ZwY3FpazMzbXh2In0.tUxJlLvBXq19DPAaYyDqHA";

mapboxgl.accessToken = 'pk.eyJ1IjoiZHNlbiIsImEiOiJjbDZtOTZ0bnIwNWh0M2VxcWtqZGlna3h4In0.UoeEOBdUWQvYtDYZuapNgg';

const map = new mapboxgl.Map({
  container: 'map',
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v11',
  // lat/lon musste vertauscht werden
  center: [7.5, 54.508 ],
  zoom: 3.5
  });
   
  map.addControl(
  new MapboxDirections({
  accessToken: mapboxgl.accessToken
  }),
  'top-right'
  );

 
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 3.5,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapboxToken
}).addTo(map);



// Button hinzufügen, der die Funktion aufruft, aus den Koordinaten der gespeicherten Gebirge in der Tabelle
// Marker zu erstellen:

  /** 
  const saved = [];
  saved.push(gebirge.geometry.coordinates);
  let saveddiv = document.getElementById("GebirgeButton")  
  function showSaved(){
    saved.forEach(?????)
  }


var busItems = new L.FeatureGroup();
map.addLayer(busItems);


function setMarker(data){
for(gebirge of data.features){
  let coords = gebirge.geometry.coordinates
  console.log(coords)
  let marker = L.marker([coords[1], coords[0]])
  .bindPopup(gebirge.properties.name)

  busItems.addLayer(marker)
}}
*/

