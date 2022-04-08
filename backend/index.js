const express = require("express");
require("dotenv").config();
require("./db/dbconfig");
var cors = require("cors");
const app = express();
const User = require("./models/user");
// const Id =require("./models/mock");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get("/", (req, res) => {
  res.send("BloodMates Backend!");
});
app.post("/signup/", (req, res) => {
  // console.log(req.body);
  const newUser = new User(req.body);
  newUser.save((err) => {
    if (err) {
      res.status(500).json({ contact: err.errors?.contact?.name,
      email : err.errors?.email?.name });
      console.log(err);
    } else {
      res.json({
        msg: "data saved",
      });
    }
  });
});

app.post("/search/", (req, res) => {
  // console.log(req.body);
  const coords = (req.body);
  console.log(coords);
  fetch(coords);
});

async function fetch(coords){
  const data = await User.find({
    loc: {
        $near: {
            $geometry: {
                type: 'Point',
                coordinates: coords
            },
            $maxDistance : 60000,
            $minDistance : 0
        }
    }
});
console.log(data);
}

app.listen(process.env.PORT || 8000, async () => {
  console.log(`Listening at port ${process.env.PORT || 8000}`);
});
