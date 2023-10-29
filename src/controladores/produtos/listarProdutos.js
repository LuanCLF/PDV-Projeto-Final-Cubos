const { StatusCodes } = require("http-status-codes");
const { contencaoDeErro } = require("../../helpers/erros/contencaoDeErro");
const { obterProdutos } = require("../../provedor/produtosQuerys/queryFuncoes");

const listarProdutos = contencaoDeErro(async (req, res) => {
  const produtos = await obterProdutos();

  res.status(StatusCodes.OK).json(produtos);
});

module.exports = listarProdutos;
