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
    const mapboxToken = "pk.eyJ1IjoibWFzY2hyb2RlciIsImEiOiJjbDdvcXF3MnQwMDFnM3ZwY3FpazMzbXh2In0.tUxJlLvBXq19DPAaYyDqHA";
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
            <input type="hidden" id="beschreibung" name="beschreibung" value="" placeholder="beschreibung">
            <input type="submit" value="Submit">
          </form>
        `;
        layer.bindPopup(popupString).openPopup();
      }
      
      showWikipedia();

    });
    }
}



var snippet;
function showWikipedia() {
  let xhttp = new XMLHttpRequest()
  xhttp.open("GET", "http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={gesuchterBerg}&format=json" + "&origin=*", true)
  xhttp.send()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      let res = JSON.parse(this.responseText)
      //console.log(res)
      let snippet = res.query.search[0].snippet
      snippet = escapeHtml(snippet);
      if (a.url.value.startsWith("https://en.wikipedia.org/wiki/")) { 
      a.beschreibung.value = snippet;
      console.log(escapeHtml(snippet))
      }}
     }}


// Funktion, die überprüfen soll, ob die URL eine Wikipedia-URL ist
  async function pruefen() {
    a = document.createGebirge
    if (a.url.value = "https://en.wikipedia.org/wiki/Mont_Blanc") { 
      a.beschreibung.value = snippet;
      
     }
     
     
  }
  

  function escapeHtml(unsafe) {
    return unsafe.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"');
}

  /**
  * @desc clear Mountains
  * @desc removes all markers from the map when called
  */
 function clearMountains() {
    //empty the indices and featureGroups
    this.gebirgeIndex = [];
    this.gebirgeGroup.clearLayers();
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


