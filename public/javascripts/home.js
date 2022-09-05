async function main(){
  //get mountains und add to map
  const mounatins = await getMountain();
  mainMapInterface.addMountains(mounatins)

  //fluff, dient nur dazu den marker zu öffnen der grade hingefügt wurde.
  let markerId = document.getElementById("markerID");
  mainMapInterface.openPopup(markerID)
}

/**
* @desc get Mountains
* @desc fetches all mountains from server
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


/** Class containing all methods for handling the map display on page */
class MapInterface{
  constructor(params){
    //initialise the map view from the given coordinates
    if( params.mapid === undefined ||
      params.baseMap === undefined ||
      params.baseMap.tileLayer === undefined
    ){
      console.log("couldn't initialise map-interface. invalid parameters");
      return false;
    }

    let mapid = params.mapid;
    let view = params.view || [0,0];
    let zoom = params.zoom || 6;
    let baseMap = params.baseMap;

    this.map = L.map(mapid).setView(view, zoom);

    //add basemaps
    this.baseMapLayer = L.tileLayer(
      baseMap.tileLayer, {
        maxZoom : baseMap.maxZoom || 15,
        attribution : baseMap.attribution || ""
      }
    );
    this.baseMapLayer.addTo(this.map);

    //create arrays that contain easily accessible references to all features of
    //each dataset
    //create groups wherein all the features of diffrent datasets will be contained
    this.gebirgeIndex = [];
    this.gebirgeGroup = new L.LayerGroup().addTo(this.map);

    this.drawnItems = new L.FeatureGroup().addTo(this.map);

    //this.addDrawControls();
    //this.addDrawEvents();
  }

  /**
  * @desc function adds leaflet Draw draw controls to the map
  */
  addDrawControls(){
    this.drawControl = new L.Control.Draw({
      draw:{
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
  addDrawEvents(){
    let drawnItems = this.drawnItems;
    let mapInterface = this;
    this.map.on(L.Draw.Event.CREATED, function(e){
      var type = e.layerType;
      var layer = e.layer;
      var polygon;

      if(type === "marker"){
        //do stuff
      }

    });
  }

  /**
  * @desc clear mountains
  * @desc removes all markers from the map when called
  */
  clearMountains(){
    //empty the indices and featureGroups
    this.gebirgeIndex = [];
    this.gebirgeGroup.clearLayers();
  }

  /**
  * @desc adds mounatins to the map
  * @param {GeoJSON} featureCollection
  */
  addMountains(featureCollection){
    const markerOpacity = 0.4;
    for(let feature of featureCollection.features){
      let markerCoords = [feature.geometry.coordinates[1],
      feature.geometry.coordinates[0]];
      let markerProperties = feature.properties;

      let marker = L.marker(markerCoords,
        //marker options
        {
          opacity : markerOpacity,
          riseOnHover: true
        }
      );

      //set cosmetics of the markers
      marker.on('mouseover', (e)=>{
        marker.setOpacity(1.0);
      });
      marker.on('mouseout', (e)=>{
        marker.setOpacity(markerOpacity);
      });

      //bind popup
      let popupString = `
      <b>Name: ${markerProperties.name}</b><br>
      <b>Höhe: ${markerProperties.hoehe}</b><br>
      <b>URL: ${markerProperties.url}</b><br>
      <b>Beschreibung: ${markerProperties.beschreibung}</b><br>
      </ul>
      `;
      marker.markerID = feature._id || null;
      marker.bindPopup(popupString);

      //add the marker to markergroup, so it shows up on the map
      this.gebirgeIndex.push(marker);
      this.gebirgeGroup.addLayer(marker);
    }
  }

  /**
  * @desc opens a popup by the given mongodb _id
  * TODO: not sure if this works yet
  * @param {string} id
  */
  openPopup(id){
    //das setzt voraus dass featurecollection und gebirgeGroup in selber reihenfolge sind
    for(let i = 0;  i < this.gebirgeIndex.length; i++){
      if(this.gebirgeIndex[i].markerID == id.value){
        this.gebirgeIndex[i].openPopup();
      }
    }
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