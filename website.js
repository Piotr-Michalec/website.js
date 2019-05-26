var someText = "imie i nazwiskło";


function dodajText(){
//place someText variable on website
document.getElementById("myText").innerHTML = someText;
console.log("Działa");
}
function addImg(){
    var img1 =document.createElement("img");
img1.src = "C:\Users\pmich\OneDrive\Documents\website.js\moose.jpg";
   document.getElementById("moo").appendChild(img1);
  console.log("moose");

}