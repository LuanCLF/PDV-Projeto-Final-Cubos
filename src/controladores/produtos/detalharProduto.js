const { NotFoundError } = require("../../helpers/erros/api-errors-helpers");
const { contencaoDeErro } = require("../../helpers/erros/contencaoDeErro");
const {
  detalharProdutos,
} = require("../../provedor/produtosQuerys/queryFuncoes");

const detalharProduto = contencaoDeErro(async (req, res) => {
  const { id } = req.params;
  const produtos = await detalharProdutos(id);
  if (!produtos) {
    throw NotFoundError("Produto não encontrado.");
  }
  res.status(StatusCodes.OK).json(produtos);
});

module.exports = detalharProduto;
