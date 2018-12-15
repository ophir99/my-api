const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const user = require("./user.model");
const emp = require("./emp.model");
mongoose
  .connect(
    "mongodb+srv://adminnew:adminnew@cluster0-9dxpj.mongodb.net/myBigProject?retryWrites=true"
  )
  .then(() => {
    console.log("Connected");
  })
  .catch(err => {
    console.log("Err", err);
  });

app.use(cors());
app.use(express.json());
app.post("/createuser", async (req, res) => {
  const newUser = new user({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  try {
    newUser
      .save()
      .then(result => {
        console.log(result);
        res.send({ message: "User Created" });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  } catch (err) {
    res.send({ message: "Something is wrong", error: err });
  }
});
app.post("/loginuser", async (req, res) => {
  try {
    user
      .find({ email: req.body.email, password: req.body.password })
      .then(result => {
        console.log(result);
        if (result.length === 1) {
          res.send({ message: "UserFound", user: req.body.email });
        }
        res.send({ message: "Wrong Credentials" });
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    res.send({ message: "Something is wrong", error: err });
  }
});

app.post("/createemp", async (req, res) => {
  const newEmp = new emp({
    name: req.body.name,
    mobile: req.body.mobile,
    location: req.body.location,
    skills: req.body.skills
  });
  try {
    newEmp
      .save()
      .then(result => {
        console.log(result);
        res.send({ response: result });
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    res.send({ response: err });
  }
});
app.get("/fetchemp", (req, res) => {
  try {
    emp.find().then(result => {
      console.log("Data", result);
      res.send({ data: result });
    });
  } catch (err) {
    res.send({ data: [] });
  }
});

app.get("/getemp", (req, res) => {
  emp
    .find({ _id: req.query.user })
    .then(result => {
      res.send({ data: result });
    })
    .catch(err => {
      res.send({ data: [] });
    });
});
app.put("/editemp/:id", (req, res) => {
  emp
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          mobile: req.body.mobile,
          location: req.body.location,
          skills: req.body.skills
        }
      }
    )
    .then(result => {
      res.send({ data: result });
    })
    .catch(err => {
      res.send({ data: [] });
    });
});
app.delete("/deleteemp/:id", (req, res) => {
  emp
    .deleteOne({ _id: req.params.id })
    .then(result => {
      res.send({ data: result });
    })
    .catch(err => {
      res.send({ data: [] });
    });
});
app.listen(6789, () => {
  console.log("App is running at 6789");
});
