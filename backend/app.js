const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/livros", (req, res, next) => {
  const livro = req.body;
  console.log(livro);
  res.status(201).json({ mensagem: "Livro cadastrado" });
});

app.use("/api/livros", (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    livros: livros,
  });
});

module.exports = app;
