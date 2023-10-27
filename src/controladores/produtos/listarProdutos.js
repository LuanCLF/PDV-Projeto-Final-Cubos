const { contencaoDeErro } = require("../../helpers/erros/contencaoDeErro");
const { obterProdutos } = require("../../provedor/produtosQuerys/queryFuncoes");

const listarProdutos = contencaoDeErro(async (req, res) => {
  const produtos = await obterProdutos();

  res.status(StatusCodes.ok).json(produtos);
});

module.exports = listarProdutos;
