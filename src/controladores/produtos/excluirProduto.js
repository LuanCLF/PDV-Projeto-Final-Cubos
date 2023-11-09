const { StatusCodes } = require("http-status-codes");
const { excluirPorID } = require("../../provedor/produtosQuerys/queryFuncoes");
const { ErroNaoEncontrado } = require("../../uteis/erros/erroDaApi");
const { erroProdutoNaoEncontrado } = require("../../uteis/erros/mensagens");

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  const produtoNaoExiste = await excluirPorID(id);

  if (produtoNaoExiste) {
    throw ErroNaoEncontrado(erroProdutoNaoEncontrado);
  }

  res.status(StatusCodes.NO_CONTENT).json();
};

module.exports = { excluirProduto };
