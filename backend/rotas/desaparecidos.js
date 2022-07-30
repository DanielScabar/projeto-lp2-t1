const express = require("express");
const multer = require("multer");
const router = express.Router();
const Desaparecido = require("../models/desaparecido");

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
    const desaparecido = new Desaparecido({
      id: req.body.id,
      nome: req.body.nome,
      idade: req.body.idade,
      telefone: req.body.telefone,
      imagemURL: `${imagemURL}/imagens/${req.file.filename}`,
    });
    desaparecido.save().then((desaparecidoInserido) => {
      res.status(201).json({
        mensagem: "Desaparecido inserido",
        //id: desaparecidoInserido._id,
        desaparecido: {
          id: desaparecidoInserido._id,
          nome: desaparecidoInserido.nome,
          fone: desaparecidoInserido.fone,
          email: desaparecidoInserido.email,
          imagemURL: desaparecidoInserido.imagemURL,
        },
      });
    });
  }
);

router.get("", (req, res, next) => {
  Desaparecido.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      desaparecidos: documents,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Desaparecido.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Desaparecido removido" });
  });
});

router.put("/:id", (req, res, next) => {
  const desaparecido = new Desaparecido({
    _id: req.params.id,
    nome: req.body.nome,
    idade: req.body.idade,
    telefone: req.body.telefone,
  });
  Desaparecido.updateOne({ _id: req.params.id }, desaparecido).then(
    (resultado) => {
      console.log(resultado);
    }
  );
  res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
});

router.get("/:id", (req, res, next) => {
  Desaparecido.findById(req.params.id).then((liv) => {
    if (liv) {
      res.status(200).json(liv);
    } else res.status(404).json({ mensagem: "Desaparecido não encontrado!" });
  });
});

module.exports = router;
