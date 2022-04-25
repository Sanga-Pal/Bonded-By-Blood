const API = "https://bondedbyblood.herokuapp.com/";
// const API = "http://localhost:8000/";
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
function inComplete(form) {
  for (var key in form) {
    if (form[key] === "" || form[key] === null || form[key] === "null") {
      if (key === "organs") continue;
      return true;
    }
  }
  if (!form["email"].match(/.+\@.+\..+/)) return true;
  else if (
    form["height"] <= 0 ||
    form["weight"] <= 0 ||
    getAge(form["dob"]) < 18
  )
    return true;
  return false;
}
function useModal(json, formData, form) {
  json = JSON.parse(json);
  var modal = document.getElementById("myModal");
  var modalInner = document.getElementById("modal-content");
  modalInner.innerHTML = "";
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  modal.style.display = "block";
  if (json === null) {
    modalInner.style.color = "yellow";
    var p = document.createElement("p");
    p.innerText = "Please fill all fields properly!";
    modalInner.appendChild(p);
  } else if (json.msg === "data saved") {
    modalInner.style.color = "green";
    var p = document.createElement("p");
    p.innerText = "Data Saved Successfully";
    modalInner.appendChild(p);
    form.reset();
  } else {
    modalInner.style.color = "red";
    var cnt = json.contact;
    var em = json.email;
    var a = document.createElement("p");
    a.innerText =
      cnt == "CastError"
        ? "Invalid Input"
        : formData.contact == ""
        ? "Contact not filled  "
        : "Contact Exists";
    var b = document.createElement("p");
    b.innerText =
      em == "CastError"
        ? "Invalid Input"
        : formData.email == ""
        ? "Email not filled  "
        : "Email Exists";
    if (cnt != null) {
      modalInner.appendChild(a);
    }
    if (em != null) {
      modalInner.appendChild(b);
    }
  }
  clock.style.display = "none";
  bg.style.display = "none";
}
function api_call(formData, form) {
  fetch(API + "signup/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((json) => useModal(JSON.stringify(json), formData, form))
    .catch((err) => console.log(err));
}
let reg_form = document.querySelector("#submit");
reg_form.addEventListener("click", function (event) {
  event.preventDefault(); //prevent useless refresh
});
let clock = document.getElementById("loader");
let bg = document.getElementById("loader_div");
async function validate() {
  clock.style.display = "block";
  bg.style.display = "block";
  let form = document.forms["registrationForm"];
  var formData = {
    firstName: form["fname"].value,
    lastName: form["lname"].value,
    contact: form["contact"].value,
    email: form["email"].value,
    dob: form["date"].value,
    height: form["height"].value,
    weight: form["weight"].value,
    bloodGroup: form["bgrp"].value,
    sex: form["sex"].value,
    loc: {
      type: "Point",
      coordinates: form["geocoder_input"]?.value,
    },
    organs: await getOrgans(),
    organDonor: organs.length === 0 ? false : true,
  };
  var json = form["geocoder_input"].value;
  json = json.substring(1, json.length - 1);

  var jsonArr = json.split(",");
  formData["loc"]["coordinates"] = jsonArr;
  if (!inComplete(formData)) {
    api_call(formData, form);
  } else {
    useModal(null);
  }
}
let organModal = document.getElementById("organModal");
function toggleOrganList() {
  organModal.style.display =
    organModal.style.display === "flex" ? "none" : "flex";

  window.onclick = function (event) {
    if (event.target == organModal) {
      organModal.style.display = "none";
    }
  };
}
function getOrgans() {
  var organs = [];
  var checkboxes = document.getElementsByClassName("modal__checkbox");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      organs.push(checkboxes[i].value);
    }
  }
  return organs;
}
