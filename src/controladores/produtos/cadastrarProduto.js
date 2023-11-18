const { StatusCodes } = require("http-status-codes");
const {
  cadastrarProdutos,
  verificarCategoria,
  atualizarProduto,
} = require("../../provedor/produtosQuerys/queryFuncoes");
const { ErroNaoEncontrado } = require("../../uteis/erros/erroDaApi");
const { erroCategoriaNaoEncontrada } = require("../../uteis/erros/mensagens");
const { s3 } = require("../../uteis/s3/s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { gerarUrl } = require("../../uteis/s3/url");

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const imagem = req.file;
  const categoriaNaoExiste = await verificarCategoria(categoria_id);

  if (categoriaNaoExiste) {
    throw ErroNaoEncontrado(erroCategoriaNaoEncontrada);
  }

  let produto_imagem = "Não enviado";

  const { id } = await cadastrarProdutos({
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
    produto_imagem,
  });

  if (imagem) {
    const s3Objeto = {
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: `pdv/${req.usuario.email}/${id}/${imagem.originalname}`,
      ContentType: imagem.mimetype,
      Body: imagem.buffer,
    };

    await s3.send(new PutObjectCommand(s3Objeto));

    produto_imagem = gerarUrl(req.usuario.email, id, imagem);

    await atualizarProduto(id, { produto_imagem });
  }

  res.status(StatusCodes.CREATED).json();
};

module.exports = { cadastrarProduto };
