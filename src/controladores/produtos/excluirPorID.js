const { StatusCodes } = require("http-status-codes");
const { excluirPorID, procurarProdutosEmPedidos } = require("../../provedor/produtosQuerys/queryFuncoes");
const { NotFoundError, ConflictRequestError } = require("../../helpers/erros/api-errors-helpers");

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  const produtoNaoPodeExcluir = await procurarProdutosEmPedidos(id)
  
  if(produtoNaoPodeExcluir){
    throw ConflictRequestError("O Produto está vinculado á algum pedido, não pode ser excluido.");
  }
  
  const produtoNaoExiste = await excluirPorID(id);

  if (produtoNaoExiste) {
    throw NotFoundError("Produto não encontrado");
  }
  

  res.status(StatusCodes.OK).json({ message: "Produto excluído com sucesso" });
};

module.exports = { excluirProduto };
