const { StatusCodes } = require("http-status-codes");
const { excluirPorID } = require("../../provedor/produtosQuerys/queryFuncoes");
const { NotFoundError } = require("../../helpers/erros/api-errors-helpers");

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  const produtoNaoExiste = await excluirPorID(id);

  if (produtoNaoExiste) {
    throw NotFoundError("Produto não encontrado");
  }

  res.status(StatusCodes.OK).json({ message: "Produto excluído com sucesso" });
};

module.exports = { excluirProduto };
