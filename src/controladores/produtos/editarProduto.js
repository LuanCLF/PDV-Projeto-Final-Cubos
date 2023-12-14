const { StatusCodes } = require("http-status-codes");
const {
  verificarCategoria,
  atualizarProduto,
  checaSeProdutoExiste,
} = require("../../provedor/produtosQuerys/queryFuncoes");
const { s3 } = require("../../uteis/s3/s3");
const { ErroNaoEncontrado } = require("../../uteis/erros/erroDaApi");
const {
  erroProdutoNaoEncontrado,
  erroCategoriaNaoEncontrada,
} = require("../../uteis/erros/mensagens");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { gerarUrl } = require("../../uteis/s3/url");

const editarProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const imagem = req.file;

  const produtoNaoExiste = await checaSeProdutoExiste(id);

  if (produtoNaoExiste) {
    throw ErroNaoEncontrado(erroProdutoNaoEncontrado);
  }
  const categoriaNaoExiste = await verificarCategoria(categoria_id);

  if (categoriaNaoExiste) {
    throw ErroNaoEncontrado(erroCategoriaNaoEncontrada);
  }
  
  let produto_imagem = "";
  if (imagem) {
    const s3Objeto = {
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: `pdv/${req.usuario.email}/${id}/${imagem.originalname}`,
      ContentType: imagem.mimetype,
      Body: imagem.buffer,
    };

    await s3.send(new PutObjectCommand(s3Objeto));

    produto_imagem = gerarUrl(req.usuario.email, id, imagem);
  }

  await atualizarProduto(id, {
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
    produto_imagem,
  });

  return res.status(StatusCodes.NO_CONTENT).json();
};

module.exports = { editarProduto };
