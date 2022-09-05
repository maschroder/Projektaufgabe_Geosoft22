mapboxgl.accessToken = "pk.eyJ1IjoibWFzY2hyb2RlciIsImEiOiJjbDdvcXF3MnQwMDFnM3ZwY3FpazMzbXh2In0.tUxJlLvBXq19DPAaYyDqHA";


navigator.geolocation.getCurrentPosition(successLocation, errorLocation,{
	enableHighAccuracy: true
})

function successLocation(position){
	console.log(position)
	setupMap([position.coords.longitude, position.coords.latitude])
}

// Bei Fehler Location zum Geo-Gebäude setzen
function errorLocation(position){
	setupMap([7.5942655, 51.9688551])
}

function setupMap(center){
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: center,
		zoom: 3
	  })

	const nav = new mapboxgl.NavigationControl();
	map.addControl(nav);

    var directions = new MapboxDirections({
		accessToken: mapboxgl.accessToken
	});
	map.addControl(directions, 'top-left')
}




