const API = "https://bonded-by-blood.herokuapp.com/";
// const API = "http://localhost:8000/";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY29kZS1zb2hhbSIsImEiOiJjbDFsdmU0MjUwZWlpM2pvYnZmem16dG1kIn0.UX8hn1EN63EqElkp8D8Yhg";
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: "Search for Location",
  types: "country,region,place,postcode,locality,neighborhood",
});

geocoder.addTo("#geocoder");
var result = null;
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
let form = document.querySelector("#submit");
form.addEventListener("click", function (event) {
  event.preventDefault(); //prevent useless refresh
});
let loader = document.getElementById("search_loader");
var root = document.getElementById("search_result");
function getData() {
  root.innerHTML = "";
  loader.style.display = "block";
  let dist = document.getElementById("range").value;
  let organ = document.getElementById("organ").value === "null" ? false : true;
  let bgrp = document.getElementById("bgrp").value.split(",");
  let query = document.getElementById("type").value;
  // console.log(bgrp);
  // console.log(result);
  // console.log(organ);
  // console.log(dist);
  // console.log(query);
  if (
    dist == "null" ||
    (query == "B" && bgrp[0] == "null") ||
    (query == "O" && organ == "null") ||
    result == null
  ) {
    setPlotter("invalid");
    return;
  }
  // console.log(bgrp)
  // console.log(typeof bgrp, bgrp);
  // var req = {
  //   "coords": JSON.parse(result),
  //   "dist": dist,
  //   "bgrp": bgrp,
  //   "organ": organ,
  //   "query": query,
  // };
  req = `{\r\n  \"bgrp\": \"[${bgrp}]\",\r\n  \"coords\": [${JSON.parse(
    result
  )}],\r\n  \"dist\": \"${dist}\",\r\n  \"query\": \"${query}\",\r\n  \"organ\": \"${organ}\"\r\n}`;
  // console.log(req);
  fetch(API + "search/", {
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
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
function setPlotter(data) {
  var modal = document.getElementById("myModal");
  var modalInner = document.getElementById("modal-content");
  // console.log(data.length);
  root.innerHTML = "";
  if (data == "invalid") {
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
    renderOptions("null");
  } else if (data[0] == undefined) {
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
    root.style.display = "flex";
    const htmlString = data
      .map((data) => {
        return `
        <div class="card">
        <div class="card_name">
            ${data.firstName + " " + data.lastName} <span class="sex">(${
          data.sex
        })</span>
        </div>
        <div class="age">
            Age : ${getAge(data.dob)}
        </div>
        <div class="bms"><span>Height : ${
          data.height
        } cms</span><span>Weight : ${data.weight} kg</span></div>
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
  // setTimeout(() => {
  loader.style.display = "none";
  document.forms["search_module"].reset();
  // }, 1000);
}

/** conditional search render */
function renderOptions(e) {
  console.log(e);
  if (e == "O") {
    document.getElementById("search_module").style.display = "flex";
    document.getElementById("bgrp").style.display = "none";
    document.getElementById("organ").style.display = "block";
  } else if (e == "B") {
    document.getElementById("search_module").style.display = "flex";
    document.getElementById("bgrp").style.display = "block";
    document.getElementById("organ").style.display = "none";
  } else {
    document.getElementById("search_module").style.display = "none";
  }
}
