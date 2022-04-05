data = {
  firstName: "Soham",
  lastName: "Chowdhury",
  city: "Coochbehar",
  contact: "6294750719",
  email: "sc2412@it.jgec.ac.in",
  age: "20",
  bloodGroup: "O-",
  height: "180",
  weight: "62",
  loc: { type: "Point", coordinates: ["69", "40"] },
};
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
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
}

/*Form functionality */
let reg_form = document.querySelector("#submit");
reg_form.addEventListener("click",function(event){
  event.preventDefault();//prevent useless refresh
})
function validate() {
  let form = document.forms["registrationForm"];
  var formData = {
    firstName: form["fname"].value,
    lastName: form["lname"].value,
    contact: form["contact"].value,
    bloodGroup: form["bgrp"].value,
    location: form["geocoder_input"]?.value,
  };
  console.log (JSON.stringify(formData))
}
