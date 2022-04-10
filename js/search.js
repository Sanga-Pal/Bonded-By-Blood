const API='https://bonded-by-blood.herokuapp.com/';
// const API = "http://localhost:8000/";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY29kZS1zb2hhbSIsImEiOiJjbDFsdmU0MjUwZWlpM2pvYnZmem16dG1kIn0.UX8hn1EN63EqElkp8D8Yhg";
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: "Search for Location",
  types: "country,region,place,postcode,locality,neighborhood",
});

geocoder.addTo("#geocoder");
var result=null;
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
// elem.addEventListener("keyup", function (event) {
//   if (event.keyCode === 13) {
//     elem.value = "";
//     // console.log(result);
//     getData(result);
//   }
// });
let loader = document.getElementById("search_loader");
function getData() {
  loader.style.display = "block";
  let dist = document.getElementById("range").value;
  let bgrp = document.getElementById("bgrp").value.split(",");
  // console.log(bgrp);
  // console.log(result)
  if(dist=="null" || bgrp[0] == 'null' || result==null){
    setPlotter("invalid");
    return;
  }
  // console.log(bgrp)
  // console.log(typeof bgrp, bgrp);
  // var req = {
  //   "coords": JSON.parse(result),
  //   'dist': dist,
  //   "bgrp": bgrp,
  // };
  // req = JSON.stringify(req);
  req=`{\r\n    \"bgrp\": \"[${bgrp}]\",\r\n\"coords\": [${JSON.parse(result)}],\r\n\"dist\": \"${dist}\"\r\n}`  // req.replace(/[\r\n]+/gm, "");
  // console.log(req);
  fetch(API+"search/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: req,
  })
    .then((res) => res.json())
    .then((data) => setPlotter(data.response))
    .catch((err) => setPlotter([]));
}
function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}
function setPlotter(data) {
  var root = document.getElementById("search_result");
  // console.log(data.length);
  if(data=="invalid"){
    var modal = document.getElementById("myModal");
    var modalInner = document.getElementById("modal-content");
    modalInner.innerHTML = "";
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    modal.style.display = "block";
    modalInner.style.color = "yellow";
    var p = document.createElement("p");
    p.innerText = "Invalid Search. Fill Again!";
    modalInner.appendChild(p);
  }
  else if (data[0] == undefined) {
    var modal = document.getElementById("myModal");
    var modalInner = document.getElementById("modal-content");
    modalInner.innerHTML = "";
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    modal.style.display = "block";
    modalInner.style.color = "yellow";
    var p = document.createElement("p");
    p.innerText = "No mates found! Help us by expanding our network!!";
    modalInner.appendChild(p);
  } else {
    const htmlString = data
      .map((data) => {
        return `
        <div class="card">
        <div class="card_name">
            ${data.firstName+" "+data.lastName} <span class="sex">(${data.sex})</span>
        </div>
        <div class="age">
            Age : ${getAge(data.dob)}
        </div>
        <div class="bms"><span>Height : ${data.height} cms</span><span>Weight : ${data.weight} kg</span></div>
        <div class="contact">
            <a href="tel:${data.contact}">&phone;${data.contact}</a>
            <a href="mailTo:${data.email}">&#x1F4E7;${data.email}</a>
        </div>
        <div class="type">
            ${data.bloodGroup}
        </div>
    </div>
      `;
      })
      .join("");
    root.innerHTML = htmlString;
  }
  loader.style.display = "none";
}
