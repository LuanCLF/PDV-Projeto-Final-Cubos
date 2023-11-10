const { StatusCodes } = require("http-status-codes");
<<<<<<< HEAD:src/controladores/produtos/excluirPorID.js
const { excluirPorID, procurarProdutosEmPedidos } = require("../../provedor/produtosQuerys/queryFuncoes");
const { NotFoundError, ConflictRequestError } = require("../../helpers/erros/api-errors-helpers");
=======
const { excluirPorID } = require("../../provedor/produtosQuerys/queryFuncoes");
const { ErroNaoEncontrado } = require("../../uteis/erros/erroDaApi");
const { erroProdutoNaoEncontrado } = require("../../uteis/erros/mensagens");
>>>>>>> 7166e028a023e4df3d475df0e78fe4b537f626c2:src/controladores/produtos/excluirProduto.js

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  const produtoNaoPodeExcluir = await procurarProdutosEmPedidos(id)
  
  if(produtoNaoPodeExcluir){
    throw ConflictRequestError("O Produto está vinculado á algum pedido, não pode ser excluido.");
  }
  
  const produtoNaoExiste = await excluirPorID(id);

  if (produtoNaoExiste) {
    throw ErroNaoEncontrado(erroProdutoNaoEncontrado);
  }
  

  res.status(StatusCodes.NO_CONTENT).json();
};

module.exports = { excluirProduto };
