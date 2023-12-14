const { StatusCodes } = require("http-status-codes");

const {
  ErroNaoEncontrado,
  ErroDeConflito,
} = require("../../uteis/erros/erroDaApi");
const {
  erroProdutoNaoEncontrado,
  erroProdutoVinculado,
} = require("../../uteis/erros/mensagens");
const {
  excluirPorID,
  procurarProdutosEmPedidos,
} = require("../../provedor/produtosQuerys/queryFuncoes");
const { s3 } = require("../../uteis/s3/s3");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  const produtoNaoPodeExcluir = await procurarProdutosEmPedidos(id);
 
  if (produtoNaoPodeExcluir) {
    throw ErroDeConflito(erroProdutoVinculado);
  }

  const produtoNaoExiste = await excluirPorID(id);

  if (produtoNaoExiste) {
    throw ErroNaoEncontrado(erroProdutoNaoEncontrado);
  }

  const s3Objeto = {
    Bucket: process.env.BACKBLAZE_BUCKET || "",
    Key: `pdv/${req.usuario.email}/${id}/`,
  };

  s3.send(new DeleteObjectCommand(s3Objeto)).catch((erro) => console.log(erro));

  res.status(StatusCodes.NO_CONTENT).json();
};

module.exports = { excluirProduto };
