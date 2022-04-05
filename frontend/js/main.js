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
