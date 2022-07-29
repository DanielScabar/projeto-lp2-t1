require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Livro = require("./models/livro");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const livroRoutes = require("./rotas/livros");

const {
  MONGODB_USER = "danielscabar",
  MONGODB_PASSWORD = "574368383",
  MONGODB_CLUSTER = "cluster0",
  MONGODB_HOST = "3tbws",
  MONGODB_DATABASE = "",
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

const livros = [];

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

app.use("/api/livros", livroRoutes);
module.exports = app;
