const { StatusCodes } = require("http-status-codes");
const { NaoEncontradoErro } = require("../../helpers/api-errors-helpers");
const {
  excluirPorID,
} = require("../../bancoDeDados/produtosQuerys/queryFuncoesProdutos");

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  const produto = await excluirPorID(id);

  if (!produto) {
    throw NaoEncontradoErro("Produto não encontrado");
  }

  res.status(StatusCodes.OK).json({ message: "Produto excluído com sucesso" });
};

module.exports = excluirProduto;
