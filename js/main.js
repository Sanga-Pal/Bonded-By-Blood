data = {
  firstName: "Soham",
  lastName: "Chowdhury",
  city: "Coochbehar",
  contact: "629",
  email: "sc21tgec.ac.in",
  age: "20",
  bloodGroup: "O-",
  height: "180",
  weight: "62",
  loc: { type: "Point", coordinates: ["69", "40"] },
};
function useModal(data) {
  // console.log(data);
  data = JSON.parse(data);
  var modal = document.getElementById("myModal");
  var modalInner = document.getElementById("modal-content");
  modalInner.innerHTML = "";
  var cls = document.getElementsByClassName("close")[0];
  // cls.onclick = function () {
  //   modal.style.display = "none";
  // };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  modal.style.display = "block";
  console.log(data.msg);
  if (data.msg === "data saved") {
    modalInner.style.color = "green";
    var p = document.createElement("p");
    p.innerText = "Data Saved Successfully";
    modalInner.appendChild(p);
    alert("saved");
  } else {
    modalInner.style.color = "red";
    var cnt = data.contact;
    var em = data.email;
    var a = document.createElement("p");
    a.innerText = "Contact Exists";
    var b = document.createElement("p");
    b.innerText = "Email Exists";
    console.log(cnt, em);
    if (cnt != null) {
      modalInner.appendChild(a);
    }
    if (em != null) {
      modalInner.appendChild(b);
    }
  }
}
function api_call() {
  console.log("api_method");
  fetch("http://localhost:8000/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => useModal(JSON.stringify(json)))
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
    bloodGroup: form["bgrp"].value,
    location: form["geocoder_input"]?.value,
  };
  console.log(JSON.stringify(formData));
  api_call();
}
