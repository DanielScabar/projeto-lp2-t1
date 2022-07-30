const mongoose = require("mongoose");

//Definindo o 'Schema'
const desaparecidoSchema = mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: String, required: true },
  telefone: { type: String, required: true },
  imagemURL: { type: String, required: true },
});

module.exports = mongoose.model("Desaparecido", desaparecidoSchema);
