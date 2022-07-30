require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Desaparecido = require("./models/desaparecido");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const desaparecidoRoutes = require("./rotas/desaparecidos");
const path = require("path");

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER,
  MONGODB_HOST,
  MONGODB_DATABASE,
} = process.env;

mongoose
  .connect(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.${MONGODB_HOST}.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conexão OK");
  })
  .catch(() => {
    console.log("Conexão NOK");
  });

app.use(bodyParser.json());
app.use("/imagens", express.static(path.join("backend/imagens")));

const desaparecidos = [];

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/desaparecidos", desaparecidoRoutes);
module.exports = app;
