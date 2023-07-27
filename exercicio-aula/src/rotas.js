const express = require("express");
const produtos = require("./controllers/vendas");
const rotas = express();

rotas.get("/", (req, res) => {
  res.send("Pagina Inicial");
});

rotas.get("/produtos", produtos.getAll);
rotas.post("/produtos", produtos.createProduct);

module.exports = rotas;
