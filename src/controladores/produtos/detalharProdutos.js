const { detalharProdutos } = require("../../bancoDeDados/produtosQuerys");

const detalharProdutos = async (req, res) => {
  const { id } = req.params;
  const produtos = await detalharProdutos(id);
  if (!produtos) {
    throw NaoEncontradoErro("Produto não encontrado.");
  }
  res.status(StatusCodes.OK).json(produtos);
};

module.exports = detalharProdutos;
