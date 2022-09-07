// Button, um Name und Höhe des höchsten Bergs in Europa anzuzeigen
var x = document.getElementById("demo");
var bigOnes = ["Der Mont Blanc mit 4810 Metern!", "Dufourspitze mit 4634 Metern!"];
function showBiggest(){
  console.log("Der Mont Blanc mit 4810 Metern!")
  document.getElementById("biggestMountain").innerHTML = bigOnes[0];
}

function showSecondBiggest(){
  console.log("Der Mont Blanc mit 4810 Metern!")
  document.getElementById("secondBiggestMountain").innerHTML = bigOnes[1];
}