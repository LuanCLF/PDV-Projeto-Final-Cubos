const knex = require("../../bancoDeDados/conexao");
const { detalharProdutos } = require("../produtosQuerys/queryFuncoes");

// const somaValor = await knex("produtos")
//   .sum(valor * quantidade_produto)
//   .whereIn({ id });

// const registrarPedido = async (cliente_id, observacao, pedido_produtos) => {
//   const valor_Total = pedido_produtos.forEach(
//     async ({ produto_id, quantidade_produto }) => {
//       const produto = await detalharProdutos(produto_id);

//       //   console.log(produto.valor);
//       //   const total = quantidade + prodValor
//       // obter o valor do PRODUTO, vezes quantidade,
//       // depois somar
//       //    quantidade_produto + fasfs;

//       return console.log(produto.valor);
//     }
//   );

//   const pedidoRegistrado = await knex().insert({
//     cliente_id,
//     observacao,
//     valor_Total,
//   });
//   //registrar PARA CADA PRODUTO
// };

//query para quantidade no estoque.

const qntEstoque = async (pedido_produtos) => {
  const arrayId = [];
  for (let id in pedido_produtos) {
    arrayId.push(pedido_produtos[id].produto_id);
  }

  const estoque = await knex("produtos")
    .select("quantidade_estoque")
    .whereIn("id", arrayId);

  return estoque;
};
module.exports = {
  qntEstoque,
};
