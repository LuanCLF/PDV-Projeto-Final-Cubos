const { StatusCodes } = require("http-status-codes");
const { excluirPorID } = require("../../provedor/produtosQuerys/queryFuncoes");
const { contencaoDeErro } = require("../../helpers/erros/contencaoDeErro");
const { NotFoundError } = require("../../helpers/erros/api-errors-helpers");

const excluirProduto = contencaoDeErro(async (req, res) => {
  const { id } = req.params;

  const produto = await excluirPorID(id);

  if (!produto) {
    throw NotFoundError("Produto não encontrado");
  }

  res.status(StatusCodes.OK).json({ message: "Produto excluído com sucesso" });
});

module.exports = excluirProduto;
