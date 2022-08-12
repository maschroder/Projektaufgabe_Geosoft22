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
      <b>${markerProperties.name}</b><br>
      <b>${markerProperties.hoehe}</b><br>
      <b>${markerProperties.beschreibung}</b><br>
      <b>${markerProperties.url}</b><br>
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
}

const mainMapInterface = new MapInterface(
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
