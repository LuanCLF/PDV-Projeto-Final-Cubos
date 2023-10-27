const { StatusCodes } = require("http-status-codes");
const {
  verificarCategoria,
} = require("../../provedor/produtosQuerys/queryFuncoes");
const { contencaoDeErro } = require("../../helpers/erros/contencaoDeErro");

const editarProduto = contencaoDeErro(async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  const categoria = await verificarCategoria(categoria_id);

  if (!categoria) {
    throw NotFoundError("Digite um Id de categoria cadastrado!");
  }

  await atualizarProduto(
    id,
    descricao,
    quantidade_estoque,
    valor,
    categoria_id
  );

  res.status(StatusCodes.OK).json();
});

module.exports = { editarProduto };
