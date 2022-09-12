// Button, um Name und Höhe des höchsten und zweithöchsten Bergs in Europa anzuzeigen
var x = document.getElementById("demo");
var bigOnes = ["Der Mont Blanc mit 4810 Metern!", "Die Dufourspitze mit 4634 Metern!"];
function showBiggest(){
  document.getElementById("biggestMountain").innerHTML = bigOnes[0];
}
function showSecondBiggest(){
  document.getElementById("secondBiggestMountain").innerHTML = bigOnes[1];
}

var weatherAPIkey = "1cf40922e81c5dfa710260ba42749774";
// Button, um auf OpenWeather API zugreifen zu können
let weatherdiv = document.getElementById("WetterButton")
function showWeather() {
   let xhttp = new XMLHttpRequest()
   xhttp.open("GET", "api.openweathermap.org/data/2.5/onecall/timemachine?lat=45.83251714444922&lon=6.865775714771106&dt=1650445666&appid={1cf40922e81c5dfa710260ba42749774}&only_current={true}", true)
   xhttp.send()
   xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200){
       let res = JSON.parse(this.responseText)
       console.log(res)
     }}} 

 // Anfrage gibt 404 (Not Found) Error    