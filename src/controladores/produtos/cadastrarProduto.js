const { StatusCodes } = require("http-status-codes");
const { contencaoDeErro } = require("../../helpers/erros/contencaoDeErro");
const {
  cadastrarProdutos,
  verificarCategoria,
} = require("../../provedor/produtosQuerys/queryFuncoes");

const cadastrarProduto = contencaoDeErro(async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  const categoria = await verificarCategoria(categoria_id);


  await cadastrarProdutos(descricao, quantidade_estoque, valor, categoria_id);

  res.status(StatusCodes.OK).json();
});

module.exports = { cadastrarProduto };
