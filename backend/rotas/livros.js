const express = require("express");
const multer = require("multer");
const router = express.Router();
const Livro = require("../models/livro");

const MIME_TYPE_EXTENSAO_MAPA = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/bmp": "bmp",
};
const armazenamento = multer.diskStorage({
  //requisição, arquivo extraido e uma função a ser
  //executada, capaz de indicar um erro ou devolver
  //o diretório em que as fotos ficarão
  destination: (req, file, callback) => {
    let e = MIME_TYPE_EXTENSAO_MAPA[file.mimetype]
      ? null
      : new Error("Mime Type Invalido");
    callback(e, "backend/imagens");
  },
  filename: (req, file, callback) => {
    const nome = file.originalname.toLowerCase().split(" ").join("-");
    const extensao = MIME_TYPE_EXTENSAO_MAPA[file.mimetype];
    callback(null, `${nome}-${Date.now()}.${extensao}`);
  },
});

router.post(
  "",
  multer({ storage: armazenamento }).single("imagem"),
  (req, res, next) => {
    const imagemURL = `${req.protocol}://${req.get("host")}`;
    const livro = new Livro({
      id: req.body.id,
      titulo: req.body.titulo,
      autor: req.body.autor,
      npaginas: req.body.npaginas,
      imagemURL: `${imagemURL}/imagens/${req.file.filename}`,
    });
    livro.save().then((livroInserido) => {
      res.status(201).json({
        mensagem: "Livro inserido",
        //id: livroInserido._id,
        livro: {
          id: livroInserido._id,
          nome: livroInserido.nome,
          fone: livroInserido.fone,
          email: livroInserido.email,
          imagemURL: livroInserido.imagemURL,
        },
      });
    });
  }
);

router.get("", (req, res, next) => {
  Livro.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      livros: documents,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Livro.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Livro removido" });
  });
});

router.put("/:id", (req, res, next) => {
  const livro = new Livro({
    _id: req.params.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    npaginas: req.body.npaginas,
  });
  Livro.updateOne({ _id: req.params.id }, livro).then((resultado) => {
    console.log(resultado);
  });
  res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
});

router.get("/:id", (req, res, next) => {
  Livro.findById(req.params.id).then((liv) => {
    if (liv) {
      res.status(200).json(liv);
    } else res.status(404).json({ mensagem: "Livro não encontrado!" });
  });
});

module.exports = router;
