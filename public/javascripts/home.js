// Button, um Name und Höhe des höchsten und zweithöchsten Bergs in Europa anzuzeigen
var x = document.getElementById("demo");
var bigOnes = ["Der Mont Blanc mit 4810 Metern!", "Die Dufourspitze mit 4634 Metern!"];
function showBiggest(){
  document.getElementById("biggestMountain").innerHTML = bigOnes[0];
}
function showSecondBiggest(){
  document.getElementById("secondBiggestMountain").innerHTML = bigOnes[1];
}