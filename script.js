 // create a variable for the map
 let mymap = L.map('myfirstmap',
 {
     center: [51.961563, 7.628202],
     zoom: 13
 }) 

   
// add the base map
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${myMapBoxKey}`, {
 attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
 maxZoom: 18,
 id: 'mapbox/streets-v11',
 tileSize: 512,
 zoomOffset: -1,
 accessToken: myMapBoxKey
}).addTo(mymap)