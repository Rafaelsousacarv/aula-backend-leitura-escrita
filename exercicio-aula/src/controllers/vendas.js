const produtos = require("../bancodedados");
const fs = require('fs/promises')

const getAll = async (req, res) => {
  return res.status(200).json(produtos);
};

const createProduct = async (req, res) => {
  const { produto_id, quantidade } = req.body;

  const produtoEncontradado = produtos.find((produto) => {
    return produto.id === Number(produto_id);
  });

  if (!produtoEncontradado) {
    return res.status(404).json({ mensagem: "O produto não foi encontrado." });
  }

  try {
    const vendas = await fs.readFile('./src/vendas.json')

    const parseVendas = JSON.parse(vendas);

    parseVendas.vendas.push({
        produto: produtoEncontradado,
        quantidade, 

    });

    await fs.writeFile('./src/vendas.json', JSON.stringify(parseVendas));

    return res.status(201).json({mensagem: "Vendas registrada com sucesso."})

  } catch (error) {
    return res.status(500).json({ mesagem: "Erro do servidor" });
  }
};

module.exports = {
  getAll,
  createProduct,
};
