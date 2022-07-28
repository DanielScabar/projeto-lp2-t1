const mongoose = require("mongoose");

//Definindo o 'Schema'
const livroSchema = mongoose.Schema({
  id: { type: String, required: true },
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  npaginas: { type: String, required: true },
});

module.exports = mongoose.model("Livro", livroSchema);
