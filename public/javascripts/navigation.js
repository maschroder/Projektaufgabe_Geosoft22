mapboxgl.accessToken = "pk.eyJ1IjoibWFzY2hyb2RlciIsImEiOiJjbDdvcXF3MnQwMDFnM3ZwY3FpazMzbXh2In0.tUxJlLvBXq19DPAaYyDqHA";


navigator.geolocation.getCurrentPosition(successLocation, errorLocation,{
	enableHighAccuracy: true
})

function successLocation(position){
	console.log(position)
	setupMap([position.coords.longitude, position.coordds.latitude])
}

function errorLocation(position){

}

function setupMap(center){
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: center
	  })
}




