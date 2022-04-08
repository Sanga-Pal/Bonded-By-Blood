mapboxgl.accessToken =
  "pk.eyJ1IjoiY29kZS1zb2hhbSIsImEiOiJjbDFsdmU0MjUwZWlpM2pvYnZmem16dG1kIn0.UX8hn1EN63EqElkp8D8Yhg";
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: "Search for Location",
  types: "country,region,place,postcode,locality,neighborhood",
});

geocoder.addTo("#geocoder");
var result;
// // Get the geocoder results container.
// Add geocoder result to container.
geocoder.on("result", (e) => {
  result = JSON.stringify(e.result.geometry.coordinates, null, 2);
});

// // Clear results container when search is cleared.
// geocoder.on("clear", () => {
//     results.innerText = "";
// });
let elem = document.getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0];
elem.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    elem.value = "";
    console.log(result);
    getData(result);
  }
});

function getData(q) {
  // console.log(q);
  fetch("http://localhost:8000/search/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: q,
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
}