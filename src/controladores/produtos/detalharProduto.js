const { StatusCodes } = require("http-status-codes");
const { ErroNaoEncontrado } = require("../../uteis/erros/erroDaApi");
const {
  detalharProdutos,
} = require("../../provedor/produtosQuerys/queryFuncoes");

const detalharProduto = async (req, res) => {
  const { id } = req.params;

  const produtos = await detalharProdutos(id);

  if (!produtos) {
    throw ErroNaoEncontrado("Produto não encontrado.");
  }

  res.status(StatusCodes.OK).json(produtos);
};

module.exports = detalharProduto;
