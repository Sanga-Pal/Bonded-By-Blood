import API from "./config";
function inComplete(form) {
  for (var key in form) {
    if (form[key] === "" || form[key] === null) return true;
  }
  return false;
}
function useModal(json, formData, form) {
  console.log(json);
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
  if (inComplete(formData)) {
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
    b.innerText = em == "CastError" ? "Invalid Input" : "Email Exists";
    // console.log(cnt, em);
    if (cnt != null) {
      modalInner.appendChild(a);
    }
    if (em != null) {
      modalInner.appendChild(b);
    }
    var rest = document.createElement("p");
    console.log(formData);
  }
}
function api_call(formData, form) {
  console.log("api_method");
  fetch(API+"signup/", {
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

/*Form functionality */
let reg_form = document.querySelector("#submit");
reg_form.addEventListener("click", function (event) {
  event.preventDefault(); //prevent useless refresh
});
function validate() {
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
  };
  var json = form["geocoder_input"].value;
  json = json.substring(1, json.length - 1);

  var jsonArr = json.split(",");
  formData["loc"]["coordinates"] = jsonArr;
  console.log(formData);
  // console.log(typeof form["geocoder_input"].value);
  api_call(formData, form);
}
