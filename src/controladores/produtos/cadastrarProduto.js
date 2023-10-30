const { StatusCodes } = require("http-status-codes");
const {
  cadastrarProdutos,
  verificarCategoria,
} = require("../../provedor/produtosQuerys/queryFuncoes");
const { NotFoundError } = require("../../helpers/erros/api-errors-helpers");

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  const categoriaNaoExiste = await verificarCategoria(categoria_id);

  if (categoriaNaoExiste) {
    throw NotFoundError("Categoria não encontrada.");
  }

  await cadastrarProdutos(descricao, quantidade_estoque, valor, categoria_id);

  res.status(StatusCodes.CREATED).json();
};

module.exports = { cadastrarProduto };
