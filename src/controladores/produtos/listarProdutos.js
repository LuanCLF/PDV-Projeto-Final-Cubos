const {
  listarProdutos: listarQuery,
} = require("../../bancoDeDados/produtosQuerys/queryFuncoesProdutos");

const listarProdutos = async (req, res) => {
  const produtos = await listarQuery();

  res.status(StatusCodes.ok).json(produtos);
};

module.exports = listarProdutos;
