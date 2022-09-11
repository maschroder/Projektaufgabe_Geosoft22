async function main(){
  const mountains = await getMountain();
  fillTable(mountains);
}

/**
* @desc get Mountains
* @desc fetches all Mountains from server
*/
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