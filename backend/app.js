const express = require("express");
const app = express();

const livros = [
  {
    id: "1",
    titulo: "O Iluminado",
    autor: "Stephen King",
    npaginas: "300",
  },
  {
    id: "2",
    titulo: "O Cemitério",
    autor: "Stephen King",
    npaginas: "220",
  },
];

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

app.use("/api/livros", (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    livros: livros,
  });
});

module.exports = app;
