const { StatusCodes } = require("http-status-codes");
const { obterProdutos } = require("../../provedor/produtosQuerys/queryFuncoes");
const { ErroNaoEncontrado } = require("../../uteis/erros/erroDaApi");
const { erroProdutoNaoEncontrado } = require("../../uteis/erros/mensagens");

const listarProdutos = async (req, res) => {
  let filtro = req.query.filtro;
  let pagina = Number(req.query.pagina);
 
  pagina = pagina < 0 || isNaN(pagina) ? 0 : pagina * 10;

  const produtos = await obterProdutos(pagina, filtro);

  if (produtos.length < 1) {
    throw ErroNaoEncontrado(erroProdutoNaoEncontrado);
  }

  res.status(StatusCodes.OK).json({ produtos });
};

module.exports = listarProdutos;
