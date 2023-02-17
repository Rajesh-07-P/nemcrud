const express = require("express");
const { connection } = require("./config/db");
const { UserModel } = require("./models/user.model");
const { productRouter } = require("./routes/product.routes");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors=require("cors");


const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/products", productRouter);

app.post("/register", async (req, res) => {
  let { name, email, age, pass } = req.body;
  bcrypt.hash(pass, 10, async (err, hash) => {
    if (err) {
    } else {
      try {
        const user = new UserModel({ name, email, age, pass: hash });
        await user.save();
        res.send("User registered successfully");
      } catch (err) {
        console.log(err);
        res.send("Something went wrong");
      }
    }
  });
});

app.post("/login", async (req, res) => {
  let { email, pass } = req.body;
  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, async (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id,author:user[0].name }, process.env.key, {
            algorithm: "HS512",
          });
          res.send({ msg: "login successfull", token,user:user[0].name });
        } else {
          res.send("wrong credentials");
        }
      });
    } else {
      res.send("user not found");
    }
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (err) {
    console.log("Cannot connect to db");
  }
  console.log(`server started at port ${process.env.port}`);
});