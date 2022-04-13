const express = require("express");
require("dotenv").config();
require("./db/dbconfig");
var cors = require("cors");
const app = express();
const User = require("./models/user");
// const Id =require("./models/mock");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser().json);
app.use(cors());
app.get("/", (req, res) => {
  res.send("Bonded By Blood Backend!");
});
app.post("/signup/", (req, res) => {
  // console.log(req.body);
  const newUser = new User(req.body);
  newUser.save((err) => {
    if (err) {
      res.status(500).json({
        contact: err.errors?.contact?.name,
        email: err.errors?.email?.name,
      });
      console.log(err);
    } else {
      res.json({
        msg: "data saved",
      });
    }
  });
});

app.post("/search/", async (req, res) => {
  console.log(req.body);
  // console.log(req.body.bgrp);
  // console.log((req.body.bgrp.split(",")));
  var resp = await fetch(req.body);
  // console.log(resp)
  // res.send(req.body);
  res.send({ response: resp });
});

async function fetch(obj) {
  // console.log(typeof obj[0],obj)
  // console.log(typeof obj.coords[0])
  // console.log(parseInt(obj.dist));
  var data;
  if (obj.query == "B") {
    data = await User.find({
      loc: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: obj.coords,
          },
          $maxDistance: obj.dist,
          $minDistance: 0,
        },
      },
      bloodGroup: {
        $in: obj.bgrp.slice(1, -1).split(","),
      },
    });
    console.log(data.length);
    return data;
  } else if (obj.query == "O") {
    data = await User.find({
      loc: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: obj.coords,
          },
          $maxDistance: obj.dist,
          $minDistance: 0,
        },
      },
      organDonor: true,
      organs: obj.organ,
    });
    console.log(data.length);
    return data;
  }
}

app.listen(process.env.PORT || 8000, async () => {
  console.log(`Listening at port ${process.env.PORT || 8000}`);
});
