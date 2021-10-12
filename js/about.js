// https://maps.google.com/maps?q=toronto%20canada&t=&z=13&ie=UTF8&iwloc=&output=embed
// https://maps.google.com/maps?q=beit%20shemesh&t=&z=13&ie=UTF8&iwloc=&output=embed
// https://maps.google.com/maps?q=santiago%20chile&t=&z=13&ie=UTF8&iwloc=&output=embed

const place = [
  "https://maps.google.com/maps?q=santiago%20chile&t=&z=13&ie=UTF8&iwloc=&output=embed",
  "https://maps.google.com/maps?q=toronto%20canada&t=&z=13&ie=UTF8&iwloc=&output=embed",
  "https://maps.google.com/maps?q=beit%20shemesh&t=&z=13&ie=UTF8&iwloc=&output=embed",
];
let placeIndex = 1;
document.getElementById("gmap_canvas").src = place[placeIndex];

function nextLocation() {
  placeIndex += 1;
  document.getElementById("gmap_canvas").src = place[placeIndex];
  document.getElementById("previousButton").classList.remove("disable");
  document.getElementById("previousButton").classList.add("button");

  if (placeIndex == 2) {
    document.getElementById("nextButton").classList.remove("button");
    document.getElementById("nextButton").classList.add("disable");
    document.getElementById("nextButton").removeAttribute("onclick");
  }
}
function previousLocation() {
  placeIndex -= 1;
  document.getElementById("gmap_canvas").src = place[placeIndex];
  document.getElementById("nextButton").classList.remove("disable");
  document.getElementById("nextButton").classList.add("button");

  if (placeIndex == 0) {
    document.getElementById("previousButton").classList.remove("button");
    document.getElementById("previousButton").classList.add("disable");
    document.getElementById("previousButton").removeAttribute("onclick");
  }
}
