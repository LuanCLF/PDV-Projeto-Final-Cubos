const { StatusCodes } = require("http-status-codes");
const { obterProdutos } = require("../../provedor/produtosQuerys/queryFuncoes");

const listarProdutos = async (req, res) => {
  const produtos = await obterProdutos();

  res.status(StatusCodes.OK).json(produtos);
};

module.exports = listarProdutos;
