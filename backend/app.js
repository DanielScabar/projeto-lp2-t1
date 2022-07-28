require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Livro = require("./models/livro");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

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

app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );
//   next();
// });

app.post("/api/livros", (req, res, next) => {
  const livro = new Livro(req.body);
  // id: req.body.id,
  // titulo: req.body.titulo,
  // autor: req.body.autor,
  // npaginas: req.body.npaginas,

  livro.save().then((livroInserido) => {
    res.status(201).json({
      mensagem: "Livro inserido",
      id: livroInserido._id,
    });
  });
});

app.get("/api/livros", (req, res, next) => {
  Livro.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      livros: documents,
    });
  });
});

app.delete("/api/livros/:id", (req, res, next) => {
  Livro.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Livro removido" });
  });
});

module.exports = app;
