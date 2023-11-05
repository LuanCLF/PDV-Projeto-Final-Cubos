const { StatusCodes } = require("http-status-codes");
const { ErroNaoEncontrado } = require("../../uteis/erros/erroDaApi");
const {
  detalharProdutos,
} = require("../../provedor/produtosQuerys/queryFuncoes");
const { erroProdutoNaoEncontrado } = require("../../uteis/erros/mensagens");

const detalharProduto = async (req, res) => {
  const { id } = req.params;
  
  const produto = await detalharProdutos(id);

  if (!produto) {
    throw ErroNaoEncontrado(erroProdutoNaoEncontrado);
  }

  res.status(StatusCodes.OK).json({ produto });
};

module.exports = detalharProduto;
