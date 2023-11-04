const { StatusCodes } = require("http-status-codes");
const {
  verificarCategoria,
  atualizarProduto,
  checaSeProdutoExiste,
} = require("../../provedor/produtosQuerys/queryFuncoes");
const { ErroNaoEncontrado } = require("../../uteis/erros/erroDaApi");

const editarProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  const produtoNaoExiste = await checaSeProdutoExiste(id);

  if (produtoNaoExiste) {
    throw ErroNaoEncontrado("Não existe produto com esse ID!");
  }
  const categoriaNaoExiste = await verificarCategoria(categoria_id);

  if (categoriaNaoExiste) {
    throw ErroNaoEncontrado("Digite um Id de categoria cadastrado!");
  }

  await atualizarProduto(
    id,
    descricao,
    quantidade_estoque,
    valor,
    categoria_id
  );

  return res.status(StatusCodes.NO_CONTENT).json();
};

module.exports = { editarProduto };
