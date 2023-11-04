const { StatusCodes } = require("http-status-codes");
const { excluirPorID } = require("../../provedor/produtosQuerys/queryFuncoes");
const { ErroNaoEncontrado } = require("../../uteis/erros/erroDaApi");

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  const produtoNaoExiste = await excluirPorID(id);

  if (produtoNaoExiste) {
    throw ErroNaoEncontrado("Produto não encontrado");
  }

  res.status(StatusCodes.OK).json({ message: "Produto excluído com sucesso" });
};

module.exports = { excluirProduto };
