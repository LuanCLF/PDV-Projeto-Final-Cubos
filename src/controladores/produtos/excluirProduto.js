const { StatusCodes } = require("http-status-codes");
const {
  ErroNaoEncontrado,
  ErroDeConflito,
} = require("../../uteis/erros/erroDaApi");
const { erroProdutoNaoEncontrado } = require("../../uteis/erros/mensagens");
const {
  excluirPorID,
  procurarProdutosEmPedidos,
} = require("../../provedor/produtosQuerys/queryFuncoes");

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  const produtoNaoPodeExcluir = await procurarProdutosEmPedidos(id);

  if (produtoNaoPodeExcluir) {
    throw ErroDeConflito(
      "O Produto está vinculado á algum pedido, não pode ser excluido."
    );
  }

  const produtoNaoExiste = await excluirPorID(id);

  if (produtoNaoExiste) {
    throw ErroNaoEncontrado(erroProdutoNaoEncontrado);
  }

  res.status(StatusCodes.NO_CONTENT).json();
};

module.exports = { excluirProduto };
