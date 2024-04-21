const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const userRoutes = require("./Routes/auth");
const restaurantRoutes = require("./Routes/restaurants");
const {handleJWT} = require('./Middleware/jwtAuth')

// mongo connection 
const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Succesfully connected to mongo cluster");
  })
  .catch((error) => {
    console.log("Hey user there is this error ", error);
  });

//for user authenrication 
app.use("/api/user", userRoutes);
// for authorized users , Middleware for checking user JWT token 
app.use("/api/secured",handleJWT, restaurantRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("listening on port ", PORT);
});
