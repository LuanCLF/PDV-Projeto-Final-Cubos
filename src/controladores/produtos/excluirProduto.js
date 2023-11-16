const { StatusCodes } = require("http-status-codes");
// <<<<<<< HEAD:src/controladores/produtos/excluirPorID.js
// const { excluirPorID, procurarProdutosEmPedidos } = require("../../provedor/produtosQuerys/queryFuncoes");
// const { NotFoundError, ConflictRequestError } = require("../../helpers/erros/api-errors-helpers");
// =======
// const { excluirPorID } = require("../../provedor/produtosQuerys/queryFuncoes");
// const { ErroNaoEncontrado } = require("../../uteis/erros/erroDaApi");
// const { erroProdutoNaoEncontrado } = require("../../uteis/erros/mensagens");
// >>>>>>> 7166e028a023e4df3d475df0e78f
// e4b537f626c2:src/controladores/produtos/excluirProduto.js
const {
  ErroNaoEncontrado,
  ErroDeConflito,
} = require("../../uteis/erros/erroDaApi");
const { erroProdutoNaoEncontrado } = require("../../uteis/erros/mensagens");
const {
  excluirPorID,
  procurarProdutosEmPedidos,
} = require("../../provedor/produtosQuerys/queryFuncoes");
const { s3 } = require("../../uteis/s3/s3");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  const produtoNaoPodeExcluir = await procurarProdutosEmPedidos(id);
  console.log(id, produtoNaoPodeExcluir);
  if (produtoNaoPodeExcluir) {
    throw ErroDeConflito(
      "O Produto está vinculado á algum pedido, não pode ser excluido."
    );
  }

  const produtoNaoExiste = await excluirPorID(id);

  if (produtoNaoExiste) {
    throw ErroNaoEncontrado(erroProdutoNaoEncontrado);
  }

  const s3Objeto = {
    Bucket: process.env.BACKBLAZE_BUCKET,
    Key: `pdv/${req.usuario.email}/${id}/`,
  };

  await s3.send(new DeleteObjectCommand(s3Objeto));

  res.status(StatusCodes.NO_CONTENT).json();
};

module.exports = { excluirProduto };
