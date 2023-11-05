const { StatusCodes } = require("http-status-codes");
const {
  verificarCategoria,
  atualizarProduto,
  checaSeProdutoExiste,
} = require("../../provedor/produtosQuerys/queryFuncoes");
const { ErroNaoEncontrado } = require("../../uteis/erros/erroDaApi");
const {
  erroProdutoNaoEncontrado,
  erroCategoriaNaoEncontrada,
} = require("../../uteis/erros/mensagens");

const editarProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  const produtoNaoExiste = await checaSeProdutoExiste(id);

  if (produtoNaoExiste) {
    throw ErroNaoEncontrado(erroProdutoNaoEncontrado);
  }
  const categoriaNaoExiste = await verificarCategoria(categoria_id);

  if (categoriaNaoExiste) {
    throw ErroNaoEncontrado(erroCategoriaNaoEncontrada);
  }

  await atualizarProduto(id, {
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
  });

  return res.status(StatusCodes.NO_CONTENT).json();
};

module.exports = { editarProduto };
