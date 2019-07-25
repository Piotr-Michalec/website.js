var someText = "imie i nazwiskło";
var index = 1;
var imageList = ["moose.jpg", "bocian.jpg"];

function dodajText(){
//place someText variable on website
document.getElementById("myText").innerHTML = someText;
console.log("Działa");
}
function addImg(){
  
  var x = document.createElement("IMG");
  x.setAttribute("src", "moose.jpg");
  x.setAttribute("width", "304");
  x.setAttribute("height", "228");
  x.setAttribute("alt", "The Pulpit Rock");
  document.getElementById.appendChild("moo");

}

function addImg(){

  




 


  index = index + 1;
  if (index == imageList.length) {
     index = 0;
  }
  var image1 = document.getElementById("animal");
  image1.src = imageList[index];

}
$(document).ready(function(){
  $(jqueryTest).click(function(){
    $(".znikaj").hide();
  });
});