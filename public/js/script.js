window.onscroll = function() {
  myfunction();
};
// DOM Select
var nav = document.querySelector("nav");
var features = document.querySelector(".features");

function myfunction() {
  if(!features)
  {
    return;
  }
  var dftop = window.pageYOffset;
  if (dftop > features.offsetTop) {
    nav.classList.add("sticky");
  } else if (dftop < features.offsetTop) {
    nav.classList.remove("sticky");
  }
}
